import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../.env") });

const env: NodeJS.ProcessEnv = process.env;

export default {
  port: env.PORT,
  dbHost: env.DATABASE_HOST,
  dbPort: env.DATABASE_PORT,
  dbUser: env.DATABASE_USER,
  dbPassword: env.DATABASE_PASSWORD,
  dbName: env.DATABASE_NAME,
  jwtSecret: env.JWT_SECRET,
}