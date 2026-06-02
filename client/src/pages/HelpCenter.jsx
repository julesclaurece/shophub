import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const FAQS = [
  { q: 'How do I track my order?', a: 'Once your order is shipped, you will receive an email with a tracking number. You can use this number on our website or the carrier\'s website to track your package in real time.' },
  { q: 'Can I change or cancel my order?', a: 'Orders can be modified or cancelled within 1 hour of placing them. After that, the order enters processing and cannot be changed. Please contact our support team as soon as possible.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit and debit cards (Visa, Mastercard, American Express), as well as Apple Pay and Google Pay via our secure Stripe checkout.' },
  { q: 'Is my payment information secure?', a: 'Absolutely. All payments are processed through Stripe, a PCI-DSS Level 1 certified provider. We never store your card details on our servers.' },
  { q: 'How do I create an account?', a: 'Click on the Login button in the top navigation bar, then select "Register". Fill in your name, email and password and you\'re good to go.' },
  { q: 'I forgot my password. What do I do?', a: 'On the login page, click "Forgot password?" and enter your email address. You will receive a reset link within a few minutes.' },
];

function FAQ({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-900">{q}</span>
        {open ? <ChevronUp size={18} className="text-gray-400 shrink-0" /> : <ChevronDown size={18} className="text-gray-400 shrink-0" />}
      </button>
      {open && <div className="px-6 py-4 text-gray-600 text-sm leading-relaxed bg-gray-50 border-t border-gray-200">{a}</div>}
    </div>
  );
}

export default function HelpCenter() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-indigo-600 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-3">Help Center</h1>
        <p className="text-indigo-200 text-lg">Find answers to the most common questions</p>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {FAQS.map((f, i) => <FAQ key={i} {...f} />)}
        </div>
        <div className="mt-12 bg-indigo-50 border border-indigo-100 rounded-2xl p-8 text-center">
          <p className="text-gray-700 font-medium mb-2">Still have questions?</p>
          <p className="text-gray-500 text-sm mb-4">Our support team is available Monday–Friday, 9am–6pm.</p>
          <a href="/contact" className="inline-block bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
