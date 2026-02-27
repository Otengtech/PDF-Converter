import React, { useState } from 'react';
import { FiMail, FiSend } from 'react-icons/fi';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
      <div className="bg-white/30 backdrop-blur-sm rounded-3xl border border-white/20 p-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FiMail className="w-8 h-8 text-amber-500" />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-light text-slate-800 mb-4">
            Stay in the Loop
          </h2>
          
          <p className="text-slate-500 font-light mb-8">
            Subscribe to our newsletter for tips, updates, and exclusive offers.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-white rounded-full border border-slate-200 focus:outline-none focus:border-amber-300 transition-colors text-sm font-light"
              required
            />
            <button
              type="submit"
              className="group px-6 py-4 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-all flex items-center justify-center space-x-2 text-sm font-light whitespace-nowrap"
            >
              <span>Subscribe</span>
              <FiSend className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {subscribed && (
            <p className="mt-4 text-sm text-emerald-500 font-light">
              Thanks for subscribing! Check your inbox for confirmation.
            </p>
          )}

          <p className="text-xs text-slate-400 font-light mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;