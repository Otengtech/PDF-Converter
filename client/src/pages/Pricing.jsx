import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiCheck, FiX } from 'react-icons/fi'
import { useAuth } from '../context/authContext'
import axios from '../api/axios'
import toast from 'react-hot-toast'

const plans = [
  {
    name: 'Free',
    price: { monthly: 0, yearly: 0 },
    description: 'Perfect for occasional users',
    features: [
      { name: '5 conversions per month', included: true },
      { name: 'Files up to 10MB', included: true },
      { name: 'Basic formats (Word, JPG)', included: true },
      { name: '24-hour file storage', included: true },
      { name: 'Email support', included: false },
      { name: 'Batch conversion', included: false },
      { name: 'Priority processing', included: false }
    ],
    buttonText: 'Current Plan',
    popular: false,
    limit: 5
  },
  {
    name: 'Pro',
    price: { monthly: 50, yearly: 480 },
    description: 'For professionals and small teams',
    features: [
      { name: '1000 conversions per month', included: true },
      { name: 'Files up to 100MB', included: true },
      { name: 'All formats', included: true },
      { name: '7-day file storage', included: true },
      { name: 'Priority email support', included: true },
      { name: 'Batch conversion', included: true },
      { name: 'Priority processing', included: true }
    ],
    buttonText: 'Upgrade to Pro',
    popular: true,
    limit: 1000
  },
  {
    name: 'Enterprise',
    price: { monthly: 150, yearly: 1440 },
    description: 'For large teams and organizations',
    features: [
      { name: '5000 conversions per month', included: true },
      { name: 'Files up to 500MB', included: true },
      { name: 'All formats + API access', included: true },
      { name: '30-day file storage', included: true },
      { name: '24/7 priority support', included: true },
      { name: 'Batch conversion + API', included: true },
      { name: 'Custom integration', included: true }
    ],
    buttonText: 'Contact Sales',
    popular: false,
    limit: 5000
  }
]

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly')
  const [processing, setProcessing] = useState(false)
  const { user, subscription } = useAuth()
  const navigate = useNavigate()

  const handleSubscribe = async (plan) => {
    if (!user) {
      navigate('/register')
      return
    }

    if (plan === 'free' || subscription?.plan === plan) {
      return
    }

    if (plan === 'enterprise') {
      window.location.href = 'mailto:sales@pdflux.com'
      return
    }

    setProcessing(true)
    try {
      const response = await axios.post('/payments/initialize', {
        plan,
        billingCycle
      })

      // Redirect to Paystack payment page
      window.location.href = response.data.authorizationUrl
    } catch (error) {
      toast.error('Payment initialization failed. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  const getButtonText = (plan) => {
    if (!user) return plan.buttonText
    if (subscription?.plan === plan.name.toLowerCase()) return 'Current Plan'
    if (plan.name.toLowerCase() === 'free') return 'Downgrade'
    return plan.buttonText
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <span className="text-amber-500 text-sm font-light tracking-wider uppercase mb-4 block">
          Pricing
        </span>
        <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="max-w-2xl mx-auto text-slate-500 font-light mb-8">
          Choose the plan that fits your needs. All prices in Ghana Cedis (GHS).
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center space-x-4">
          <span className={`text-sm font-light ${billingCycle === 'monthly' ? 'text-slate-800' : 'text-slate-400'}`}>
            Monthly
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="relative w-14 h-7 bg-slate-200 rounded-full p-1 transition-colors"
          >
            <div className={`absolute w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
              billingCycle === 'yearly' ? 'translate-x-7' : 'translate-x-0'
            }`} />
          </button>
          <span className={`text-sm font-light ${billingCycle === 'yearly' ? 'text-slate-800' : 'text-slate-400'}`}>
            Yearly <span className="text-amber-500">Save 20%</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map((plan, index) => {
          const price = plan.price[billingCycle]
          const isCurrentPlan = user && subscription?.plan === plan.name.toLowerCase()
          const buttonDisabled = isCurrentPlan || (plan.name.toLowerCase() === 'free' && subscription?.plan === 'free') || processing

          return (
            <div
              key={index}
              className={`relative bg-white/50 backdrop-blur-sm rounded-3xl border ${
                plan.popular
                  ? 'border-amber-200 shadow-xl scale-105'
                  : 'border-white/20 shadow-sm hover:shadow-md'
              } transition-all p-8`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-500 text-white text-xs font-light rounded-full">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-light text-slate-800 mb-2">{plan.name}</h3>
                <p className="text-sm text-slate-500 font-light mb-4">{plan.description}</p>
                <div className="flex items-end justify-center">
                  <span className="text-4xl font-light text-slate-800">
                    {price === 0 ? 'Free' : `GHS ${price}`}
                  </span>
                  {price > 0 && (
                    <span className="text-sm text-slate-400 font-light ml-1 mb-1">
                      /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  )}
                </div>
                {plan.limit && (
                  <p className="text-xs text-slate-400 font-light mt-2">
                    {plan.limit} conversions per month
                  </p>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    {feature.included ? (
                      <FiCheck className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    ) : (
                      <FiX className="w-5 h-5 text-slate-300 flex-shrink-0" />
                    )}
                    <span className={`text-sm font-light ${
                      feature.included ? 'text-slate-600' : 'text-slate-400'
                    }`}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan.name.toLowerCase())}
                disabled={buttonDisabled}
                className={`w-full py-3 rounded-full text-sm font-light transition-all ${
                  isCurrentPlan
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : plan.popular
                    ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-lg'
                    : 'border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white'
                }`}
              >
                {getButtonText(plan)}
              </button>
            </div>
          )
        })}
      </div>

      {/* Money-back guarantee */}
      <div className="mt-12 text-center">
        <p className="text-sm text-slate-500 font-light">
          All paid plans come with a 30-day money-back guarantee. No questions asked.
        </p>
      </div>
    </div>
  )
}

export default Pricing