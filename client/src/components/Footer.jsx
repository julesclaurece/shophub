import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          <div className="md:col-span-1">
            <Logo size="md" white={true} />
            <p className="mt-4 text-sm leading-relaxed">
              Your one-stop shop for everything you need. Quality products, fast delivery, unbeatable prices.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/?category=Electronics" className="hover:text-white transition-colors">Electronics</Link></li>
              <li><Link to="/?category=Clothing" className="hover:text-white transition-colors">Clothing</Link></li>
              <li><Link to="/?category=Books" className="hover:text-white transition-colors">Books</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Account</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/login" className="hover:text-white transition-colors">Sign In</Link></li>
              <li><Link to="/login?register=true" className="hover:text-white transition-colors">Create Account</Link></li>
              <li><Link to="/cart" className="hover:text-white transition-colors">My Cart</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">Returns</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>© {new Date().getFullYear()} ShopHub. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
