import { useState } from 'react';
import { Upload as UploadIcon, FileText, DollarSign, Briefcase, X, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

/**
 * Upload Component
 * Handles file uploads for Health, Finance, and Career categories
 * Features:
 * - Category selection (Health, Finance, Career)
 * - File upload with drag-and-drop support
 * - File type validation
 * - Progress tracking
 * - Upload history preview
 */
const Upload = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadHistory, setUploadHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  // Category information
  const categories = {
    health: {
      icon: <FileText className="w-8 h-8" />,
      label: 'Health',
      description: 'Medical reports, lab results, prescriptions',
      color: 'from-green-500 to-emerald-600',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-300',
      acceptedFiles: '.pdf,.txt,.jpg,.jpeg,.png',
    },
    finance: {
      icon: <DollarSign className="w-8 h-8" />,
      label: 'Finance',
      description: 'Bank statements, expense sheets, salary slips',
      color: 'from-blue-500 to-cyan-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-300',
      acceptedFiles: '.pdf,.csv,.txt,.jpg,.jpeg,.png',
    },
    career: {
      icon: <Briefcase className="w-8 h-8" />,
      label: 'Career',
      description: 'Resumes, certificates, portfolios',
      color: 'from-purple-500 to-pink-600',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-300',
      acceptedFiles: '.pdf,.txt,.jpg,.jpeg,.png,.doc,.docx',
    },
  };

  // Handle file selection via input
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  // Handle drag and drop
  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  // Validate file before setting it
  const validateAndSetFile = (file) => {
    if (!selectedCategory) {
      toast.error('Please select a category first');
      return;
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast.error('File size must be less than 10MB');
      return;
    }

    const category = categories[selectedCategory];
    const allowedExtensions = category.acceptedFiles.split(',').map(ext => ext.trim());
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!allowedExtensions.includes(fileExtension)) {
      toast.error(`Invalid file type. Allowed types: ${category.acceptedFiles}`);
      return;
    }

    setSelectedFile(file);
    toast.success('File selected successfully');
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile || !selectedCategory) {
      toast.error('Please select a file and category');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('category', selectedCategory);

      const token = localStorage.getItem('token'); // Get auth token from localStorage

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/upload/${selectedCategory}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          },
        }
      );

      toast.success('File uploaded successfully! Processing has started.');
      setSelectedFile(null);
      setUploadProgress(0);

      // Refresh upload history
      if (showHistory) {
        fetchUploadHistory();
      }
    } catch (error) {
      console.error('Upload error:', error);
      const errorMessage = error.response?.data?.message || 'Upload failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  // Fetch upload history
  const fetchUploadHistory = async () => {
    if (!selectedCategory) {
      toast.error('Please select a category');
      return;
    }

    setIsLoadingHistory(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/upload/history?category=${selectedCategory}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      setUploadHistory(response.data.data || []);
      setShowHistory(true);
    } catch (error) {
      console.error('Failed to fetch history:', error);
      toast.error('Failed to fetch upload history');
    } finally {
      setIsLoadingHistory(false);
    }
  };

  // Delete upload
  const handleDeleteUpload = async (uploadId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/upload/${uploadId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      toast.success('Upload deleted successfully');
      fetchUploadHistory();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete upload');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center mb-4">
            <UploadIcon className="w-10 h-10 text-blue-400 mr-3" />
            <h1 className="text-4xl font-bold text-white">Upload Your Documents</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Share your health, finance, and career documents for AI analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Upload Section */}
          <div className="lg:col-span-2">
            {/* Category Selection */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Select Category</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(categories).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedCategory(key);
                      setSelectedFile(null);
                      setShowHistory(false);
                    }}
                    className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                      selectedCategory === key
                        ? `border-white ${category.bgColor} shadow-lg shadow-${key}-500/50`
                        : `border-gray-600 hover:border-gray-400 bg-gray-800/50 hover:bg-gray-800`
                    }`}
                  >
                    <div className={`${category.textColor} mb-3`}>{category.icon}</div>
                    <h3 className="font-semibold text-white mb-1">{category.label}</h3>
                    <p className="text-sm text-gray-400">{category.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* File Upload Area */}
            {selectedCategory && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Upload File</h2>
                
                {/* Drag and Drop Area */}
                <div
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-lg p-12 transition-all duration-300 ${
                    isDragging
                      ? 'border-blue-400 bg-blue-500/10'
                      : `border-gray-600 bg-gray-800/30`
                  }`}
                >
                  <div className="text-center">
                    {!selectedFile ? (
                      <>
                        <UploadIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-white mb-2">
                          Drag and drop your file here
                        </h3>
                        <p className="text-gray-400 mb-4">or</p>
                        <label className="inline-block">
                          <span className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors duration-200">
                            Browse Files
                          </span>
                          <input
                            type="file"
                            hidden
                            onChange={handleFileSelect}
                            accept={categories[selectedCategory]?.acceptedFiles}
                          />
                        </label>
                        <p className="text-sm text-gray-500 mt-4">
                          Maximum file size: 10MB
                        </p>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {selectedFile.name}
                        </h3>
                        <p className="text-gray-400 mb-4">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        <button
                          onClick={() => setSelectedFile(null)}
                          className="text-blue-400 hover:text-blue-300 text-sm mb-4"
                        >
                          Change File
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Upload Button */}
            {selectedFile && selectedCategory && (
              <div className="mb-8">
                <button
                  onClick={handleUpload}
                  disabled={isUploading}
                  className={`w-full py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    isUploading
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white cursor-pointer'
                  }`}
                >
                  {isUploading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Uploading ({uploadProgress}%)
                    </>
                  ) : (
                    <>
                      <UploadIcon className="w-5 h-5" />
                      Upload File
                    </>
                  )}
                </button>

                {isUploading && (
                  <div className="mt-4 bg-gray-800 rounded-lg p-4">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-400 mt-2 text-center">
                      {uploadProgress === 100 ? 'Processing...' : `Uploading ${uploadProgress}%`}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Upload History Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-white mb-4">Upload History</h2>
              
              {selectedCategory && (
                <button
                  onClick={fetchUploadHistory}
                  disabled={isLoadingHistory}
                  className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 mb-4 disabled:opacity-50"
                >
                  {isLoadingHistory ? 'Loading...' : 'View History'}
                </button>
              )}

              {!selectedCategory && (
                <p className="text-gray-400 text-sm">
                  Select a category to view upload history
                </p>
              )}

              {showHistory && uploadHistory.length > 0 && (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {uploadHistory.map((upload) => (
                    <div
                      key={upload._id}
                      className="bg-gray-700/50 rounded-lg p-3 border border-gray-600"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-white truncate">
                            {upload.originalName}
                          </p>
                          <p className="text-xs text-gray-400">
                            {(upload.fileSize / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteUpload(upload._id)}
                          className="text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs">
                        {upload.processingStatus === 'completed' && (
                          <>
                            <CheckCircle className="w-3 h-3 text-green-400" />
                            <span className="text-green-400">Processed</span>
                          </>
                        )}
                        {upload.processingStatus === 'processing' && (
                          <>
                            <Loader className="w-3 h-3 text-blue-400 animate-spin" />
                            <span className="text-blue-400">Processing...</span>
                          </>
                        )}
                        {upload.processingStatus === 'failed' && (
                          <>
                            <AlertCircle className="w-3 h-3 text-red-400" />
                            <span className="text-red-400">Failed</span>
                          </>
                        )}
                        {upload.processingStatus === 'pending' && (
                          <>
                            <AlertCircle className="w-3 h-3 text-yellow-400" />
                            <span className="text-yellow-400">Pending</span>
                          </>
                        )}
                      </div>
                      
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(upload.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {showHistory && uploadHistory.length === 0 && selectedCategory && (
                <p className="text-gray-400 text-sm">No uploads yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Information Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-900/20 border border-green-800 rounded-lg p-6">
            <FileText className="w-8 h-8 text-green-400 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Health Analysis</h3>
            <p className="text-gray-400 text-sm">
              Upload medical reports to extract health metrics and get AI recommendations
            </p>
          </div>

          <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-6">
            <DollarSign className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Financial Insights</h3>
            <p className="text-gray-400 text-sm">
              Share bank statements to analyze spending and improve financial planning
            </p>
          </div>

          <div className="bg-purple-900/20 border border-purple-800 rounded-lg p-6">
            <Briefcase className="w-8 h-8 text-purple-400 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Career Growth</h3>
            <p className="text-gray-400 text-sm">
              Upload resumes to identify skills gaps and career development opportunities
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
