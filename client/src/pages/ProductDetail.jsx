import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import api from '../lib/api';
import useCartStore from '../store/useCartStore';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    api.get(`/products/${id}`).then(({ data }) => setProduct(data));
  }, [id]);

  if (!product) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft size={18} /> Back to shop
        </Link>
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden grid md:grid-cols-2 gap-0">
          <div className="aspect-square bg-gray-100">
            <img
              src={product.image_url || 'https://placehold.co/600x600?text=No+Image'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 flex flex-col justify-between">
            <div>
              <p className="text-sm text-indigo-600 font-medium uppercase tracking-wide mb-2">{product.category}</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
              <p className="text-sm text-gray-500">
                {product.stock > 0 ? (
                  <span className="text-green-600 font-medium">{product.stock} in stock</span>
                ) : (
                  <span className="text-red-500 font-medium">Out of stock</span>
                )}
              </p>
            </div>
            <div className="mt-6">
              <p className="text-4xl font-bold text-gray-900 mb-6">${Number(product.price).toFixed(2)}</p>
              <button
                disabled={product.stock === 0}
                onClick={() => { addItem(product); toast.success('Added to cart!'); }}
                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ShoppingCart size={20} /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
