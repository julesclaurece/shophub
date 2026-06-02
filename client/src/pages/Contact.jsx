import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handle = (e) => {
    e.preventDefault();
    setSent(true);
    toast.success('Message sent! We\'ll get back to you within 24h.');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-indigo-600 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
        <p className="text-indigo-200 text-lg">We'd love to hear from you</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            {[
              { icon: Mail, label: 'Email', value: 'support@shophub.com' },
              { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
              { icon: MapPin, label: 'Address', value: '123 Commerce St, New York, NY 10001' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-white rounded-2xl border border-gray-200 p-5 flex gap-4">
                <div className="bg-indigo-100 rounded-xl p-2.5 h-fit">
                  <Icon size={18} className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
                  <p className="text-sm text-gray-800 mt-0.5">{value}</p>
                </div>
              </div>
            ))}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">Business Hours</p>
              <p className="text-sm text-gray-800">Mon – Fri: 9:00 AM – 6:00 PM EST</p>
              <p className="text-sm text-gray-800">Sat: 10:00 AM – 4:00 PM EST</p>
              <p className="text-sm text-gray-500">Sun: Closed</p>
            </div>
          </div>

          <div className="md:col-span-2 bg-white rounded-2xl border border-gray-200 p-8">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 py-12">
                <Send size={48} className="text-indigo-600" />
                <h2 className="text-xl font-bold text-gray-900">Message Sent!</h2>
                <p className="text-gray-500 text-center">We'll get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)} className="text-indigo-600 text-sm hover:underline">Send another message</button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Send us a message</h2>
                <form onSubmit={handle} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[['name', 'Your Name', 'text'], ['email', 'Your Email', 'email']].map(([field, label, type]) => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                        <input
                          type={type}
                          required
                          value={form[field]}
                          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                          className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 resize-none"
                    />
                  </div>
                  <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                    <Send size={16} /> Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
