import { Router } from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";
import {
  validateCreateProject,
  validateUpdateProject,
  validateProjectId,
} from "../middleware/project.validation.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - clientName
 *         - clientEmail
 *         - category
 *         - priority
 *         - termsAccepted
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated MongoDB ObjectId
 *           example: "507f1f77bcf86cd799439011"
 *         clientName:
 *           type: string
 *           description: Name of the client
 *           example: "John Doe"
 *         clientEmail:
 *           type: string
 *           format: email
 *           description: Client's email address (unique)
 *           example: "john.doe@example.com"
 *         category:
 *           type: string
 *           enum: [WebDevelopment, MobileApp, UIUXDesign, GraphicDesign, ContentWriting, SEO, Marketing, Other]
 *           description: Project category
 *           example: "WebDevelopment"
 *         priority:
 *           type: string
 *           enum: [Low, Medium, High, Urgent]
 *           description: Project priority level
 *           example: "High"
 *         status:
 *           type: string
 *           enum: [Pending, InProgress, Completed, Cancelled]
 *           description: Current project status
 *           example: "Pending"
 *         termsAccepted:
 *           type: boolean
 *           description: Whether the client accepted the terms
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Project creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *     CreateProjectInput:
 *       type: object
 *       required:
 *         - clientName
 *         - clientEmail
 *         - category
 *         - priority
 *         - termsAccepted
 *       properties:
 *         clientName:
 *           type: string
 *           example: "John Doe"
 *         clientEmail:
 *           type: string
 *           format: email
 *           example: "john.doe@example.com"
 *         category:
 *           type: string
 *           enum: [WebDevelopment, MobileApp, UIUXDesign, GraphicDesign, ContentWriting, SEO, Marketing, Other]
 *           example: "WebDevelopment"
 *         priority:
 *           type: string
 *           enum: [Low, Medium, High, Urgent]
 *           example: "High"
 *         termsAccepted:
 *           type: boolean
 *           example: true
 *     UpdateProjectInput:
 *       type: object
 *       properties:
 *         clientName:
 *           type: string
 *           example: "Jane Doe"
 *         clientEmail:
 *           type: string
 *           format: email
 *           example: "jane.doe@example.com"
 *         category:
 *           type: string
 *           enum: [WebDevelopment, MobileApp, UIUXDesign, GraphicDesign, ContentWriting, SEO, Marketing, Other]
 *         priority:
 *           type: string
 *           enum: [Low, Medium, High, Urgent]
 *         status:
 *           type: string
 *           enum: [Pending, InProgress, Completed, Cancelled]
 *     PaginationInfo:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           example: 1
 *         limit:
 *           type: integer
 *           example: 10
 *         total:
 *           type: integer
 *           example: 25
 *         totalPages:
 *           type: integer
 *           example: 3
 */

/**
 * @swagger
 * /api/projects:
 *   post:
 *     tags:
 *       - Projects
 *     summary: Create a new project
 *     description: Creates a new project in the marketplace
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProjectInput'
 *     responses:
 *       201:
 *         description: Project created successfully
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
 *                   example: "Project created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Project'
 *       400:
 *         description: Validation error
 *       409:
 *         description: Email already exists
 */
router.post("/", validateCreateProject, createProject);

/**
 * @swagger
 * /api/projects:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Get all projects
 *     description: Retrieves a paginated list of all projects
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Project'
 *                 pagination:
 *                   $ref: '#/components/schemas/PaginationInfo'
 */
router.get("/", getAllProjects);

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Get a project by ID
 *     description: Retrieves a single project by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Project details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Project'
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Project not found
 */
router.get("/:id", validateProjectId, getProjectById);

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     tags:
 *       - Projects
 *     summary: Update a project
 *     description: Updates an existing project by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID (MongoDB ObjectId)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProjectInput'
 *     responses:
 *       200:
 *         description: Project updated successfully
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
 *                   example: "Project updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Project'
 *       400:
 *         description: Validation error or invalid ID format
 *       404:
 *         description: Project not found
 *       409:
 *         description: Email already exists
 */
router.put("/:id", validateProjectId, validateUpdateProject, updateProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     tags:
 *       - Projects
 *     summary: Delete a project
 *     description: Deletes a project by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Project deleted successfully
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
 *                   example: "Project deleted successfully"
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Project not found
 */
router.delete("/:id", validateProjectId, deleteProject);

export default router;
