import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export const createUser = async (user: typeof users.$inferInsert) => {
  const [result] = await db.insert(users).values(user);
  return result;
};

export const getUserByEmail = async (email: string) => {
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result[0];
};
