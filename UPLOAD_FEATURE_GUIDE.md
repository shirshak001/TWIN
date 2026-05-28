# Upload Feature - Complete Documentation

## Overview

The Upload Feature is a comprehensive file management system that allows users to upload documents across three categories: Health, Finance, and Career. The backend automatically processes these documents using AI to extract relevant information and provide intelligent recommendations.

## Features

### 1. **Multi-Category Upload**
- **Health**: Medical reports, lab results, prescriptions, fitness reports
- **Finance**: Bank statements, expense sheets, salary slips, investment documents
- **Career**: Resumes, certificates, skill documents, portfolios

### 2. **File Processing**
- Automatic text extraction from PDF, TXT, and image files
- Intelligent pattern matching for key metrics
- Category-specific data extraction
- AI-powered recommendations and insights

### 3. **Upload Management**
- File upload history tracking
- Processing status monitoring
- File deletion
- Upload statistics

### 4. **Data Security**
- File size limit: 10MB per upload
- Supported formats: PDF, TXT, JPG, PNG, CSV, DOC, DOCX
- Organized storage by category
- User isolation (only authenticated users can access their uploads)

---

## Architecture

### Backend Structure

```
server/
├── middleware/
│   └── multerMiddleware.js          # File upload handling
├── models/
│   └── Upload.js                    # Upload schema
├── controllers/
│   └── uploadController.js          # Upload API endpoints
├── services/
│   ├── uploadService.js             # Upload business logic
│   └── fileProcessingService.js     # Document processing
├── routes/
│   └── upload.js                    # Upload routes
└── uploads/                         # Storage directory
    ├── health/
    ├── finance/
    └── career/
```

### Frontend Structure

```
client/
├── src/
│   ├── components/
│   │   └── Upload.jsx               # Main upload component
│   ├── pages/
│   │   └── Uploads.jsx              # Upload page
│   └── App.jsx                      # Router configuration
```

---

## API Endpoints

### 1. **Upload File**
```
POST /api/upload/:category
Headers: Authorization: Bearer <token>
Body: multipart/form-data
  - file: File object
  - category: 'health' | 'finance' | 'career'

Response:
{
  "success": true,
  "message": "File uploaded successfully. Processing has started.",
  "data": {
    "uploadId": "ObjectId",
    "fileName": "document.pdf",
    "category": "health",
    "fileSize": 2048,
    "status": "pending"
  }
}
```

### 2. **Get Upload History**
```
GET /api/upload/history?category=health&limit=10&skip=0
Headers: Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": [
    {
      "_id": "ObjectId",
      "originalName": "medical_report.pdf",
      "category": "health",
      "fileSize": 2048,
      "processingStatus": "completed",
      "extractedData": {...},
      "aiAnalysis": {...},
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "limit": 10,
    "skip": 0,
    "total": 25,
    "hasMore": true
  }
}
```

### 3. **Get Upload Details**
```
GET /api/upload/:uploadId
Headers: Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "_id": "ObjectId",
    "originalName": "document.pdf",
    "category": "health",
    "processingStatus": "completed",
    "extractedData": {...},
    "aiAnalysis": {...}
  }
}
```

### 4. **Get Upload Statistics**
```
GET /api/upload/stats
Headers: Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "health": {
      "count": 5,
      "totalSize": "12.50 MB"
    },
    "finance": {
      "count": 3,
      "totalSize": "8.25 MB"
    },
    "career": {
      "count": 2,
      "totalSize": "3.75 MB"
    }
  }
}
```

### 5. **Get Analytics Data**
```
GET /api/upload/analytics/:category
Headers: Authorization: Bearer <token>

Response:
{
  "success": true,
  "category": "health",
  "data": {
    "uploads": [
      {
        "uploadedAt": "2024-01-15T10:30:00Z",
        "data": {
          "bloodPressure": {"systolic": 120, "diastolic": 80},
          "sugarLevel": 95,
          "riskFactors": ["Stress"]
        },
        "aiAnalysis": {
          "insights": [...],
          "recommendations": [...],
          "correlations": [...]
        }
      }
    ]
  }
}
```

### 6. **Delete Upload**
```
DELETE /api/upload/:uploadId
Headers: Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Upload deleted successfully"
}
```

---

## Data Extraction

### Health Document Processing

**Extracted Metrics:**
- Blood Pressure (systolic/diastolic)
- Sugar/Glucose Level
- Cholesterol
- BMI
- Risk Factors (Hypertension, Diabetes, Obesity, Stress, Anxiety)
- Vitamin Deficiencies

**AI Analysis:**
- Health recommendations
- Risk factor insights
- Monitoring suggestions
- Lifestyle recommendations

### Finance Document Processing

**Extracted Metrics:**
- Monthly Income
- Monthly Expenses
- Savings Rate
- Spending Categories (Food, Transportation, Utilities, Entertainment, Healthcare)
- Financial Risks

**AI Analysis:**
- Savings recommendations
- Spending pattern analysis
- Budget optimization
- Risk detection
- Investment suggestions

### Career Document Processing

**Extracted Metrics:**
- Technical Skills
- Technologies Used
- Certifications
- Education Level
- Years of Experience
- Experience Level (Entry, Mid, Senior, Expert)

**AI Analysis:**
- Skill gap analysis
- Career development path
- Technology trends alignment
- Freelancing opportunities
- Professional growth recommendations

---

## Processing Workflow

```
User Upload
    ↓
Frontend Validation (Type, Size)
    ↓
Multer Middleware (File Storage)
    ↓
Database Record Creation (Status: pending)
    ↓
Async Processing Trigger
    ↓
Document Text Extraction (PDF/Text/Image)
    ↓
Pattern Matching & Data Extraction
    ↓
AI Analysis Generation
    ↓
Database Update (Status: completed, Data: {...})
    ↓
Dashboard Intelligence Updates
```

---

## File Supported Formats

### By Category

**Health:**
- PDF (medical reports, lab results)
- TXT (text-based records)
- JPG/PNG (medical images)

**Finance:**
- PDF (bank statements, documents)
- CSV (expense spreadsheets)
- TXT (text records)
- JPG/PNG (scanned statements)

**Career:**
- PDF (resumes, certifications)
- TXT (text documents)
- JPG/PNG (document images)
- DOC/DOCX (Word documents)

### File Constraints
- **Maximum Size:** 10MB per file
- **Maximum Files Per Upload:** 1 file (can be extended)
- **Supported Formats:** PDF, TXT, CSV, JPG, JPEG, PNG, DOC, DOCX

---

## Frontend Component Usage

### Import
```javascript
import Upload from '../components/Upload';
```

### Usage
```javascript
<Upload />
```

### Features
- Real-time file validation
- Drag-and-drop support
- Upload progress tracking
- Upload history display
- File deletion
- Processing status monitoring

---

## Setup Instructions

### Backend Setup

1. **Install Dependencies**
```bash
cd server
npm install
```

2. **Environment Variables**
Add to `.env`:
```
JWT_SECRET=your_secret_key
MONGODB_URI=your_mongodb_connection
NODE_ENV=development
```

3. **Database Setup**
Ensure MongoDB is running and connected.

4. **Run Server**
```bash
npm run dev
```

### Frontend Setup

1. **Install Dependencies**
```bash
cd client
npm install
```

2. **Environment Variables**
Add to `.env`:
```
VITE_API_URL=http://localhost:5000
```

3. **Run Client**
```bash
npm run dev
```

---

## Error Handling

### Common Errors

**No File Uploaded**
```json
{
  "success": false,
  "message": "No file uploaded",
  "code": "NO_FILE"
}
```

**Invalid Category**
```json
{
  "success": false,
  "message": "Valid category is required (health, finance, or career)",
  "code": "INVALID_CATEGORY"
}
```

**File Too Large**
```json
{
  "success": false,
  "message": "File size must be less than 10MB",
  "code": "FILE_TOO_LARGE"
}
```

**Invalid File Type**
```json
{
  "success": false,
  "message": "File type .zip not allowed for health uploads",
  "code": "INVALID_FILE_TYPE"
}
```

**Upload Not Found**
```json
{
  "success": false,
  "message": "Upload not found",
  "code": "NOT_FOUND"
}
```

---

## Processing Status

The system tracks upload processing through several states:

- **pending**: File uploaded, waiting to be processed
- **processing**: Currently extracting data and analyzing
- **completed**: Processing finished, data available
- **failed**: Processing error occurred

---

## Security Features

1. **Authentication Required**: All endpoints require JWT authentication
2. **User Isolation**: Users can only access their own uploads
3. **File Validation**: Type and size validation on frontend and backend
4. **Secure Storage**: Files organized by category and user
5. **Error Messages**: Detailed error responses for debugging

---

## Integration with Other Features

### Dashboard Integration
The upload feature integrates with the dashboard to show:
- Upload statistics
- Processing status
- Extracted insights
- AI recommendations

### Health Page Integration
- Health metrics from uploads
- Medical risk factors
- Health trends and predictions

### Finance Page Integration
- Spending analysis from bank statements
- Budget recommendations
- Financial risk alerts

### Career Page Integration
- Skill analysis
- Career recommendations
- Professional development paths

---

## Future Enhancements

1. **Cloud Storage Integration**
   - AWS S3 upload
   - Google Cloud Storage
   - Cloudinary CDN

2. **Advanced Processing**
   - OCR for images
   - Audio transcription
   - Real-time streaming

3. **Batch Uploads**
   - Multiple file upload
   - Scheduled processing
   - Bulk operations

4. **Export Features**
   - Download processed data
   - Generate reports
   - Share with professionals

5. **API Integration**
   - HealthKit integration
   - Banking APIs
   - LinkedIn integration

---

## Troubleshooting

### Issue: Upload fails with "No token"
- **Solution**: Ensure you're logged in and token is saved in localStorage

### Issue: File processing takes too long
- **Solution**: Check file size and format. Large PDFs may take longer to process.

### Issue: Extracted data is incomplete
- **Solution**: Ensure document format matches expected structure. Clear, readable documents extract better.

### Issue: "Cannot POST /api/upload/:category"
- **Solution**: Ensure upload routes are properly imported in server.js

---

## Best Practices

1. **File Quality**: Upload clear, readable documents for better extraction
2. **File Format**: Use PDF for best results; images should be high resolution
3. **File Organization**: Keep documents recent and relevant to your profile
4. **Regular Updates**: Re-upload documents when information changes
5. **Privacy**: Only upload documents you're comfortable storing on the platform

---

## Support

For issues or questions:
1. Check the error logs in browser console (Frontend)
2. Check server logs (Backend)
3. Verify file format and size
4. Ensure all endpoints are properly configured
5. Test with sample files first

---

**Last Updated:** January 2024
**Version:** 1.0.0
