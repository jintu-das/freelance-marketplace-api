import { z } from "zod";
import {
  ProjectStatus,
  ProjectCategory,
  ProjectPriority,
} from "../constants/project.constants.js";

// ============================================================================
// ZOD SCHEMAS
// ============================================================================

/**
 * Schema for creating a new project
 */
export const createProjectSchema = z.object({
  clientName: z
    .string({ required_error: "Client name is required" })
    .min(1, "Client name is required")
    .trim(),
  clientEmail: z
    .string({ required_error: "Client email is required" })
    .email("Invalid email format"),
  category: z.enum(Object.values(ProjectCategory), {
    required_error: "Category is required",
    invalid_type_error: `Invalid category. Must be one of: ${Object.values(
      ProjectCategory
    ).join(", ")}`,
  }),
  priority: z.enum(Object.values(ProjectPriority), {
    required_error: "Priority is required",
    invalid_type_error: `Invalid priority. Must be one of: ${Object.values(
      ProjectPriority
    ).join(", ")}`,
  }),
  termsAccepted: z.literal(true, {
    errorMap: () => ({
      message: "You must accept the terms to create a project",
    }),
  }),
});

/**
 * Schema for updating a project
 */
export const updateProjectSchema = z.object({
  clientName: z
    .string()
    .min(1, "Client name must be a non-empty string")
    .trim()
    .optional(),
  clientEmail: z.string().email("Invalid email format").optional(),
  category: z
    .enum(Object.values(ProjectCategory), {
      invalid_type_error: `Invalid category. Must be one of: ${Object.values(
        ProjectCategory
      ).join(", ")}`,
    })
    .optional(),
  priority: z
    .enum(Object.values(ProjectPriority), {
      invalid_type_error: `Invalid priority. Must be one of: ${Object.values(
        ProjectPriority
      ).join(", ")}`,
    })
    .optional(),
  status: z
    .enum(Object.values(ProjectStatus), {
      invalid_type_error: `Invalid status. Must be one of: ${Object.values(
        ProjectStatus
      ).join(", ")}`,
    })
    .optional(),
});

/**
 * Schema for project ID parameter
 */
export const projectIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid project ID format"),
});

// ============================================================================
// VALIDATION MIDDLEWARE
// ============================================================================

/**
 * Generic validation middleware factory
 * @param {z.ZodSchema} schema - Zod schema to validate against
 * @param {'body' | 'params' | 'query'} source - Request property to validate
 */
const validate = (schema, source = "body") => {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const errors = result.error.errors.map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    // Replace with parsed data (includes transformations like trim)
    req[source] = result.data;
    next();
  };
};

/**
 * Validate create project request body
 */
export const validateCreateProject = validate(createProjectSchema, "body");

/**
 * Validate update project request body
 */
export const validateUpdateProject = validate(updateProjectSchema, "body");

/**
 * Validate MongoDB ObjectId format
 */
export const validateProjectId = validate(projectIdSchema, "params");
