import jwt from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not set");
}

const JWT_SECRET: string = process.env.JWT_SECRET;

export function signToken(userId: string): string {
  return jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: "30d" });
}

export function verifyToken(token: string): { sub: string } | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (typeof payload === "object" && typeof payload.sub === "string") {
      return { sub: payload.sub };
    }
    return null;
  } catch {
    return null;
  }
}
