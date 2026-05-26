import cors from 'cors';

/**
 * CORS Configuration
 * Allows requests from specified frontend origins
 */
export const corsOptions = {
  origin: function (origin, callback) {
    const defaultOrigins = ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'];
    const allowedOrigins = process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(',').map((item) => item.trim())
      : defaultOrigins;

    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};

/**
 * CORS Middleware
 * Apply to Express app: app.use(corsMiddleware)
 */
export const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
