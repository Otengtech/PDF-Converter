import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { FiCheckCircle, FiXCircle, FiLoader } from 'react-icons/fi'
import axios from '../api/axios'

const VerifyEmail = () => {
  const { token } = useParams()
  const [status, setStatus] = useState('verifying') // verifying, success, error
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`/auth/verify/${token}`)
        setStatus('success')
        setMessage(response.data.message)
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login')
        }, 3000)
      } catch (error) {
        setStatus('error')
        setMessage(error.response?.data?.message || 'Verification failed. The link may be expired or invalid.')
      }
    }

    verifyEmail()
  }, [token, navigate])

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <div className="bg-white/50 backdrop-blur-sm rounded-3xl border border-white/20 p-8 text-center">
        {status === 'verifying' && (
          <>
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiLoader className="w-8 h-8 text-amber-500 animate-spin" />
            </div>
            <h2 className="text-2xl font-light text-slate-800 mb-4">Verifying Your Email</h2>
            <p className="text-slate-500 font-light">
              Please wait while we verify your email address...
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-light text-slate-800 mb-4">Email Verified!</h2>
            <p className="text-slate-500 font-light mb-6">{message}</p>
            <p className="text-sm text-slate-400 font-light">
              Redirecting to login page...
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiXCircle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-light text-slate-800 mb-4">Verification Failed</h2>
            <p className="text-slate-500 font-light mb-6">{message}</p>
            <div className="space-y-3">
              <Link
                to="/register"
                className="block px-6 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-all text-sm font-light"
              >
                Register Again
              </Link>
              <Link
                to="/login"
                className="block px-6 py-3 border border-slate-200 text-slate-700 rounded-full hover:border-slate-300 hover:bg-white transition-all text-sm font-light"
              >
                Go to Login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default VerifyEmail