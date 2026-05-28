import express from 'express';
import {
  uploadFile,
  getUploadHistory,
  getUpload,
  removeUpload,
  getStats,
  getAnalytics,
} from '../controllers/uploadController.js';
import { authenticateToken } from '../middleware/auth.js';
import { uploadSingleFile, validateUpload } from '../middleware/multerMiddleware.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

/**
 * @route   POST /api/upload/:category
 * @desc    Upload file for specific category (health, finance, career)
 * @access  Private
 * @param   category - URL parameter: health | finance | career
 * @body    file - multipart/form-data
 */
router.post(
  '/:category',
  uploadSingleFile,
  validateUpload,
  asyncHandler(uploadFile)
);

/**
 * @route   GET /api/upload/history
 * @desc    Get user's upload history with pagination
 * @access  Private
 * @query   category - Optional filter by category
 * @query   limit - Page size (default: 10)
 * @query   skip - Number of items to skip (default: 0)
 */
router.get('/history', asyncHandler(getUploadHistory));

/**
 * @route   GET /api/upload/stats
 * @desc    Get upload statistics for user
 * @access  Private
 */
router.get('/stats', asyncHandler(getStats));

/**
 * @route   GET /api/upload/analytics/:category
 * @desc    Get processed data and AI analysis for specific category
 * @access  Private
 * @param   category - health | finance | career
 */
router.get('/analytics/:category', asyncHandler(getAnalytics));

/**
 * @route   GET /api/upload/:uploadId
 * @desc    Get details of specific upload
 * @access  Private
 * @param   uploadId - MongoDB ObjectId
 */
router.get('/:uploadId', asyncHandler(getUpload));

/**
 * @route   DELETE /api/upload/:uploadId
 * @desc    Delete specific upload
 * @access  Private
 * @param   uploadId - MongoDB ObjectId
 */
router.delete('/:uploadId', asyncHandler(removeUpload));

export default router;
