/**
 * @fileoverview Project-related constants and enum utilities
 * @description Enums are re-exported from @prisma/client to stay in sync with the schema.
 *              Label mappings provide human-readable versions for frontend display.
 */

// ============================================================================
// PRISMA ENUM RE-EXPORTS
// ============================================================================

/**
 * Re-export Prisma enums (auto-generated from schema.prisma)
 * @see prisma/schema.prisma for enum definitions
 */
export {
  ProjectStatus,
  ProjectCategory,
  ProjectPriority,
} from "@prisma/client";

// ============================================================================
// DISPLAY LABELS
// ============================================================================

/**
 * Human-readable labels for ProjectStatus enum
 * @type {Record<string, string>}
 */
export const ProjectStatusLabels = Object.freeze({
  Pending: "Pending",
  InProgress: "In Progress",
  Completed: "Completed",
  Cancelled: "Cancelled",
});

/**
 * Human-readable labels for ProjectCategory enum
 * @type {Record<string, string>}
 */
export const ProjectCategoryLabels = Object.freeze({
  WebDevelopment: "Web Development",
  MobileApp: "Mobile App",
  UIUXDesign: "UI/UX Design",
  GraphicDesign: "Graphic Design",
  ContentWriting: "Content Writing",
  SEO: "SEO",
  Marketing: "Marketing",
  Other: "Other",
});

/**
 * Human-readable labels for ProjectPriority enum
 * @type {Record<string, string>}
 */
export const ProjectPriorityLabels = Object.freeze({
  Low: "Low",
  Medium: "Medium",
  High: "High",
  Urgent: "Urgent",
});

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get the display label for a project status
 * @param {string} status - The status enum value
 * @returns {string} Human-readable status label
 */
export const getStatusLabel = (status) => ProjectStatusLabels[status] ?? status;

/**
 * Get the display label for a project category
 * @param {string} category - The category enum value
 * @returns {string} Human-readable category label
 */
export const getCategoryLabel = (category) =>
  ProjectCategoryLabels[category] ?? category;

/**
 * Get the display label for a project priority
 * @param {string} priority - The priority enum value
 * @returns {string} Human-readable priority label
 */
export const getPriorityLabel = (priority) =>
  ProjectPriorityLabels[priority] ?? priority;
