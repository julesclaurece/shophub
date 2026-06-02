import { RotateCcw, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const STEPS = [
  { n: '1', title: 'Initiate your return', desc: 'Log into your account, go to your orders and select the item you want to return. Click "Request Return" and choose your reason.' },
  { n: '2', title: 'Pack your item', desc: 'Place the item in its original packaging if possible. Include all accessories, manuals and free gifts that came with it.' },
  { n: '3', title: 'Ship it back', desc: 'Use the prepaid return label we send to your email. Drop off the package at any authorized carrier location.' },
  { n: '4', title: 'Get your refund', desc: 'Once we receive and inspect your return, your refund will be issued within 3–5 business days to your original payment method.' },
];

export default function Returns() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-indigo-600 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-3">Returns & Refunds</h1>
        <p className="text-indigo-200 text-lg">Hassle-free returns within 30 days</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-14 space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Return an Item</h2>
          <div className="space-y-4">
            {STEPS.map(({ n, title, desc }) => (
              <div key={n} className="bg-white rounded-2xl border border-gray-200 p-6 flex gap-5">
                <div className="bg-indigo-600 text-white rounded-full w-9 h-9 flex items-center justify-center font-bold text-sm shrink-0">{n}</div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">{title}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid sm:grid-cols-2 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle size={20} className="text-green-600" />
              <h3 className="font-bold text-green-800">Eligible for Return</h3>
            </div>
            <ul className="space-y-2 text-sm text-green-700">
              <li>• Unused items in original packaging</li>
              <li>• Defective or damaged products</li>
              <li>• Wrong item received</li>
              <li>• Items returned within 30 days</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <XCircle size={20} className="text-red-500" />
              <h3 className="font-bold text-red-800">Not Eligible for Return</h3>
            </div>
            <ul className="space-y-2 text-sm text-red-700">
              <li>• Items returned after 30 days</li>
              <li>• Used or opened consumables</li>
              <li>• Personalized or custom items</li>
              <li>• Digital products once downloaded</li>
            </ul>
          </div>
        </section>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex gap-4">
          <AlertCircle size={22} className="text-amber-500 shrink-0 mt-0.5" />
          <p className="text-amber-800 text-sm leading-relaxed">
            <strong>Free returns</strong> on all eligible items. We provide a prepaid return shipping label at no cost to you.
          </p>
        </div>
      </div>
    </div>
  );
}
