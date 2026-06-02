import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import Logo from '../components/Logo';

export default function Success() {
  const clearCart = useCartStore((s) => s.clearCart);
  useEffect(() => { clearCart(); }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-6 px-4">
      <Logo size="lg" />
      <CheckCircle size={80} className="text-green-500" />
      <h1 className="text-3xl font-bold text-gray-900">Payment Successful!</h1>
      <p className="text-gray-500 text-center max-w-sm">
        Thank you for your order. You'll receive a confirmation email shortly.
      </p>
      <Link to="/" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
        Continue Shopping
      </Link>
    </div>
  );
}
