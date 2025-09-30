import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'todos.json')

function readTodos() {
  if (!fs.existsSync(filePath)) return []
  const data = fs.readFileSync(filePath, 'utf-8')
  try {
    return JSON.parse(data)
  } catch {
    return []
  }
}

function writeTodos(todos: { id: number; text: string; completed: boolean }[]) {
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2))
}

export async function GET() {
  const todos = readTodos()
  return NextResponse.json(todos)
}

export async function POST(req: NextRequest) {
  const { text } = await req.json()
  if (!text) return NextResponse.json({ error: 'Text required' }, { status: 400 })
  const todos = readTodos()
  const newTodo = { id: Date.now(), text, completed: false }
  todos.push(newTodo)
  writeTodos(todos)
  return NextResponse.json(newTodo)
}

export async function PUT(req: NextRequest) {
  const { id, completed } = await req.json()
  const todos = readTodos()
  const todo = todos.find((t: { id: any }) => t.id === id)
  if (!todo) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  todo.completed = completed
  writeTodos(todos)
  return NextResponse.json(todo)
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  let todos = readTodos()
  todos = todos.filter((t: { id: any }) => t.id !== id)
  writeTodos(todos)
  return NextResponse.json({ success: true })
}
