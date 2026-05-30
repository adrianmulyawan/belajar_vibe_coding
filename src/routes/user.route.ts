import { Elysia } from "elysia";
import { registerUser, loginUser } from "../controllers/user.controller";

export const userRoutes = new Elysia({ prefix: "/api/v1" })
  .post("/register", async (context) => {
    const response = await registerUser({ body: context.body });
    context.set.status = response.status;
    return response;
  })
  .post("/login", async (context) => {
    const response = await loginUser({ body: context.body });
    context.set.status = response.status;
    return response;
  });
