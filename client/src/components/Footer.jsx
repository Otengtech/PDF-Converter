import React from 'react'
import { Link } from 'react-router-dom'
import { FiFile, FiHeart, FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="bg-white/50 backdrop-blur-sm border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <FiFile className="w-5 h-5 text-amber-500" />
              <span className="text-lg font-light text-slate-800">PDFlux</span>
            </Link>
            <p className="text-sm text-slate-500 font-light">
              Simple, elegant, and secure PDF conversion for everyone.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-medium text-slate-800 mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/features" className="text-sm text-slate-500 hover:text-slate-700 font-light">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-slate-500 hover:text-slate-700 font-light">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/api" className="text-sm text-slate-500 hover:text-slate-700 font-light">
                  API
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-800 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-slate-500 hover:text-slate-700 font-light">
                  About
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-slate-500 hover:text-slate-700 font-light">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-slate-500 hover:text-slate-700 font-light">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-800 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-slate-500 hover:text-slate-700 font-light">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-slate-500 hover:text-slate-700 font-light">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/security" className="text-sm text-slate-500 hover:text-slate-700 font-light">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-slate-400 font-light flex items-center">
            Made with <FiHeart className="mx-1 text-red-400" /> by PDFlux
          </p>
          
          <div className="flex space-x-6">
            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
              <FiGithub className="w-5 h-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
              <FiTwitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
              <FiLinkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer