import { Elysia } from "elysia";
import { db } from "./db";
import { users } from "./db/schema";

const app = new Elysia()
  .get("/", () => ({
    message: "Hello World! Elysia backend is running with Bun.",
    tech_stack: ["Bun", "Elysia JS", "Drizzle ORM", "MySQL"]
  }))
  .get("/users", async () => {
    try {
      // Query users table to verify ORM operation
      const allUsers = await db.select().from(users);
      return { success: true, data: allUsers };
    } catch (error: any) {
      return {
        success: false,
        message: "Failed to fetch users. Is MySQL running and configured?",
        error: error.message,
      };
    }
  })
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
