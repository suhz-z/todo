import { NextRequest, NextResponse } from 'next/server'

let todos: { id: number; text: string; completed: boolean }[] = []

export async function GET() {
  return NextResponse.json(todos)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const newTodo = { id: Date.now(), text: body.text, completed: false }
  todos.push(newTodo)
  return NextResponse.json(newTodo)
}

export async function PUT(req: NextRequest) {
  const { id, completed } = await req.json()
  const todo = todos.find(t => t.id === id)
  if (!todo) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  todo.completed = completed
  return NextResponse.json(todo)
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  todos = todos.filter(t => t.id !== id)
  return NextResponse.json({ success: true })
}
