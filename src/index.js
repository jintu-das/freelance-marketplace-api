import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import config from "./config/index.js";
import swaggerSpec from "./config/swagger.js";
import routes from "./routes/index.js";
import {
  errorHandler,
  notFoundHandler,
} from "./middleware/error.middleware.js";

// Initialize Express app
const app = express();

// Security middleware
app.use(helmet());

// CORS middleware
app.use(cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount routes
app.use("/", routes);

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// Start server
const PORT = config.port;

app.listen(PORT, () => {
  console.log(`
🚀 Server is running!
📍 Local: http://localhost:${PORT}
🔧 Environment: ${config.nodeEnv}
📊 Health check: http://localhost:${PORT}/health
📡 API endpoint: http://localhost:${PORT}/api
📚 Swagger docs: http://localhost:${PORT}/api-docs
  `);
});

export default app;
