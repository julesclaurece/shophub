import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import api from '../lib/api';
import ProductCard from '../components/ProductCard';

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Books', 'Home', 'Sports'];

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const category = searchParams.get('category') || '';

  const setCategory = (cat) => {
    if (cat) setSearchParams({ category: cat });
    else setSearchParams({});
  };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (category && category !== 'All') params.category = category;
      const { data } = await api.get('/products', { params });
      setProducts(data);
      setLoading(false);
    };
    const timeout = setTimeout(fetch, 300);
    return () => clearTimeout(timeout);
  }, [search, category]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="text-white py-16 px-4 text-center relative"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-indigo-900/65" />
        <div className="relative z-10">
        <h1 className="text-4xl font-bold mb-4">Welcome to ShopHub</h1>
        <p className="text-indigo-200 text-lg mb-8">Discover amazing products at great prices</p>
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-12 pr-4 py-3 rounded-xl text-gray-900 text-base outline-none border-2 border-white/60 focus:border-white bg-white/95 placeholder-gray-400 shadow-lg"
          />
        </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat === 'All' ? '' : cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                (cat === 'All' && !category) || category === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse">
                <div className="aspect-square bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No products found.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
