import { Router } from "express";
import {
  ProjectStatus,
  ProjectCategory,
  ProjectPriority,
  ProjectStatusLabels,
  ProjectCategoryLabels,
  ProjectPriorityLabels,
} from "../constants/project.constants.js";

const router = Router();

/**
 * @swagger
 * /api:
 *   get:
 *     tags:
 *       - API
 *     summary: API welcome endpoint
 *     description: Returns welcome message and API version
 *     responses:
 *       200:
 *         description: Welcome message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Welcome to the Freelance Marketplace API
 *                 version:
 *                   type: string
 *                   example: "1.0.0"
 */
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Freelance Marketplace API",
    version: "1.0.0",
  });
});

/**
 * @swagger
 * /api/enums:
 *   get:
 *     tags:
 *       - API
 *     summary: Get project enums
 *     description: Returns all enum values for project status, category, and priority
 *     responses:
 *       200:
 *         description: Enum values for projects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     statuses:
 *                       type: object
 *                     categories:
 *                       type: object
 *                     priorities:
 *                       type: object
 */
router.get("/enums", (req, res) => {
  res.json({
    success: true,
    data: {
      statuses: ProjectStatus,
      categories: ProjectCategory,
      priorities: ProjectPriority,
      labels: {
        statuses: ProjectStatusLabels,
        categories: ProjectCategoryLabels,
        priorities: ProjectPriorityLabels,
      },
    },
  });
});

/**
 * Add more API routes here
 * Example:
 * router.use('/users', usersRouter);
 * router.use('/projects', projectsRouter);
 * router.use('/auth', authRouter);
 */

export default router;
