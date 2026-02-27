import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from '../api/axios'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [subscription, setSubscription] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser))
      fetchUserProfile()
    }
    setLoading(false)
  }, [])

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('/auth/me')
      setUser(response.data)
      setSubscription(response.data.subscription)
      localStorage.setItem('user', JSON.stringify(response.data))
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
      logout()
    }
  }

  const register = async (name, email, password) => {
    try {
      const response = await axios.post('/auth/register', { name, email, password })
      toast.success(response.data.message)
      return { success: true, message: response.data.message }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      toast.error(message)
      return { success: false, message }
    }
  }

  const requestLoginCode = async (email) => {
    try {
      await axios.post('/auth/login-code', { email })
      toast.success('Login code sent to your email')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send login code'
      toast.error(message)
      return { success: false, message }
    }
  }

  const verifyLoginCode = async (email, code) => {
    try {
      const response = await axios.post('/auth/verify-code', { email, code })
      const { token, user } = response.data
      
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      setSubscription(user.subscription)
      
      toast.success('Login successful!')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Invalid code'
      toast.error(message)
      return { success: false, message }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setSubscription(null)
    toast.success('Logged out successfully')
  }

  const value = {
    user,
    loading,
    subscription,
    register,
    requestLoginCode,
    verifyLoginCode,
    logout,
    fetchUserProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}