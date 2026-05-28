# Upload Feature - Quick API Reference

## Base URL
```
http://localhost:5000/api/upload
```

## Authentication
All endpoints require JWT token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 1. Upload File

**Endpoint:** `POST /api/upload/:category`

**Categories:** `health` | `finance` | `career`

**Request:**
```bash
curl -X POST http://localhost:5000/api/upload/health \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@document.pdf" \
  -F "category=health"
```

**JavaScript/Axios:**
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('category', 'health');

const response = await axios.post(
  'http://localhost:5000/api/upload/health',
  formData,
  {
    headers: { Authorization: `Bearer ${token}` },
  }
);
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "File uploaded successfully. Processing has started.",
  "data": {
    "uploadId": "65a1b2c3d4e5f6g7h8i9j0k1",
    "fileName": "document.pdf",
    "category": "health",
    "fileSize": 2048,
    "status": "pending"
  }
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "message": "File size must be less than 10MB",
  "code": "FILE_TOO_LARGE"
}
```

---

## 2. Get Upload History

**Endpoint:** `GET /api/upload/history`

**Query Parameters:**
- `category` (optional): Filter by category (health|finance|career)
- `limit` (optional): Number of items per page (default: 10)
- `skip` (optional): Number of items to skip (default: 0)

**Request:**
```bash
curl -X GET "http://localhost:5000/api/upload/history?category=health&limit=10&skip=0" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**JavaScript/Axios:**
```javascript
const response = await axios.get(
  'http://localhost:5000/api/upload/history',
  {
    params: { category: 'health', limit: 10, skip: 0 },
    headers: { Authorization: `Bearer ${token}` }
  }
);
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "originalName": "medical_report.pdf",
      "category": "health",
      "fileSize": 2048,
      "processingStatus": "completed",
      "extractedData": {
        "bloodPressure": { "systolic": 120, "diastolic": 80 },
        "sugarLevel": 95,
        "cholesterol": 180
      },
      "aiAnalysis": {
        "insights": ["Normal blood pressure"],
        "recommendations": ["Maintain current lifestyle"],
        "correlations": []
      },
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

---

## 3. Get Upload Details

**Endpoint:** `GET /api/upload/:uploadId`

**Request:**
```bash
curl -X GET "http://localhost:5000/api/upload/65a1b2c3d4e5f6g7h8i9j0k1" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**JavaScript/Axios:**
```javascript
const response = await axios.get(
  `http://localhost:5000/api/upload/${uploadId}`,
  { headers: { Authorization: `Bearer ${token}` } }
);
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "originalName": "document.pdf",
    "category": "health",
    "processingStatus": "completed",
    "extractedData": { /* ... */ },
    "aiAnalysis": { /* ... */ },
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

## 4. Get Upload Statistics

**Endpoint:** `GET /api/upload/stats`

**Request:**
```bash
curl -X GET "http://localhost:5000/api/upload/stats" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**JavaScript/Axios:**
```javascript
const response = await axios.get(
  'http://localhost:5000/api/upload/stats',
  { headers: { Authorization: `Bearer ${token}` } }
);
```

**Success Response (200):**
```json
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

---

## 5. Get Analytics Data

**Endpoint:** `GET /api/upload/analytics/:category`

**Categories:** `health` | `finance` | `career`

**Request:**
```bash
curl -X GET "http://localhost:5000/api/upload/analytics/health" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**JavaScript/Axios:**
```javascript
const response = await axios.get(
  'http://localhost:5000/api/upload/analytics/health',
  { headers: { Authorization: `Bearer ${token}` } }
);
```

**Success Response (200):**
```json
{
  "success": true,
  "category": "health",
  "data": {
    "uploads": [
      {
        "uploadedAt": "2024-01-15T10:30:00Z",
        "data": {
          "bloodPressure": { "systolic": 120, "diastolic": 80 },
          "sugarLevel": 95,
          "cholesterol": 180,
          "bmi": 22.5,
          "vitaminDeficiencies": ["Vitamin D"],
          "riskFactors": []
        },
        "aiAnalysis": {
          "insights": [
            "Normal blood pressure",
            "Vitamin D deficiency detected"
          ],
          "recommendations": [
            "Increase vitamin D intake",
            "Maintain current exercise routine"
          ],
          "correlations": []
        }
      }
    ]
  }
}
```

---

## 6. Delete Upload

**Endpoint:** `DELETE /api/upload/:uploadId`

**Request:**
```bash
curl -X DELETE "http://localhost:5000/api/upload/65a1b2c3d4e5f6g7h8i9j0k1" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**JavaScript/Axios:**
```javascript
const response = await axios.delete(
  `http://localhost:5000/api/upload/${uploadId}`,
  { headers: { Authorization: `Bearer ${token}` } }
);
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Upload deleted successfully"
}
```

---

## Error Codes

| Code | Status | Description |
|------|--------|-------------|
| NO_FILE | 400 | No file was provided in the upload |
| INVALID_CATEGORY | 400 | Category is not valid (must be health/finance/career) |
| FILE_TOO_LARGE | 400 | File exceeds 10MB limit |
| INVALID_FILE_TYPE | 400 | File type not supported for category |
| NOT_FOUND | 404 | Upload or resource not found |
| NO_TOKEN | 401 | Authentication token is missing |
| INVALID_TOKEN | 403 | Token is invalid or expired |
| SERVER_ERROR | 500 | Internal server error |

---

## Processing Status Values

```
"pending"     - File uploaded, waiting to be processed
"processing"  - Currently extracting and analyzing data
"completed"   - Processing finished, data is available
"failed"      - Processing encountered an error
```

---

## Supported File Types

### By Category

| Category | Formats |
|----------|---------|
| Health | PDF, TXT, JPG, JPEG, PNG |
| Finance | PDF, CSV, TXT, JPG, JPEG, PNG |
| Career | PDF, TXT, JPG, JPEG, PNG, DOC, DOCX |

**Max File Size:** 10MB per upload

---

## Example Workflow

```javascript
// 1. Login to get token
const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
  email: 'user@example.com',
  password: 'password'
});
const token = loginResponse.data.data.token;

// 2. Upload a file
const formData = new FormData();
formData.append('file', document);
formData.append('category', 'health');

const uploadResponse = await axios.post(
  'http://localhost:5000/api/upload/health',
  formData,
  { headers: { Authorization: `Bearer ${token}` } }
);

const uploadId = uploadResponse.data.data.uploadId;

// 3. Check upload details
const detailsResponse = await axios.get(
  `http://localhost:5000/api/upload/${uploadId}`,
  { headers: { Authorization: `Bearer ${token}` } }
);

// 4. Get analytics
const analyticsResponse = await axios.get(
  'http://localhost:5000/api/upload/analytics/health',
  { headers: { Authorization: `Bearer ${token}` } }
);

// 5. Get statistics
const statsResponse = await axios.get(
  'http://localhost:5000/api/upload/stats',
  { headers: { Authorization: `Bearer ${token}` } }
);
```

---

## Rate Limiting (Future)

Currently not implemented. Consider adding in production:
- 10 uploads per minute per user
- 100MB per day per user
- 1000 uploads per month per user

---

## CORS Configuration

The API is configured to accept requests from:
- Frontend origin: http://localhost:3000 (local development)
- Production origins: (configure in .env)

---

**Quick Reference Card Version:** 1.0  
**Last Updated:** January 2024

Keep this reference handy during development!
