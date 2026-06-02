import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';
import Logo from './Logo';

export default function Navbar() {
  const count = useCartStore((s) => s.count());
  const { user, logout } = useAuthStore();
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => { document.removeEventListener('mousedown', handler); document.removeEventListener('touchstart', handler); };
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/"><Logo size="md" /></Link>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative p-2 text-gray-600 hover:text-gray-900">
            <ShoppingCart size={22} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              {user.role === 'admin' && (
                <Link to="/admin" className="p-2 text-gray-600 hover:text-gray-900">
                  <LayoutDashboard size={22} />
                </Link>
              )}
              <span className="text-sm text-gray-600">{user.name}</span>
              <button onClick={logout} className="relative group p-2 text-gray-600 hover:text-red-500">
                <LogOut size={20} />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  Log out
                </span>
              </button>
            </div>
          ) : (
            <div className="relative" ref={ref}>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 p-2"
              >
                <User size={20} /> Login
              </button>
              {open && (
                <div className="absolute right-0 top-full pt-2 z-50">
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 w-64">
                    <div className="px-3 py-2 mb-1">
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Welcome to ShopHub</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to="/login"
                        onClick={() => setOpen(false)}
                        className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors text-center"
                      >
                        <User size={18} />
                        <span className="text-sm font-semibold">Login</span>
                      </Link>
                      <Link
                        to="/login?register=true"
                        onClick={() => setOpen(false)}
                        className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-colors text-center"
                      >
                        <User size={18} />
                        <span className="text-sm font-semibold">Register</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
