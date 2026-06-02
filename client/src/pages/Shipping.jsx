import { Truck, Clock, Globe, Package } from 'lucide-react';

const METHODS = [
  { icon: Truck, label: 'Standard Shipping', delay: '5–7 business days', price: 'Free over $50, otherwise $4.99' },
  { icon: Clock, label: 'Express Shipping', delay: '2–3 business days', price: '$9.99' },
  { icon: Globe, label: 'Overnight Shipping', delay: 'Next business day', price: '$19.99' },
  { icon: Package, label: 'In-Store Pickup', delay: 'Same day', price: 'Free' },
];

export default function Shipping() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-indigo-600 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-3">Shipping Information</h1>
        <p className="text-indigo-200 text-lg">Fast, reliable delivery to your door</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-14 space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Methods</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {METHODS.map(({ icon: Icon, label, delay, price }) => (
              <div key={label} className="bg-white rounded-2xl border border-gray-200 p-6 flex gap-4">
                <div className="bg-indigo-100 rounded-xl p-3 h-fit">
                  <Icon size={22} className="text-indigo-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{label}</p>
                  <p className="text-sm text-gray-500 mt-1">{delay}</p>
                  <p className="text-sm font-medium text-indigo-600 mt-1">{price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-8 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Processing</h2>
          <p className="text-gray-600 leading-relaxed">Orders placed before <strong>2:00 PM EST</strong> on business days are processed the same day. Orders placed after 2:00 PM or on weekends are processed the next business day.</p>
          <p className="text-gray-600 leading-relaxed">Once your order ships, you will receive a confirmation email with a tracking number so you can follow your package every step of the way.</p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">International Shipping</h2>
          <p className="text-gray-600 leading-relaxed mb-3">We ship to over 50 countries worldwide. International orders typically arrive within <strong>10–21 business days</strong> depending on the destination country and customs processing.</p>
          <p className="text-gray-600 leading-relaxed">Please note that customs duties and import taxes may apply and are the responsibility of the recipient.</p>
        </section>
      </div>
    </div>
  );
}
