import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL || "mysql://root:password@localhost:3306/belajar_vibe_coding";

// Create a connection pool for MySQL
export const connection = mysql.createPool({
  uri: connectionString,
});

// Initialize Drizzle ORM
export const db = drizzle(connection, { schema, mode: "default" });
export type Db = typeof db;
export * as schema from "./schema";
