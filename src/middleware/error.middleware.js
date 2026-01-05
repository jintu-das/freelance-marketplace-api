import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

/**
 * Async handler wrapper to catch errors in async route handlers
 * @param {Function} fn - Async function to wrap
 * @returns {Function} Express middleware
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// ============================================================================
// ERROR CLASSES
// ============================================================================

/**
 * Base API Error class
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
 * 400 Bad Request Error
 */
export class BadRequestError extends ApiError {
  constructor(message = "Bad Request") {
    super(400, message);
  }
}

/**
 * 401 Unauthorized Error
 */
export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized") {
    super(401, message);
  }
}

/**
 * 403 Forbidden Error
 */
export class ForbiddenError extends ApiError {
  constructor(message = "Forbidden") {
    super(403, message);
  }
}

/**
 * 404 Not Found Error
 */
export class NotFoundError extends ApiError {
  constructor(message = "Resource not found") {
    super(404, message);
  }
}

/**
 * 409 Conflict Error
 */
export class ConflictError extends ApiError {
  constructor(message = "Resource already exists") {
    super(409, message);
  }
}

// ============================================================================
// ERROR HANDLERS
// ============================================================================

/**
 * Not Found handler - catches 404 errors
 */
export const notFoundHandler = (req, res, next) => {
  const error = new NotFoundError(`Route ${req.originalUrl} not found`);
  next(error);
};

/**
 * Global error handler middleware
 */
export const errorHandler = (err, req, res, next) => {
  let error = err;

  // Log error in development
  if (process.env.NODE_ENV === "development") {
    console.error("Error 💥:", err);
  }

  // Handle Prisma Validation Errors
  if (err instanceof Prisma.PrismaClientValidationError) {
    error = new BadRequestError("Invalid data format provided to database");
  }

  // Handle Prisma Unique Constraint Errors (P2002)
  if (err.code === "P2002") {
    const field = err.meta?.target || "unknown field";
    error = new ConflictError(
      `Duplicate field value: ${field}. Please use another value!`
    );
  }

  // Handle Prisma Record Not Found (P2025)
  if (err.code === "P2025") {
    error = new NotFoundError("Record not found");
  }

  // Handle Zod Errors (if they bubble up)
  if (err instanceof ZodError) {
    const message = err.errors.map((e) => e.message).join(", ");
    error = new BadRequestError(`Validation failed: ${message}`);
  }

  // Handle JWT Errors
  if (err.name === "JsonWebTokenError") {
    error = new UnauthorizedError("Invalid token. Please log in again!");
  }
  if (err.name === "TokenExpiredError") {
    error = new UnauthorizedError(
      "Your token has expired! Please log in again."
    );
  }

  // Send Response
  const statusCode = error.statusCode || 500;
  const status = error.status || "error";
  const message = error.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    status,
    message,
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
      error: err,
    }),
  });
};
