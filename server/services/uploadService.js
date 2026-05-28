import Upload from '../models/Upload.js';
import { processDocument } from './fileProcessingService.js';
import fs from 'fs';
import path from 'path';

/**
 * Upload Service
 * Handles upload operations and file management
 */

/**
 * Save upload record and process file
 */
export const handleFileUpload = async (userId, file, category) => {
  const { filename, path: filePath, mimetype, size, originalname } = file;
  
  try {
    // Create upload record
    const upload = new Upload({
      userId,
      fileName: filename,
      originalName: originalname,
      filePath,
      category,
      mimeType: mimetype,
      fileSize: size,
      processingStatus: 'pending',
    });
    
    // Save to database
    await upload.save();
    
    console.log(`[Upload] File saved to database with ID: ${upload._id}`);
    
    // Process file asynchronously (in production, use job queue like Bull or Celery)
    setImmediate(() => {
      processFileAsync(upload._id, filePath, category, mimetype).catch(err => {
        console.error(`[Upload] Processing error for upload ${upload._id}:`, err);
      });
    });
    
    return {
      uploadId: upload._id,
      status: 'pending',
      message: 'File uploaded successfully. Processing has started.',
    };
  } catch (error) {
    // Clean up file if database save fails
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw error;
  }
};

/**
 * Process file asynchronously
 */
const processFileAsync = async (uploadId, filePath, category, mimeType) => {
  const upload = await Upload.findById(uploadId);
  
  if (!upload) {
    console.error(`[Upload] Upload record not found: ${uploadId}`);
    return;
  }
  
  try {
    // Mark as processing
    await upload.markAsProcessing();
    
    console.log(`[Upload] Starting document processing: ${uploadId}`);
    
    // Process the document
    const result = await processDocument(filePath, category, mimeType);
    
    // Mark as completed with extracted data
    await upload.markAsCompleted(result.extractedData, result.aiAnalysis);
    
    console.log(`[Upload] Processing completed: ${uploadId}`);
  } catch (error) {
    console.error(`[Upload] Processing failed: ${uploadId}`, error);
    await upload.markAsFailed(error);
  }
};

/**
 * Get upload history for user
 */
export const getUserUploads = async (userId, category = null, limit = 10, skip = 0) => {
  const query = { userId };
  
  if (category) {
    query.category = category;
  }
  
  const uploads = await Upload.find(query)
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .select('-filePath'); // Don't expose file paths to client
  
  const total = await Upload.countDocuments(query);
  
  return {
    uploads,
    total,
    hasMore: skip + limit < total,
  };
};

/**
 * Get single upload details
 */
export const getUploadDetails = async (uploadId, userId) => {
  const upload = await Upload.findOne({
    _id: uploadId,
    userId,
  });
  
  if (!upload) {
    throw new Error('Upload not found');
  }
  
  // Don't expose actual file path
  const uploadData = upload.toObject();
  delete uploadData.filePath;
  
  return uploadData;
};

/**
 * Delete upload
 */
export const deleteUpload = async (uploadId, userId) => {
  const upload = await Upload.findOne({
    _id: uploadId,
    userId,
  });
  
  if (!upload) {
    throw new Error('Upload not found');
  }
  
  // Delete file from storage
  if (fs.existsSync(upload.filePath)) {
    try {
      fs.unlinkSync(upload.filePath);
      console.log(`[Upload] File deleted: ${upload.filePath}`);
    } catch (err) {
      console.error(`[Upload] Failed to delete file: ${upload.filePath}`, err);
    }
  }
  
  // Delete record from database
  await Upload.findByIdAndDelete(uploadId);
  
  return { message: 'Upload deleted successfully' };
};

/**
 * Get uploads statistics for user
 */
export const getUploadStats = async (userId) => {
  const stats = await Upload.aggregate([
    { $match: { userId: userId } },
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
        totalSize: { $sum: '$fileSize' },
      },
    },
  ]);
  
  return stats;
};

/**
 * Get processed uploads with extracted data
 */
export const getProcessedData = async (userId, category) => {
  const uploads = await Upload.find({
    userId,
    category,
    processingStatus: 'completed',
  }).sort({ createdAt: -1 });
  
  // Aggregate extracted data
  const aggregatedData = {
    health: {},
    finance: {},
    career: {},
  };
  
  uploads.forEach(upload => {
    if (upload.extractedData && Object.keys(upload.extractedData).length > 0) {
      // Store all extracted data for AI analysis
      if (!aggregatedData[category].uploads) {
        aggregatedData[category].uploads = [];
      }
      aggregatedData[category].uploads.push({
        uploadedAt: upload.createdAt,
        data: upload.extractedData,
        aiAnalysis: upload.aiAnalysis,
      });
    }
  });
  
  return aggregatedData[category];
};

export default {
  handleFileUpload,
  getUserUploads,
  getUploadDetails,
  deleteUpload,
  getUploadStats,
  getProcessedData,
};
