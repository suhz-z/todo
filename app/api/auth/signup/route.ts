import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { signupSchema } from "@/lib/validation/authSchema";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = signupSchema.parse(body);
    const { name, email, password } = parsed;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const { password: _pw, ...userWithoutPassword } = newUser;

    return NextResponse.json({ message: "Signup successful", newUser });
  } catch (err) {
    if (err instanceof Error && "issues" in err) {
      return NextResponse.json({ error: "Invalid input", details: err }, { status: 400 });
    }
    console.error("Signup failed:", err);
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}
