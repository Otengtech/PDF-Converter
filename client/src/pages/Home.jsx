import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiZap, FiShield, FiFileText } from 'react-icons/fi'
import { useAuth } from '../context/authContext'

const Home = () => {
  const { user } = useAuth()

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24">
      {/* Hero Section */}
      <div className="text-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-slate-800 mb-6">
          Convert PDFs with
          <span className="block text-amber-500 mt-2">Elegance & Simplicity</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg text-slate-500 font-light mb-10">
          Transform your documents effortlessly. Fast, secure, and beautifully simple PDF conversion.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            to={user ? '/converter' : '/register'}
            className="group px-8 py-4 bg-slate-800 text-white rounded-full hover:bg-slate-900 transition-all flex items-center justify-center space-x-2 text-sm font-light"
          >
            <span>Get Started</span>
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/pricing"
            className="px-8 py-4 border border-slate-200 text-slate-700 rounded-full hover:border-slate-300 hover:bg-white/50 transition-all text-sm font-light backdrop-blur-sm"
          >
            View Pricing
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm">
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-4 mx-auto">
              <FiZap className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className="text-lg font-light text-slate-800 mb-2">Lightning Fast</h3>
            <p className="text-slate-500 text-sm font-light">Convert your PDFs in seconds with our optimized engine</p>
          </div>

          <div className="p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm">
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-4 mx-auto">
              <FiShield className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className="text-lg font-light text-slate-800 mb-2">Bank-Level Security</h3>
            <p className="text-slate-500 text-sm font-light">Your files are encrypted and automatically deleted</p>
          </div>

          <div className="p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm">
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-4 mx-auto">
              <FiFileText className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className="text-lg font-light text-slate-800 mb-2">All Formats</h3>
            <p className="text-slate-500 text-sm font-light">Support for Word, Excel, PPT, JPG, and more</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home