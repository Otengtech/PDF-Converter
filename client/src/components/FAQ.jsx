import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const faqs = [
  {
    question: 'How does the PDF conversion work?',
    answer: 'Our conversion process is simple and secure. You upload your PDF, select your desired output format, and our advanced algorithms convert it while maintaining the original formatting. The entire process takes just seconds.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use 256-bit SSL encryption for all file transfers. Your files are automatically deleted from our servers within 1 hour of conversion, and we never share your data with third parties.'
  },
  {
    question: 'What file formats are supported?',
    answer: 'We support conversion to multiple formats including Word (DOCX), Excel (XLSX), PowerPoint (PPTX), JPG, PNG, and HTML. We also support various input formats beyond PDF.'
  },
  {
    question: 'Is there a file size limit?',
    answer: 'Free accounts can convert files up to 10MB. Pro accounts can handle files up to 100MB, while Enterprise accounts support files up to 500MB.'
  },
  {
    question: 'Can I convert multiple files at once?',
    answer: 'Yes! Pro and Enterprise plans include batch conversion functionality. You can upload multiple PDFs and convert them all simultaneously.'
  },
  {
    question: 'Do you offer customer support?',
    answer: 'We offer email support for all users, with priority support for Pro users and 24/7 priority support for Enterprise customers.'
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <span className="text-amber-500 text-sm font-light tracking-wider uppercase mb-4 block">
          FAQ
        </span>
        <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="max-w-2xl mx-auto text-slate-500 font-light">
          Everything you need to know about our PDF conversion service
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="mb-4 border border-slate-200 rounded-2xl overflow-hidden bg-white/30 backdrop-blur-sm"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/50 transition-colors"
            >
              <span className="text-slate-800 font-light">{faq.question}</span>
              {openIndex === index ? (
                <FiChevronUp className="w-5 h-5 text-slate-400" />
              ) : (
                <FiChevronDown className="w-5 h-5 text-slate-400" />
              )}
            </button>
            
            <div
              className={`px-6 transition-all duration-300 ${
                openIndex === index ? 'py-4 border-t border-slate-100' : 'max-h-0'
              }`}
            >
              <p className="text-slate-500 font-light leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Still have questions */}
      <div className="mt-12 text-center">
        <p className="text-slate-500 font-light mb-4">Still have questions?</p>
        <button className="px-8 py-3 border border-slate-200 text-slate-700 rounded-full hover:border-slate-300 hover:bg-white transition-all text-sm font-light">
          Contact Support
        </button>
      </div>
    </section>
  );
};

export default FAQ;