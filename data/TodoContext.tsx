"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'

export type Todo = { id: number; text: string; completed: boolean }

type TodoContextType = {
  todos: Todo[]
  addTodo: (text: string) => Promise<void>
  toggleTodo: (id: number) => Promise<void>
  deleteTodo: (id: number) => Promise<void>
}

const TodoContext = createContext<TodoContextType | undefined>(undefined)

export const useTodos = () => {
  const ctx = useContext(TodoContext)
  if (!ctx) throw new Error('useTodos must be used within TodoProvider')
  return ctx
}

const API_URL =
  typeof window !== 'undefined'
    ? `${window.location.origin}/api/todos`
    : 'http://localhost:3000/api/todos'

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch(API_URL)
        if (!res.ok) throw new Error('Failed to fetch todos')
        const data: Todo[] = await res.json()
        setTodos(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchTodos()
  }, [])

  const addTodo = async (text: string) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      if (!res.ok) throw new Error('Failed to add todo')
      const newTodo: Todo = await res.json()
      setTodos((prev) => [newTodo, ...prev])
    } catch (err) {
      console.error(err)
    }
  }

  const toggleTodo = async (id: number) => {
    const todo = todos.find((t) => t.id === id)
    if (!todo) return
    try {
      const res = await fetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, completed: !todo.completed }),
      })
      if (!res.ok) throw new Error('Failed to update todo')
      const updatedTodo: Todo = await res.json()
      setTodos((prev) => prev.map((t) => (t.id === id ? updatedTodo : t)))
    } catch (err) {
      console.error(err)
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      const res = await fetch(API_URL, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (!res.ok) throw new Error('Failed to delete todo')
      setTodos((prev) => prev.filter((t) => t.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  )
}

export default TodoContext
