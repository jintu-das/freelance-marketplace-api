/**
 * Project-related constants/enums
 * Enums are imported from @prisma/client to stay in sync with the schema
 */

// Re-export Prisma enums (these are auto-generated from schema.prisma)
export {
  ProjectStatus,
  ProjectCategory,
  ProjectPriority,
} from "@prisma/client";

// Display labels for frontend (human-readable versions)
export const ProjectStatusLabels = {
  Pending: "Pending",
  InProgress: "In Progress",
  Completed: "Completed",
  Cancelled: "Cancelled",
};

export const ProjectCategoryLabels = {
  WebDevelopment: "Web Development",
  MobileApp: "Mobile App",
  UIUXDesign: "UI/UX Design",
  GraphicDesign: "Graphic Design",
  ContentWriting: "Content Writing",
  SEO: "SEO",
  Marketing: "Marketing",
  Other: "Other",
};

export const ProjectPriorityLabels = {
  Low: "Low",
  Medium: "Medium",
  High: "High",
  Urgent: "Urgent",
};
