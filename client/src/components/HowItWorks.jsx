import React from 'react';
import { FiUpload, FiSettings, FiDownload } from 'react-icons/fi';

const steps = [
  {
    icon: FiUpload,
    title: 'Upload Your PDF',
    description: 'Drag and drop your PDF file or click to browse from your computer',
    color: 'from-amber-400 to-amber-500'
  },
  {
    icon: FiSettings,
    title: 'Choose Format',
    description: 'Select your desired output format - Word, Excel, JPG, and more',
    color: 'from-slate-400 to-slate-500'
  },
  {
    icon: FiDownload,
    title: 'Download Result',
    description: 'Your converted file is ready for instant download',
    color: 'from-emerald-400 to-emerald-500'
  }
];

const HowItWorks = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <span className="text-amber-500 text-sm font-light tracking-wider uppercase mb-4 block">
          Simple Process
        </span>
        <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-4">
          How It Works
        </h2>
        <p className="max-w-2xl mx-auto text-slate-500 font-light">
          Three simple steps to convert your PDF files with professional results
        </p>
      </div>

      <div className="relative">
        {/* Connection Line (hidden on mobile) */}
        <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-200 via-slate-200 to-emerald-200" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center relative">
                <div className={`relative z-10 w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br ${step.color} p-0.5`}>
                  <div className="w-full h-full bg-white rounded-3xl flex items-center justify-center">
                    <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="absolute -top-2 -right-2 lg:top-4 lg:-right-4 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-500 font-light">
                  {index + 1}
                </div>
                
                <h3 className="text-xl font-light text-slate-800 mb-3">{step.title}</h3>
                <p className="text-slate-500 font-light max-w-xs mx-auto">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Video Demo Placeholder */}
      <div className="mt-24 relative">
        <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl overflow-hidden shadow-xl border border-white/50">
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="group relative w-20 h-20 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow">
              <div className="absolute inset-0 bg-amber-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative flex items-center justify-center">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-amber-500 border-b-8 border-b-transparent ml-1" />
              </div>
            </button>
          </div>
        </div>
        <p className="text-center mt-6 text-slate-500 font-light">
          Watch how easy it is to convert your PDF files
        </p>
      </div>
    </section>
  );
};

export default HowItWorks;