import React from 'react';
import { FiLock, FiZap, FiGlobe, FiUsers, FiShield, FiStar } from 'react-icons/fi';

const features = [
  {
    icon: FiZap,
    title: 'Lightning Fast',
    description: 'Convert your PDFs in seconds with our optimized conversion engine',
    color: 'amber'
  },
  {
    icon: FiShield,
    title: 'Bank-Level Security',
    description: '256-bit SSL encryption and automatic file deletion after 1 hour',
    color: 'emerald'
  },
  {
    icon: FiGlobe,
    title: 'Cloud-Based',
    description: 'Access your files from anywhere, on any device',
    color: 'blue'
  },
  {
    icon: FiUsers,
    title: 'Team Collaboration',
    description: 'Share and collaborate on converted documents with your team',
    color: 'purple'
  },
  {
    icon: FiLock,
    title: 'Privacy First',
    description: 'We never store your files or share your data with third parties',
    color: 'rose'
  },
  {
    icon: FiStar,
    title: 'Premium Quality',
    description: 'Maintain original formatting with our advanced conversion technology',
    color: 'amber'
  }
];

const Features = () => {
  return (
    <section id="features" className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <span className="text-amber-500 text-sm font-light tracking-wider uppercase mb-4 block">
          Why Choose Us
        </span>
        <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-4">
          Powerful Features for
          <span className="block text-amber-500 mt-2">Seamless Conversion</span>
        </h2>
        <p className="max-w-2xl mx-auto text-slate-500 font-light">
          Experience the perfect blend of simplicity and power with our enterprise-grade PDF conversion tools
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const colors = {
            amber: 'bg-amber-50 text-amber-500',
            emerald: 'bg-emerald-50 text-emerald-500',
            blue: 'bg-blue-50 text-blue-500',
            purple: 'bg-purple-50 text-purple-500',
            rose: 'bg-rose-50 text-rose-500'
          };

          return (
            <div 
              key={index}
              className="group p-8 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/20 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className={`w-14 h-14 ${colors[feature.color]} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-light text-slate-800 mb-3">{feature.title}</h3>
              <p className="text-slate-500 font-light leading-relaxed">{feature.description}</p>
            </div>
          );
        })}
      </div>

      {/* Stats Section */}
      <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 p-12 bg-white/30 backdrop-blur-sm rounded-3xl border border-white/20">
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-light text-slate-800 mb-2">10M+</div>
          <div className="text-sm text-slate-500 font-light">Files Converted</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-light text-slate-800 mb-2">50K+</div>
          <div className="text-sm text-slate-500 font-light">Happy Users</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-light text-slate-800 mb-2">99.9%</div>
          <div className="text-sm text-slate-500 font-light">Uptime</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-light text-slate-800 mb-2">24/7</div>
          <div className="text-sm text-slate-500 font-light">Support</div>
        </div>
      </div>
    </section>
  );
};

export default Features;