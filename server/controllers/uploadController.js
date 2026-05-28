import {
  handleFileUpload,
  getUserUploads,
  getUploadDetails,
  deleteUpload,
  getUploadStats,
  getProcessedData,
} from '../services/uploadService.js';

/**
 * @route   POST /api/upload/:category
 * @desc    Upload file for specific category
 * @access  Private
 */
export const uploadFile = async (req, res) => {
  try {
    const { category } = req.params;
    const userId = req.user.userId;
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
        code: 'NO_FILE',
      });
    }
    
    if (!['health', 'finance', 'career'].includes(category)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category. Must be one of: health, finance, career',
        code: 'INVALID_CATEGORY',
      });
    }
    
    // Handle file upload
    const result = await handleFileUpload(userId, req.file, category);
    
    return res.status(201).json({
      success: true,
      message: result.message,
      data: {
        uploadId: result.uploadId,
        fileName: req.file.originalname,
        category,
        fileSize: req.file.size,
        status: result.status,
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({
      success: false,
      message: 'File upload failed',
      error: error.message,
    });
  }
};

/**
 * @route   GET /api/upload/history
 * @desc    Get user's upload history
 * @access  Private
 */
export const getUploadHistory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { category, limit = 10, skip = 0 } = req.query;
    
    const result = await getUserUploads(
      userId,
      category || null,
      parseInt(limit),
      parseInt(skip)
    );
    
    return res.status(200).json({
      success: true,
      data: result.uploads,
      pagination: {
        limit: parseInt(limit),
        skip: parseInt(skip),
        total: result.total,
        hasMore: result.hasMore,
      },
    });
  } catch (error) {
    console.error('Get history error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch upload history',
      error: error.message,
    });
  }
};

/**
 * @route   GET /api/upload/:uploadId
 * @desc    Get upload details
 * @access  Private
 */
export const getUpload = async (req, res) => {
  try {
    const { uploadId } = req.params;
    const userId = req.user.userId;
    
    const upload = await getUploadDetails(uploadId, userId);
    
    return res.status(200).json({
      success: true,
      data: upload,
    });
  } catch (error) {
    if (error.message === 'Upload not found') {
      return res.status(404).json({
        success: false,
        message: 'Upload not found',
        code: 'NOT_FOUND',
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch upload details',
      error: error.message,
    });
  }
};

/**
 * @route   DELETE /api/upload/:uploadId
 * @desc    Delete upload
 * @access  Private
 */
export const removeUpload = async (req, res) => {
  try {
    const { uploadId } = req.params;
    const userId = req.user.userId;
    
    const result = await deleteUpload(uploadId, userId);
    
    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    if (error.message === 'Upload not found') {
      return res.status(404).json({
        success: false,
        message: 'Upload not found',
        code: 'NOT_FOUND',
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Failed to delete upload',
      error: error.message,
    });
  }
};

/**
 * @route   GET /api/upload/stats
 * @desc    Get upload statistics for user
 * @access  Private
 */
export const getStats = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const stats = await getUploadStats(userId);
    
    const formattedStats = {
      health: { count: 0, totalSize: 0 },
      finance: { count: 0, totalSize: 0 },
      career: { count: 0, totalSize: 0 },
    };
    
    stats.forEach(stat => {
      if (formattedStats[stat._id]) {
        formattedStats[stat._id] = {
          count: stat.count,
          totalSize: (stat.totalSize / (1024 * 1024)).toFixed(2) + ' MB',
        };
      }
    });
    
    return res.status(200).json({
      success: true,
      data: formattedStats,
    });
  } catch (error) {
    console.error('Get stats error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch upload statistics',
      error: error.message,
    });
  }
};

/**
 * @route   GET /api/upload/analytics/:category
 * @desc    Get processed data and AI analysis for category
 * @access  Private
 */
export const getAnalytics = async (req, res) => {
  try {
    const { category } = req.params;
    const userId = req.user.userId;
    
    if (!['health', 'finance', 'career'].includes(category)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category',
        code: 'INVALID_CATEGORY',
      });
    }
    
    const analyticsData = await getProcessedData(userId, category);
    
    return res.status(200).json({
      success: true,
      category,
      data: analyticsData,
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics',
      error: error.message,
    });
  }
};

export default {
  uploadFile,
  getUploadHistory,
  getUpload,
  removeUpload,
  getStats,
  getAnalytics,
};
