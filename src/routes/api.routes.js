import { Router } from "express";

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
 * Add more API routes here
 * Example:
 * router.use('/users', usersRouter);
 * router.use('/projects', projectsRouter);
 * router.use('/auth', authRouter);
 */

export default router;
