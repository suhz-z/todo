import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUserFromToken } from "../auth/auth";

const prisma=new PrismaClient()



export async function GET(req: NextRequest) {
  const user = await getUserFromToken(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const todos = await prisma.todo.findMany({
      where: { authorId: user.id },
      orderBy: { id: "desc" },
    });
    return NextResponse.json(todos);
  } catch (err) {
    console.error("GET todos error:", err);
    return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  const user = await getUserFromToken(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { text } = await req.json();
    if (!text) return NextResponse.json({ error: "Text required" }, { status: 400 });

    const newTodo = await prisma.todo.create({
      data: { text, completed: false, authorId: user.id },
    });

    return NextResponse.json(newTodo);
  } catch (err) {
    console.error("POST todos error:", err);
    return NextResponse.json({ error: "Failed to create todo" }, { status: 500 });
  }
}


export async function PUT(req: NextRequest) {
  try {
    const { id, text, completed } = await req.json();
    const user = await getUserFromToken(req); // from your JWT helper
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const updated = await prisma.todo.update({
      where: { id, authorId: user.id },
      data: {
        ...(text !== undefined && { text }),
        ...(completed !== undefined && { completed }),
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}



export async function DELETE(req: NextRequest) {
  const user = await getUserFromToken(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await req.json();
    const todo = await prisma.todo.findUnique({ where: { id } });

    if (!todo || todo.authorId !== user.id)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    await prisma.todo.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE todos error:", err);
    return NextResponse.json({ error: "Failed to delete todo" }, { status: 500 });
  }
}
