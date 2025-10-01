import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const todos = await prisma.todo.findMany()
    return NextResponse.json(todos)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json()
    if (!text) return NextResponse.json({ error: 'Text required' }, { status: 400 })
    const newTodo = await prisma.todo.create({
      data: { text, completed: false }
    })
    return NextResponse.json(newTodo)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, completed } = await req.json()
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { completed }
    })
    return NextResponse.json(updatedTodo)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Todo not found or update failed' }, { status: 404 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()
    await prisma.todo.delete({
      where: { id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Todo not found or delete failed' }, { status: 404 })
  }
}
