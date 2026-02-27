import React from 'react'
import { Link } from 'react-router-dom'
import { FiFileText, FiClock, FiTrendingUp, FiArrowRight } from 'react-icons/fi'
import { useAuth } from '../context/authContext'
import { useQuery } from 'react-query'
import axios from '../api/axios'
import { formatDistanceToNow } from 'date-fns'

const Dashboard = () => {
  const { user, subscription } = useAuth()

  const { data: conversions, isLoading } = useQuery(
    'recentConversions',
    async () => {
      const response = await axios.get('/conversions/history')
      return response.data.slice(0, 5) // Get last 5 conversions
    },
    {
      enabled: !!user
    }
  )

  const usagePercentage = subscription
    ? (subscription.conversionsUsed / subscription.conversionsLimit) * 100
    : 0

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      {/* Welcome Section */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-light text-slate-800 mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-slate-500 font-light">
          Here's what's happening with your account today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-light text-slate-500">Conversions Used</h3>
            <FiFileText className="text-amber-500" />
          </div>
          <p className="text-3xl font-light text-slate-800">
            {subscription?.conversionsUsed || 0}
            <span className="text-sm text-slate-400 ml-1">
              / {subscription?.conversionsLimit || 5}
            </span>
          </p>
          <div className="mt-4 h-1 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber-500 rounded-full transition-all"
              style={{ width: `${Math.min(usagePercentage, 100)}%` }}
            />
          </div>
        </div>

        <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-light text-slate-500">Current Plan</h3>
            <FiTrendingUp className="text-emerald-500" />
          </div>
          <p className="text-3xl font-light text-slate-800 capitalize">
            {subscription?.plan}
          </p>
          {subscription?.expiresAt && (
            <p className="text-sm text-slate-400 font-light mt-2">
              Expires {formatDistanceToNow(new Date(subscription.expiresAt), { addSuffix: true })}
            </p>
          )}
        </div>

        <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-light text-slate-500">Quick Action</h3>
            <FiClock className="text-blue-500" />
          </div>
          <Link
            to="/converter"
            className="inline-flex items-center space-x-2 text-amber-500 hover:text-amber-600 transition-colors group"
          >
            <span>Convert a PDF now</span>
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Recent Conversions */}
      <div className="bg-white/50 backdrop-blur-sm rounded-3xl border border-white/20 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-light text-slate-800">Recent Conversions</h2>
          <Link
            to="/history"
            className="text-sm text-amber-500 hover:text-amber-600 font-light"
          >
            View All
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-amber-500 rounded-full animate-spin mx-auto" />
          </div>
        ) : conversions?.length > 0 ? (
          <div className="space-y-4">
            {conversions.map((conversion) => (
              <div
                key={conversion._id}
                className="flex items-center justify-between p-4 bg-white/50 rounded-xl hover:bg-white/80 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <FiFileText className="text-slate-400" />
                  <div>
                    <p className="text-slate-800 font-light">{conversion.fileName}</p>
                    <p className="text-xs text-slate-400 font-light">
                      {conversion.toFormat.toUpperCase()} • {(conversion.fileSize / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    conversion.status === 'completed' ? 'bg-green-100 text-green-600' :
                    conversion.status === 'processing' ? 'bg-amber-100 text-amber-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {conversion.status}
                  </span>
                  <p className="text-xs text-slate-400 font-light mt-1">
                    {formatDistanceToNow(new Date(conversion.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500 font-light mb-4">No conversions yet</p>
            <Link
              to="/converter"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-all text-sm font-light"
            >
              <span>Start Your First Conversion</span>
              <FiArrowRight />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard