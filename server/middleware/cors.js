import cors from 'cors';

/**
 * CORS Configuration
 * Allows requests from specified frontend origins
 */
const localhostOriginPattern = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

export const corsOptions = {
  origin: function (origin, callback) {
    const defaultOrigins = [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://localhost:5180',
      'http://localhost:3000',
    ];
    const allowedOrigins = process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(',').map((item) => item.trim())
      : defaultOrigins;

    const isLocalhostOrigin = typeof origin === 'string' && localhostOriginPattern.test(origin);

    if (!origin || allowedOrigins.includes(origin) || isLocalhostOrigin) {
      callback(null, origin || true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

/**
 * CORS Middleware
 * Apply to Express app: app.use(corsMiddleware)
 */
export const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
