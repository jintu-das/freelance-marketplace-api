import prisma from "../lib/prisma.js";

/**
 * Create a new project
 * @route POST /api/projects
 */
export const createProject = async (req, res, next) => {
  try {
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
  } catch (error) {
    // Handle unique constraint violation (duplicate email)
    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "A project with this email already exists",
      });
    }
    next(error);
  }
};

/**
 * Get all projects with pagination
 * @route GET /api/projects
 */
export const getAllProjects = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single project by ID
 * @route GET /api/projects/:id
 */
export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a project by ID
 * @route PUT /api/projects/:id
 */
export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { clientName, clientEmail, category, priority, status } = req.body;

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
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
  } catch (error) {
    // Handle unique constraint violation (duplicate email)
    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "A project with this email already exists",
      });
    }
    next(error);
  }
};

/**
 * Delete a project by ID
 * @route DELETE /api/projects/:id
 */
export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await prisma.project.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
