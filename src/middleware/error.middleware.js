/**
 * Async handler wrapper to catch errors in async route handlers
 * @param {Function} fn - Async function to wrap
 * @returns {Function} Express middleware
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Custom API Error class
 */
export class ApiError extends Error {
  constructor(statusCode, message, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Not Found handler - catches 404 errors
 */
export const notFoundHandler = (req, res, next) => {
  const error = new ApiError(404, `Route ${req.originalUrl} not found`);
  next(error);
};

/**
 * Global error handler middleware
 */
export const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  // Default to 500 if no status code is set
  statusCode = statusCode || 500;

  // Log error in development
  if (process.env.NODE_ENV === "development") {
    console.error("Error:", err);
  }

  res.status(statusCode).json({
    success: false,
    status: err.status || "error",
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
