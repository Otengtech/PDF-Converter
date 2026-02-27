import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiUser } from 'react-icons/fi'
import { useAuth } from '../context/authContext'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [registered, setRegistered] = useState(false)
  
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const result = await register(name, email, password)
    
    if (result.success) {
      setRegistered(true)
    }
    
    setLoading(false)
  }

  if (registered) {
    return (
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="bg-white/50 backdrop-blur-sm rounded-3xl border border-white/20 p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiMail className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-light text-slate-800 mb-4">Check Your Email</h2>
          <p className="text-slate-500 font-light mb-8">
            We've sent a verification link to <strong>{email}</strong>. Please verify your email to continue.
          </p>
          <Link
            to="/login"
            className="inline-block px-6 py-3 bg-slate-800 text-white rounded-full hover:bg-slate-900 transition-all text-sm font-light"
          >
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <div className="bg-white/50 backdrop-blur-sm rounded-3xl border border-white/20 p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-light text-slate-800 mb-2">Create Account</h2>
          <p className="text-slate-500 font-light">Start converting your PDFs today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-light text-slate-600 mb-2">Full Name</label>
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/50 border border-slate-200 rounded-full focus:outline-none focus:border-amber-300 transition-colors text-sm font-light"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-light text-slate-600 mb-2">Email</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/50 border border-slate-200 rounded-full focus:outline-none focus:border-amber-300 transition-colors text-sm font-light"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-light text-slate-600 mb-2">Password</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/50 border border-slate-200 rounded-full focus:outline-none focus:border-amber-300 transition-colors text-sm font-light"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
            <p className="text-xs text-slate-400 font-light mt-2">Must be at least 6 characters</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-all text-sm font-light disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 font-light mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-amber-500 hover:text-amber-600">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register