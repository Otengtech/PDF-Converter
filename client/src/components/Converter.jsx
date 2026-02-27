import React, { useState } from 'react';
import { FiUpload, FiDownload, FiFile, FiX, FiCheckCircle } from 'react-icons/fi';
import axios from 'axios';

// Using a free PDF API (replace with your preferred API)
const API_KEY = import.meta.env.VITE_PDF_API_KEY; // Get from https://www.pdf.co or similar free service
const API_URL = 'https://api.pdf.co/v1/pdf/convert/to/doc'; // Example API

const Converter = () => {
  const [file, setFile] = useState(null);
  const [converting, setConverting] = useState(false);
  const [converted, setConverted] = useState(false);
  const [format, setFormat] = useState('word');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
      setConverted(false);
    } else {
      setError('Please select a valid PDF file');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
      setError('');
      setConverted(false);
    } else {
      setError('Please drop a valid PDF file');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removeFile = () => {
    setFile(null);
    setConverted(false);
  };

  const handleConvert = async () => {
    if (!file) return;
    
    setConverting(true);
    setError('');

    try {
      // Example API call - replace with your actual API
      const formData = new FormData();
      formData.append('file', file);
      formData.append('outputFormat', format);

      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-api-key': API_KEY,
        },
      });

      if (response.data) {
        setConverted(true);
        // Handle the converted file download
        // window.open(response.data.url, '_blank');
      }
    } catch (err) {
      setError('Conversion failed. Please try again.');
      console.error('Conversion error:', err);
    } finally {
      setConverting(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div className="text-center mb-12 animate-slide-up">
        <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-4">
          Start Converting
        </h2>
        <p className="text-slate-500 font-light">
          Upload your PDF and choose your desired format
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Format Selection */}
        <div className="flex justify-center space-x-4 mb-8">
          {['word', 'excel', 'ppt', 'jpg'].map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`px-6 py-3 rounded-full text-sm font-light transition-all ${
                format === f
                  ? 'bg-slate-800 text-white shadow-lg'
                  : 'bg-white/50 text-slate-600 hover:bg-white hover:shadow-sm'
              }`}
            >
              {f.toUpperCase()}
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
              <FiUpload className="w-12 h-12 text-slate-300 mx-auto mb-4" />
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
        </div>

        {/* Error Message */}
        {error && (
          <p className="mt-4 text-red-400 text-sm text-center font-light">
            {error}
          </p>
        )}

        {/* Convert Button */}
        {file && !converted && (
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
                  <span className="font-light">Convert to {format.toUpperCase()}</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Success Message */}
        {converted && (
          <div className="mt-8 p-6 bg-green-50 rounded-2xl border border-green-100 text-center animate-fade-in">
            <FiCheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <p className="text-green-700 font-light mb-2">
              Conversion complete!
            </p>
            <button className="text-green-600 hover:text-green-700 text-sm font-light underline">
              Download your file
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Converter;