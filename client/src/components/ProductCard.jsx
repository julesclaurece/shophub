import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = (e) => {
    e.preventDefault();
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Link to={`/product/${product.id}`} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square bg-gray-100 overflow-hidden">
        <img
          src={product.image_url || 'https://placehold.co/400x400?text=No+Image'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <p className="text-xs text-indigo-600 font-medium uppercase tracking-wide mb-1">{product.category}</p>
        <h3 className="font-semibold text-gray-900 mb-1 truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">${Number(product.price).toFixed(2)}</span>
          <button
            onClick={handleAdd}
            className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 hover:bg-indigo-700 transition-colors"
          >
            <ShoppingCart size={14} /> Add
          </button>
        </div>
      </div>
    </Link>
  );
}
