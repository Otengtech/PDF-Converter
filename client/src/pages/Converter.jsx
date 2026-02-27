import React, { useState, useCallback } from 'react'
import { FiUpload, FiDownload, FiFile, FiX, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi'
import { useAuth } from '../context/authContext'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const formats = [
  { id: 'word', name: 'Word', extension: 'docx', icon: '📄' },
  { id: 'excel', name: 'Excel', extension: 'xlsx', icon: '📊' },
  { id: 'ppt', name: 'PowerPoint', extension: 'pptx', icon: '📽️' },
  { id: 'jpg', name: 'JPG Image', extension: 'jpg', icon: '🖼️' },
  { id: 'png', name: 'PNG Image', extension: 'png', icon: '🖼️' }
]

const Converter = () => {
  const [file, setFile] = useState(null)
  const [converting, setConverting] = useState(false)
  const [format, setFormat] = useState('word')
  const [error, setError] = useState('')
  const [conversionId, setConversionId] = useState(null)
  const [progress, setProgress] = useState(0)
  
  const { user, subscription } = useAuth()
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      if (selectedFile.size > 100 * 1024 * 1024) {
        setError('File size exceeds 100MB limit')
        return
      }
      setFile(selectedFile)
      setError('')
      setConversionId(null)
    } else {
      setError('Please select a valid PDF file')
    }
  }

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type === 'application/pdf') {
      if (droppedFile.size > 100 * 1024 * 1024) {
        setError('File size exceeds 100MB limit')
        return
      }
      setFile(droppedFile)
      setError('')
      setConversionId(null)
    } else {
      setError('Please drop a valid PDF file')
    }
  }, [])

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const removeFile = () => {
    setFile(null)
    setConversionId(null)
    setProgress(0)
  }

  const handleConvert = async () => {
    if (!file) return
    
    // Check if user has reached conversion limit
    if (subscription?.conversionsUsed >= subscription?.conversionsLimit) {
      toast.error('You have reached your conversion limit. Please upgrade your plan.')
      navigate('/pricing')
      return
    }

    setConverting(true)
    setError('')

    const formData = new FormData()
    formData.append('file', file)
    formData.append('toFormat', format)

    try {
      const response = await axios.post('/conversions/convert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setProgress(percentCompleted)
        }
      })

      setConversionId(response.data.conversionId)
      toast.success('Conversion started successfully!')
      
      // Poll for conversion status
      pollConversionStatus(response.data.conversionId)
    } catch (error) {
      if (error.response?.data?.limitReached) {
        toast.error('Conversion limit reached. Please upgrade your plan.')
        navigate('/pricing')
      } else {
        setError(error.response?.data?.message || 'Conversion failed. Please try again.')
      }
    } finally {
      setConverting(false)
      setProgress(0)
    }
  }

  const pollConversionStatus = async (id) => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(`/conversions/status/${id}`)
        if (response.data.status === 'completed') {
          clearInterval(interval)
          toast.success('Conversion completed!')
          // Trigger download
          window.open(response.data.outputUrl, '_blank')
        } else if (response.data.status === 'failed') {
          clearInterval(interval)
          setError('Conversion failed. Please try again.')
        }
      } catch (error) {
        console.error('Status check failed:', error)
      }
    }, 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-light text-slate-800 mb-4">
          Convert Your PDF
        </h1>
        <p className="text-slate-500 font-light max-w-2xl mx-auto">
          Upload your PDF file and choose your desired output format
          {subscription && (
            <span className="block mt-2 text-sm">
              {subscription.conversionsUsed} / {subscription.conversionsLimit} conversions used this month
            </span>
          )}
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Format Selection */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {formats.map((f) => (
            <button
              key={f.id}
              onClick={() => setFormat(f.id)}
              className={`px-6 py-3 rounded-full text-sm font-light transition-all flex items-center space-x-2 ${
                format === f.id
                  ? 'bg-slate-800 text-white shadow-lg'
                  : 'bg-white/50 text-slate-600 hover:bg-white hover:shadow-sm'
              }`}
            >
              <span>{f.icon}</span>
              <span>{f.name}</span>
            </button>
          ))}
        </div>

        {/* Upload Area */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all ${
            file
              ? 'border-amber-200 bg-amber-50/30'
              : 'border-slate-200 hover:border-amber-200 hover:bg-amber-50/10'
          }`}
        >
          {!file ? (
            <div>
              <FiUpload className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 font-light mb-2">
                Drag and drop your PDF here, or{' '}
                <label className="text-amber-500 hover:text-amber-600 cursor-pointer">
                  browse
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </p>
              <p className="text-sm text-slate-400 font-light">
                Maximum file size: 100MB
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
              <div className="flex items-center space-x-4">
                <FiFile className="w-8 h-8 text-amber-500" />
                <div className="text-left">
                  <p className="text-slate-800 font-light">{file.name}</p>
                  <p className="text-sm text-slate-400 font-light">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={removeFile}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <FiX className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          )}

          {/* Progress Bar */}
          {progress > 0 && progress < 100 && (
            <div className="mt-4">
              <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-slate-500 font-light mt-2">
                Uploading... {progress}%
              </p>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 rounded-2xl border border-red-100 flex items-center space-x-3">
            <FiAlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-400 text-sm font-light">{error}</p>
          </div>
        )}

        {/* Convert Button */}
        {file && !conversionId && (
          <div className="mt-8 text-center">
            <button
              onClick={handleConvert}
              disabled={converting}
              className="group px-10 py-4 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              {converting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="font-light">Converting...</span>
                </>
              ) : (
                <>
                  <FiDownload className="group-hover:translate-y-1 transition-transform" />
                  <span className="font-light">Convert to {formats.find(f => f.id === format)?.name}</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Success Message */}
        {conversionId && (
          <div className="mt-8 p-6 bg-green-50 rounded-2xl border border-green-100 text-center animate-fade-in">
            <FiCheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <p className="text-green-700 font-light mb-2">
              Conversion in progress!
            </p>
            <p className="text-sm text-green-600 font-light mb-4">
              Your file will download automatically when ready.
            </p>
            <button
              onClick={() => setFile(null)}
              className="text-green-600 hover:text-green-700 text-sm font-light underline"
            >
              Convert another file
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Converter