import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { FiCheckCircle, FiXCircle, FiLoader } from 'react-icons/fi'
import { useAuth } from '../context/authContext'
import axios from '../api/axios'
import toast from 'react-hot-toast'

const PaymentVerify = () => {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState('verifying')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const { fetchUserProfile } = useAuth()

  const reference = searchParams.get('reference')
  const trxref = searchParams.get('trxref')

  useEffect(() => {
    const verifyPayment = async () => {
      const paymentReference = reference || trxref
      
      if (!paymentReference) {
        setStatus('error')
        setMessage('No payment reference found')
        return
      }

      try {
        const response = await axios.get(`/payments/verify/${paymentReference}`)
        
        if (response.data.success) {
          setStatus('success')
          setMessage('Payment verified successfully! Your subscription has been activated.')
          await fetchUserProfile()
          
          // Redirect to dashboard after 3 seconds
          setTimeout(() => {
            navigate('/dashboard')
          }, 3000)
        } else {
          setStatus('error')
          setMessage('Payment verification failed. Please contact support.')
        }
      } catch (error) {
        setStatus('error')
        setMessage(error.response?.data?.message || 'Payment verification failed')
      }
    }

    verifyPayment()
  }, [reference, trxref, navigate, fetchUserProfile])

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <div className="bg-white/50 backdrop-blur-sm rounded-3xl border border-white/20 p-8 text-center">
        {status === 'verifying' && (
          <>
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiLoader className="w-8 h-8 text-amber-500 animate-spin" />
            </div>
            <h2 className="text-2xl font-light text-slate-800 mb-4">Verifying Payment</h2>
            <p className="text-slate-500 font-light">
              Please wait while we verify your payment...
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-light text-slate-800 mb-4">Payment Successful!</h2>
            <p className="text-slate-500 font-light mb-6">{message}</p>
            <p className="text-sm text-slate-400 font-light">
              Redirecting to dashboard...
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiXCircle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-light text-slate-800 mb-4">Payment Failed</h2>
            <p className="text-slate-500 font-light mb-6">{message}</p>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/pricing')}
                className="block w-full px-6 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-all text-sm font-light"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="block w-full px-6 py-3 border border-slate-200 text-slate-700 rounded-full hover:border-slate-300 hover:bg-white transition-all text-sm font-light"
              >
                Go to Dashboard
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default PaymentVerify