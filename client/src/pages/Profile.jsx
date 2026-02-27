import React, { useState } from 'react'
import { FiUser, FiMail, FiCalendar, FiSave, FiEdit2 } from 'react-icons/fi'
import { useAuth } from '../context/authContext'
import axios from '../api/axios'
import toast from 'react-hot-toast'
import { format } from 'date-fns'

const Profile = () => {
  const { user, fetchUserProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user?.name || '')
  const [loading, setLoading] = useState(false)

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await axios.put('/users/profile', { name })
      await fetchUserProfile()
      toast.success('Profile updated successfully')
      setIsEditing(false)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
      <h1 className="text-3xl md:text-4xl font-light text-slate-800 mb-8">Profile Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white/50 backdrop-blur-sm rounded-3xl border border-white/20 p-6 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl text-white font-light">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <h2 className="text-xl font-light text-slate-800 mb-1">{user?.name}</h2>
            <p className="text-sm text-slate-500 font-light mb-4">{user?.email}</p>
            <div className="pt-4 border-t border-slate-200">
              <p className="text-xs text-slate-400 font-light">
                Member since {format(new Date(user?.createdAt || Date.now()), 'MMMM yyyy')}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <div className="bg-white/50 backdrop-blur-sm rounded-3xl border border-white/20 p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-light text-slate-800">Personal Information</h3>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 text-sm text-amber-500 hover:text-amber-600"
                >
                  <FiEdit2 />
                  <span>Edit</span>
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div>
                  <label className="block text-sm font-light text-slate-600 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-full focus:outline-none focus:border-amber-300 transition-colors text-sm font-light"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-light text-slate-600 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={user?.email}
                      disabled
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-full text-sm font-light text-slate-500 cursor-not-allowed"
                    />
                  </div>
                  <p className="text-xs text-slate-400 font-light mt-2">
                    Email cannot be changed
                  </p>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-all text-sm font-light disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <FiSave />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false)
                      setName(user?.name)
                    }}
                    className="px-6 py-3 border border-slate-200 text-slate-700 rounded-full hover:border-slate-300 hover:bg-white transition-all text-sm font-light"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-slate-50 rounded-xl">
                  <FiUser className="w-5 h-5 text-slate-400 mr-4" />
                  <div>
                    <p className="text-xs text-slate-400 font-light">Full Name</p>
                    <p className="text-slate-800 font-light">{user?.name}</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-slate-50 rounded-xl">
                  <FiMail className="w-5 h-5 text-slate-400 mr-4" />
                  <div>
                    <p className="text-xs text-slate-400 font-light">Email Address</p>
                    <p className="text-slate-800 font-light">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-slate-50 rounded-xl">
                  <FiCalendar className="w-5 h-5 text-slate-400 mr-4" />
                  <div>
                    <p className="text-xs text-slate-400 font-light">Account Created</p>
                    <p className="text-slate-800 font-light">
                      {format(new Date(user?.createdAt || Date.now()), 'MMMM do, yyyy')}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Subscription Info */}
          <div className="mt-6 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/20 p-8">
            <h3 className="text-xl font-light text-slate-800 mb-4">Subscription Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-400 font-light mb-1">Current Plan</p>
                <p className="text-lg font-light text-slate-800 capitalize">
                  {user?.subscription?.plan || 'free'}
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-400 font-light mb-1">Conversions Used</p>
                <p className="text-lg font-light text-slate-800">
                  {user?.subscription?.conversionsUsed || 0} / {user?.subscription?.conversionsLimit || 5}
                </p>
              </div>
              {user?.subscription?.expiresAt && (
                <div className="col-span-2 p-4 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-400 font-light mb-1">Expires On</p>
                  <p className="text-lg font-light text-slate-800">
                    {format(new Date(user.subscription.expiresAt), 'MMMM do, yyyy')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile