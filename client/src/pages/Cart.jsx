import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';
import api from '../lib/api';
import toast from 'react-hot-toast';

export default function Cart() {
  const { items, removeItem, updateQty, total } = useCartStore();
  const { user } = useAuthStore();

  const handleCheckout = async () => {
    if (!user) return toast.error('Please login to checkout');
    try {
      const { data } = await api.post('/orders/checkout', { items });
      window.location.href = data.url;
    } catch {
      toast.error('Checkout failed');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <ShoppingBag size={64} className="text-gray-300" />
        <p className="text-xl text-gray-500">Your cart is empty</p>
        <Link to="/" className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <Link to="/" className="ml-auto flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-800 font-medium">
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl border border-gray-200 p-4 flex gap-4">
                <img
                  src={item.image_url || 'https://placehold.co/100x100?text=?'}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl bg-gray-100"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{item.name}</p>
                  <p className="text-indigo-600 font-bold">${Number(item.price).toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQty(item.id, item.quantity - 1)} className="p-1 rounded-lg border border-gray-200 hover:bg-gray-50">
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, item.quantity + 1)} className="p-1 rounded-lg border border-gray-200 hover:bg-gray-50">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500">
                    <Trash2 size={18} />
                  </button>
                  <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 h-fit">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2 text-sm text-gray-600">
              <span>Subtotal</span>
              <span>${total().toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4 text-sm text-gray-600">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-gray-900 mb-6">
              <span>Total</span>
              <span>${total().toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
            >
              Checkout with Stripe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
