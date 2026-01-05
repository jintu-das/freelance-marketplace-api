import prisma from "../lib/prisma.js";
import {
  asyncHandler,
  NotFoundError,
  ConflictError,
} from "../middleware/error.middleware.js";

/**
 * Create a new project
 * @route POST /api/projects
 */
export const createProject = asyncHandler(async (req, res) => {
  const { clientName, clientEmail, category, priority, termsAccepted } =
    req.body;

  const project = await prisma.project.create({
    data: {
      clientName,
      clientEmail,
      category,
      priority,
      termsAccepted,
    },
  });

  res.status(201).json({
    success: true,
    message: "Project created successfully",
    data: project,
  });
});

/**
 * Get all projects with pagination
 * @route GET /api/projects
 */
export const getAllProjects = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.project.count(),
  ]);

  res.json({
    success: true,
    data: projects,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
});

/**
 * Get a single project by ID
 * @route GET /api/projects/:id
 */
export const getProjectById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    throw new NotFoundError("Project not found");
  }

  res.json({
    success: true,
    data: project,
  });
});

/**
 * Update a project by ID
 * @route PUT /api/projects/:id
 */
export const updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { clientName, clientEmail, category, priority, status } = req.body;

  // Check if project exists (could also rely on Prisma P2025, but explicit check is often clearer for 404s)
  // However, with our new global handler P2025 -> NotFoundError, we can skip the findUnique check if we want
  // But doing a findUnique first is safer to differentiate "not found" vs "update failed"
  const existingProject = await prisma.project.findUnique({
    where: { id },
  });

  if (!existingProject) {
    throw new NotFoundError("Project not found");
  }

  const project = await prisma.project.update({
    where: { id },
    data: {
      ...(clientName && { clientName }),
      ...(clientEmail && { clientEmail }),
      ...(category && { category }),
      ...(priority && { priority }),
      ...(status && { status }),
    },
  });

  res.json({
    success: true,
    message: "Project updated successfully",
    data: project,
  });
});

/**
 * Delete a project by ID
 * @route DELETE /api/projects/:id
 */
export const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if project exists
  const existingProject = await prisma.project.findUnique({
    where: { id },
  });

  if (!existingProject) {
    throw new NotFoundError("Project not found");
  }

  await prisma.project.delete({
    where: { id },
  });

  res.json({
    success: true,
    message: "Project deleted successfully",
  });
});
