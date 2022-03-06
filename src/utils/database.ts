import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  database:
    process.env.NODE_ENV === "DEVELOPMENT"
      ? process.env.DB_NAME
      : process.env.DB_NAME_TEST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export default pool;
