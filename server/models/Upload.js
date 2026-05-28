import mongoose from 'mongoose';

/**
 * Upload Schema
 * Tracks uploaded files and their processing status
 */
const uploadSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    fileName: {
      type: String,
      required: [true, 'File name is required'],
    },
    originalName: {
      type: String,
      required: [true, 'Original file name is required'],
    },
    filePath: {
      type: String,
      required: [true, 'File path is required'],
    },
    category: {
      type: String,
      enum: ['health', 'finance', 'career'],
      required: [true, 'Category is required'],
      index: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    processingStatus: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending',
      index: true,
    },
    processingError: {
      type: String,
      default: null,
    },
    extractedData: {
      // Dynamic object to store extracted information based on category
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    
    // Health-specific extraction
    healthMetrics: {
      bloodPressure: { systolic: Number, diastolic: Number },
      sugarLevel: Number,
      cholesterol: Number,
      bmi: Number,
      vitaminDeficiencies: [String],
      riskFactors: [String],
    },
    
    // Finance-specific extraction
    financialMetrics: {
      monthlyIncome: Number,
      monthlyExpenses: Number,
      savingsRate: Number,
      spendingCategories: {
        type: Map,
        of: Number,
      },
      financialRisks: [String],
    },
    
    // Career-specific extraction
    careerMetrics: {
      skills: [String],
      experience: String,
      technologies: [String],
      certifications: [String],
      education: String,
      experienceLevel: String,
    },
    
    aiAnalysis: {
      insights: [String],
      recommendations: [String],
      correlations: [String],
    },
    
    isProcessed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for user's uploads
uploadSchema.index({ userId: 1, category: 1 });
uploadSchema.index({ userId: 1, createdAt: -1 });

/**
 * Pre-save middleware to log upload creation
 */
uploadSchema.pre('save', function (next) {
  if (this.isNew) {
    console.log(`[Upload] New upload created: ${this.originalName} for user ${this.userId}`);
  }
  next();
});

/**
 * Instance method to mark as processing
 */
uploadSchema.methods.markAsProcessing = function () {
  this.processingStatus = 'processing';
  return this.save();
};

/**
 * Instance method to mark as completed
 */
uploadSchema.methods.markAsCompleted = function (extractedData = {}, aiAnalysis = {}) {
  this.processingStatus = 'completed';
  this.isProcessed = true;
  this.extractedData = extractedData;
  if (aiAnalysis && Object.keys(aiAnalysis).length > 0) {
    this.aiAnalysis = aiAnalysis;
  }
  return this.save();
};

/**
 * Instance method to mark as failed
 */
uploadSchema.methods.markAsFailed = function (error) {
  this.processingStatus = 'failed';
  this.processingError = error.message || error;
  return this.save();
};

const Upload = mongoose.model('Upload', uploadSchema);

export default Upload;
