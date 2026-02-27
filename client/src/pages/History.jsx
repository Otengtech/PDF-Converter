import React, { useState } from 'react'
import { FiFileText, FiDownload, FiCalendar, FiSearch, FiFilter } from 'react-icons/fi'
import { useQuery } from '@tanstack/react-query'
import axios from '../api/axios'
import { formatDistanceToNow, format } from 'date-fns'
import toast from 'react-hot-toast'

const History = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [formatFilter, setFormatFilter] = useState('all')

  const { data: conversions, isLoading, refetch } = useQuery({
    queryKey: ['conversions'],
    queryFn: async () => {
      const response = await axios.get('/conversions/history')
      return response.data
    }
  })

  const filteredConversions = conversions?.filter(conversion => {
    const matchesSearch = conversion.fileName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || conversion.status === statusFilter
    const matchesFormat = formatFilter === 'all' || conversion.toFormat === formatFilter
    return matchesSearch && matchesStatus && matchesFormat
  })

  const handleDownload = (url, fileName) => {
    if (url) {
      window.open(url, '_blank')
    } else {
      toast.error('Download link not available')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-600'
      case 'processing':
        return 'bg-amber-100 text-amber-600'
      case 'failed':
        return 'bg-red-100 text-red-600'
      default:
        return 'bg-slate-100 text-slate-600'
    }
  }

  const getFormatIcon = (format) => {
    switch (format) {
      case 'word': return '📄'
      case 'excel': return '📊'
      case 'ppt': return '📽️'
      case 'jpg': case 'png': return '🖼️'
      default: return '📄'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl md:text-4xl font-light text-slate-800 mb-4 md:mb-0">
          Conversion History
        </h1>
        <button
          onClick={() => refetch()}
          className="px-6 py-3 border border-slate-200 text-slate-700 rounded-full hover:border-slate-300 hover:bg-white transition-all text-sm font-light"
        >
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white/50 backdrop-blur-sm rounded-3xl border border-white/20 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-full focus:outline-none focus:border-amber-300 transition-colors text-sm font-light"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-full focus:outline-none focus:border-amber-300 transition-colors text-sm font-light appearance-none"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="processing">Processing</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          {/* Format Filter */}
          <div className="relative">
            <FiFileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={formatFilter}
              onChange={(e) => setFormatFilter(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-full focus:outline-none focus:border-amber-300 transition-colors text-sm font-light appearance-none"
            >
              <option value="all">All Formats</option>
              <option value="word">Word</option>
              <option value="excel">Excel</option>
              <option value="ppt">PowerPoint</option>
              <option value="jpg">JPG</option>
              <option value="png">PNG</option>
            </select>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center bg-slate-50 rounded-full px-4 py-2">
            <FiCalendar className="text-slate-400 mr-2" />
            <span className="text-sm text-slate-600 font-light">
              Total: {filteredConversions?.length || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Conversions List */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-amber-500 rounded-full animate-spin mx-auto" />
        </div>
      ) : filteredConversions?.length > 0 ? (
        <div className="space-y-4">
          {filteredConversions.map((conversion) => (
            <div
              key={conversion._id}
              className="bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 p-6 hover:shadow-md transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <div className="text-3xl">{getFormatIcon(conversion.toFormat)}</div>
                  <div>
                    <h3 className="text-lg font-light text-slate-800 mb-1">
                      {conversion.fileName}
                    </h3>
                    <div className="flex items-center space-x-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(conversion.status)}`}>
                        {conversion.status}
                      </span>
                      <span className="text-slate-400">
                        {(conversion.fileSize / 1024 / 1024).toFixed(2)} MB
                      </span>
                      <span className="text-slate-400">
                        → {conversion.toFormat.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-slate-500 font-light">
                      {formatDistanceToNow(new Date(conversion.createdAt), { addSuffix: true })}
                    </p>
                    <p className="text-xs text-slate-400">
                      {format(new Date(conversion.createdAt), 'MMM d, yyyy HH:mm')}
                    </p>
                  </div>
                  
                  {conversion.status === 'completed' && conversion.outputUrl && (
                    <button
                      onClick={() => handleDownload(conversion.outputUrl, conversion.fileName)}
                      className="p-3 bg-amber-50 text-amber-500 rounded-full hover:bg-amber-100 transition-colors"
                      title="Download"
                    >
                      <FiDownload />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/20">
          <FiFileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-light text-slate-800 mb-2">No conversions yet</h3>
          <p className="text-slate-500 font-light mb-6">
            Start converting your first PDF document
          </p>
          <a
            href="/converter"
            className="inline-block px-6 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-all text-sm font-light"
          >
            Go to Converter
          </a>
        </div>
      )}
    </div>
  )
}

export default History