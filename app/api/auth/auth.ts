import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export type UserPayload = { id: number; email: string; name?: string };

export function signToken(user: UserPayload) {
  return jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: "7d" });
}

export async function getUserFromToken(req: NextRequest): Promise<UserPayload | null> {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;

  const token = authHeader.split(" ")[1];
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    return decoded;
  } catch (err) {
    console.error("Token verification failed:", err);
    return null;
  }
}
