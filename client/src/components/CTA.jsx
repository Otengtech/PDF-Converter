import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

const CTA = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 p-12 md:p-20">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6">
            Ready to Transform Your
            <span className="block text-amber-400 mt-2">PDF Experience?</span>
          </h2>
          
          <p className="text-slate-300 font-light mb-10 text-lg">
            Join thousands of satisfied users who have simplified their document workflow with our elegant solution.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group px-8 py-4 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-all flex items-center justify-center space-x-2 text-sm font-light shadow-lg hover:shadow-xl">
              <span>Start Free Trial</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 border border-slate-600 text-white rounded-full hover:border-slate-500 hover:bg-slate-800/50 transition-all text-sm font-light">
              View Pricing
            </button>
          </div>

          <p className="text-sm text-slate-400 font-light mt-8">
            No credit card required • 30-day money-back guarantee
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;