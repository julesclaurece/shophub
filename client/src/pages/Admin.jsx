import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, Package, ShoppingBag } from 'lucide-react';
import api from '../lib/api';
import useAuthStore from '../store/useAuthStore';
import toast from 'react-hot-toast';

const EMPTY = { name: '', description: '', price: '', image_url: '', category: '', stock: '' };

export default function Admin() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [tab, setTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [modal, setModal] = useState(null); // null | 'create' | product object
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    if (!user || user.role !== 'admin') navigate('/');
  }, [user]);

  useEffect(() => { fetchProducts(); fetchOrders(); }, []);

  const fetchProducts = async () => {
    const { data } = await api.get('/products');
    setProducts(data);
  };

  const fetchOrders = async () => {
    const { data } = await api.get('/orders/all');
    setOrders(data);
  };

  const openCreate = () => { setForm(EMPTY); setModal('create'); };
  const openEdit = (p) => { setForm({ ...p, price: String(p.price), stock: String(p.stock) }); setModal(p); };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (modal === 'create') {
        await api.post('/products', form);
        toast.success('Product created');
      } else {
        await api.put(`/products/${modal.id}`, form);
        toast.success('Product updated');
      }
      setModal(null);
      fetchProducts();
    } catch {
      toast.error('Failed to save product');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    await api.delete(`/products/${id}`);
    toast.success('Deleted');
    fetchProducts();
  };

  const updateOrderStatus = async (id, status) => {
    await api.patch(`/orders/${id}/status`, { status });
    fetchOrders();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        <div className="flex gap-2 mb-8">
          {[['products', Package, 'Products'], ['orders', ShoppingBag, 'Orders']].map(([key, Icon, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-colors ${
                tab === key ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-indigo-300'
              }`}
            >
              <Icon size={18} /> {label}
            </button>
          ))}
        </div>

        {tab === 'products' && (
          <div>
            <div className="flex justify-end mb-4">
              <button onClick={openCreate} className="bg-indigo-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-indigo-700">
                <Plus size={18} /> Add Product
              </button>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-gray-600 font-medium">Product</th>
                    <th className="text-left px-4 py-3 text-gray-600 font-medium">Category</th>
                    <th className="text-right px-4 py-3 text-gray-600 font-medium">Price</th>
                    <th className="text-right px-4 py-3 text-gray-600 font-medium">Stock</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 flex items-center gap-3">
                        <img src={p.image_url || 'https://placehold.co/40x40?text=?'} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                        <span className="font-medium text-gray-900">{p.name}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{p.category}</td>
                      <td className="px-4 py-3 text-right font-medium">${Number(p.price).toFixed(2)}</td>
                      <td className="px-4 py-3 text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${p.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                          {p.stock}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => openEdit(p)} className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50">
                            <Pencil size={15} />
                          </button>
                          <button onClick={() => handleDelete(p.id)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'orders' && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Order ID</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Customer</th>
                  <th className="text-right px-4 py-3 text-gray-600 font-medium">Total</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Date</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-gray-500">#{o.id}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{o.customer_name}</p>
                      <p className="text-gray-500 text-xs">{o.customer_email}</p>
                    </td>
                    <td className="px-4 py-3 text-right font-bold">${Number(o.total).toFixed(2)}</td>
                    <td className="px-4 py-3 text-gray-500">{new Date(o.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <select
                        value={o.status}
                        onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                        className="text-xs border border-gray-200 rounded-lg px-2 py-1 outline-none"
                      >
                        {['pending', 'paid', 'shipped', 'delivered'].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{modal === 'create' ? 'Add Product' : 'Edit Product'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              {[['name', 'Name', 'text'], ['image_url', 'Image URL', 'url']].map(([field, label, type]) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    type={type}
                    required={field === 'name'}
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 resize-none"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[['price', 'Price'], ['stock', 'Stock'], ['category', 'Category']].map(([field, label]) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    <input
                      required
                      value={form[field]}
                      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500"
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModal(null)} className="flex-1 border border-gray-300 py-2.5 rounded-xl text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl hover:bg-indigo-700">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
