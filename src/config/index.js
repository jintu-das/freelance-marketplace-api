import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  databaseUrl: process.env.DATABASE_URL,
};

export default config;
