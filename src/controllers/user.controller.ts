import { createUser, getUserByEmail, createSession } from "../models/user.model";

export const registerUser = async ({ body }: { body: any }) => {
  try {
    const { name, email, password } = body;

    // Validate inputs
    if (!name || !email || !password) {
      return {
        status: 400,
        message: "Failed",
        error: "Missing required fields",
      };
    }

    // Check if email already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return {
        status: 400,
        message: "Failed",
        error: "Email already exists",
      };
    }

    // Hash password
    const hashedPassword = await Bun.password.hash(password);

    // Insert to database
    await createUser({
      name,
      email,
      password: hashedPassword,
    });

    return {
      status: 201,
      message: "Success",
    };
  } catch (error: any) {
    return {
      status: 500,
      message: "Failed",
      error: error.message,
    };
  }
};

export const loginUser = async ({ body }: { body: any }) => {
  try {
    const { email, password } = body;

    // Validate inputs
    if (!email || !password) {
      return {
        status: 400,
        message: "Failed",
        error: "Missing required fields",
      };
    }

    // Check if user exists
    const user = await getUserByEmail(email);
    if (!user) {
      return {
        status: 400,
        message: "Failed",
        error: "Invalid credentials",
      };
    }

    // Verify password
    const isPasswordValid = await Bun.password.verify(password, user.password);
    if (!isPasswordValid) {
      return {
        status: 400,
        message: "Failed",
        error: "Invalid credentials",
      };
    }

    // Generate token and create session
    const token = crypto.randomUUID();
    await createSession(user.id, token);

    return {
      status: 200,
      message: "Success",
      token,
    };
  } catch (error: any) {
    return {
      status: 500,
      message: "Failed",
      error: error.message,
    };
  }
};
