import React from 'react';
import { FiStar } from 'react-icons/fi';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'Creative Agency',
    content: 'This PDF converter has revolutionized how we handle documents. The quality is outstanding and it\'s incredibly easy to use.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108777-5fad3d0ac8b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80'
  },
  {
    name: 'Michael Chen',
    role: 'Software Engineer',
    company: 'Tech Solutions',
    content: 'The API integration was seamless. We\'ve processed over 10,000 documents without a single issue. Highly recommended!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80'
  },
  {
    name: 'Emma Williams',
    role: 'Legal Consultant',
    company: 'Williams & Associates',
    content: 'Security is paramount in my line of work. This service provides bank-level encryption and automatic file deletion. Perfect.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80'
  },
  {
    name: 'James Rodriguez',
    role: 'University Professor',
    company: 'State University',
    content: 'Converting lecture slides and research papers has never been easier. The batch processing saves me hours every week.',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80'
  }
];

const Testimonials = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <span className="text-amber-500 text-sm font-light tracking-wider uppercase mb-4 block">
          Testimonials
        </span>
        <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-4">
          Loved by Thousands
        </h2>
        <p className="max-w-2xl mx-auto text-slate-500 font-light">
          Don't just take our word for it - hear from some of our satisfied users
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white/50 backdrop-blur-sm rounded-3xl border border-white/20 shadow-sm hover:shadow-md transition-all p-8"
          >
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-2xl object-cover"
              />
              <div>
                <h3 className="text-lg font-light text-slate-800">{testimonial.name}</h3>
                <p className="text-sm text-slate-500 font-light">
                  {testimonial.role} at {testimonial.company}
                </p>
              </div>
            </div>

            <div className="flex space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-5 h-5 ${
                    i < testimonial.rating ? 'text-amber-500 fill-amber-500' : 'text-slate-300'
              }`}
                />
              ))}
            </div>

            <p className="text-slate-600 font-light leading-relaxed">"{testimonial.content}"</p>
          </div>
        ))}
      </div>

      {/* Trusted By Companies */}
      <div className="mt-24">
        <p className="text-center text-sm text-slate-400 font-light uppercase tracking-wider mb-8">
          Trusted by innovative companies
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-12 bg-slate-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;