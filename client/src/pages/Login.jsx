import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import toast from 'react-hot-toast';

export default function Login() {
  const [searchParams] = useSearchParams();
  const [isRegister, setIsRegister] = useState(searchParams.get('register') === 'true');

  useEffect(() => {
    setIsRegister(searchParams.get('register') === 'true');
  }, [searchParams]);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuthStore();
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegister) await register(form.name, form.email, form.password);
      else await login(form.email, form.password);
      toast.success(isRegister ? 'Account created!' : 'Welcome back!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{isRegister ? 'Create account' : 'Welcome back'}</h1>
        <p className="text-gray-500 text-sm mb-6">{isRegister ? 'Start shopping today' : 'Sign in to your account'}</p>

        <form onSubmit={handle} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Loading...' : isRegister ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={() => setIsRegister(!isRegister)} className="text-indigo-600 font-medium hover:underline">
            {isRegister ? 'Sign in' : 'Create one'}
          </button>
        </p>
      </div>
    </div>
  );
}
