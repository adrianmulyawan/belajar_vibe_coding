import { describe, expect, it, mock } from "bun:test";

const mockGetSessionByToken = mock();
const mockGetUserById = mock();

mock.module("../models/user.model", () => ({
  createUser: mock(),
  getUserByEmail: mock(),
  createSession: mock(),
  getSessionByToken: mockGetSessionByToken,
  getUserById: mockGetUserById,
}));

const { getProfile } = await import("./user.controller");

describe("getProfile", () => {
  it("should return 200 with user data when token is valid", async () => {
    mockGetSessionByToken.mockResolvedValue({ id: 1, userId: 1, token: "valid-token" });
    mockGetUserById.mockResolvedValue({ id: 1, name: "John Doe", email: "john@test.com", password: "hashed" });

    const result = await getProfile({
      headers: { authorization: "Bearer valid-token" },
    });

    expect(result.status).toBe(200);
    expect(result.message).toBe("Success");
    expect(result.user).toEqual({ id: 1, name: "John Doe", email: "john@test.com" });
    expect(result.user).not.toHaveProperty("password");
  });

  it("should return 400 when Authorization header is missing", async () => {
    const result = await getProfile({ headers: {} });

    expect(result.status).toBe(400);
    expect(result.message).toBe("Failed");
    expect(result.error).toBe("Invalid credentials");
  });

  it("should return 400 when Authorization header is not Bearer", async () => {
    const result = await getProfile({
      headers: { authorization: "Basic some-token" },
    });

    expect(result.status).toBe(400);
    expect(result.message).toBe("Failed");
    expect(result.error).toBe("Invalid credentials");
  });

  it("should return 400 when token is not found in sessions", async () => {
    mockGetSessionByToken.mockResolvedValue(undefined);

    const result = await getProfile({
      headers: { authorization: "Bearer invalid-token" },
    });

    expect(result.status).toBe(400);
    expect(result.message).toBe("Failed");
    expect(result.error).toBe("Invalid credentials");
  });

  it("should return 400 when session exists but user is not found", async () => {
    mockGetSessionByToken.mockResolvedValue({ id: 1, userId: 99, token: "orphan-token" });
    mockGetUserById.mockResolvedValue(undefined);

    const result = await getProfile({
      headers: { authorization: "Bearer orphan-token" },
    });

    expect(result.status).toBe(400);
    expect(result.message).toBe("Failed");
    expect(result.error).toBe("Invalid credentials");
  });

  it("should return 500 on unexpected error", async () => {
    mockGetSessionByToken.mockRejectedValue(new Error("DB connection lost"));

    const result = await getProfile({
      headers: { authorization: "Bearer valid-token" },
    });

    expect(result.status).toBe(500);
    expect(result.message).toBe("Failed");
    expect(result.error).toBe("DB connection lost");
  });
});
