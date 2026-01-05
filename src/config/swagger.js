import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Freelance Marketplace API",
      version: "1.0.0",
      description: "API documentation for the Freelance Marketplace platform",
      contact: {
        name: "API Support",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
    tags: [
      {
        name: "Health",
        description: "Health check endpoints",
      },
      {
        name: "API",
        description: "API endpoints",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
