"use client"
import React from 'react'
import { useTodos } from '../../data/TodoContext'
import TodoForm from '../../components/TodoForm'

export default function New () {
  const { addTodo } = useTodos()
  
  return (
    <div>
      <h2 className='text-2xl font-bold mb-4 text-red-400'>Add New Todo</h2>
      <TodoForm onAdd={addTodo} />
    </div>
  )
}

