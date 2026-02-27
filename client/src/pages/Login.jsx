import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock } from 'react-icons/fi'
import { useAuth } from '../context/authContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState(1) // 1: email, 2: code
  const [loading, setLoading] = useState(false)
  
  const { requestLoginCode, verifyLoginCode } = useAuth()
  const navigate = useNavigate()

  const handleRequestCode = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const result = await requestLoginCode(email)
    
    if (result.success) {
      setStep(2)
    }
    
    setLoading(false)
  }

  const handleVerifyCode = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const result = await verifyLoginCode(email, code)
    
    if (result.success) {
      navigate('/dashboard')
    }
    
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <div className="bg-white/50 backdrop-blur-sm rounded-3xl border border-white/20 p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-light text-slate-800 mb-2">Welcome Back</h2>
          <p className="text-slate-500 font-light">
            {step === 1 ? 'Enter your email to receive a login code' : 'Enter the 6-digit code sent to your email'}
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleRequestCode} className="space-y-6">
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-all text-sm font-light disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending code...' : 'Send Login Code'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode} className="space-y-6">
            <div>
              <label className="block text-sm font-light text-slate-600 mb-2">6-Digit Code</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full pl-12 pr-4 py-3 bg-white/50 border border-slate-200 rounded-full focus:outline-none focus:border-amber-300 transition-colors text-sm font-light text-center tracking-widest"
                  placeholder="• • • • • •"
                  maxLength={6}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-all text-sm font-light disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify & Login'}
            </button>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-sm text-slate-500 hover:text-slate-700 font-light"
            >
              ← Use different email
            </button>
          </form>
        )}

        <p className="text-center text-sm text-slate-500 font-light mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-amber-500 hover:text-amber-600">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login