import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create category subdirectory
    const category = req.body.category || 'general';
    const categoryPath = path.join(uploadsDir, category);
    
    if (!fs.existsSync(categoryPath)) {
      fs.mkdirSync(categoryPath, { recursive: true });
    }
    
    cb(null, categoryPath);
  },
  filename: (req, file, cb) => {
    // Generate unique filename: timestamp_originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}_${uniqueSuffix}${ext}`);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  // Allowed file types by category
  const allowedMimes = {
    health: ['application/pdf', 'image/jpeg', 'image/png', 'text/plain'],
    finance: ['application/pdf', 'image/jpeg', 'image/png', 'text/csv', 'text/plain'],
    career: ['application/pdf', 'image/jpeg', 'image/png', 'text/plain', 'application/msword'],
  };
  
  const category = req.body.category || 'general';
  const allowed = allowedMimes[category] || [];
  
  if (allowed.length === 0 || allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`File type ${file.mimetype} not allowed for ${category} uploads`), false);
  }
};

// Multer configuration
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

/**
 * Middleware to handle single file upload
 * Field name: 'file'
 */
export const uploadSingleFile = upload.single('file');

/**
 * Middleware to handle multiple file uploads
 * Field name: 'files'
 */
export const uploadMultipleFiles = upload.array('files', 5); // Max 5 files

/**
 * Custom middleware to validate upload
 */
export const validateUpload = (req, res, next) => {
  if (!req.file && !req.files) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded',
      code: 'NO_FILE',
    });
  }
  
  if (!req.body.category || !['health', 'finance', 'career'].includes(req.body.category)) {
    return res.status(400).json({
      success: false,
      message: 'Valid category is required (health, finance, or career)',
      code: 'INVALID_CATEGORY',
    });
  }
  
  next();
};

export default upload;
