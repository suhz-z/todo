"use client"
import React, { useState } from 'react'
import { Todo } from '../data/TodoContext'

type Props = {
  todo: Todo
  onToggle: (id: number) => Promise<void>
  onDelete: (id: number) => Promise<void>
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  const [loadingToggle, setLoadingToggle] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)

  const handleToggle = async () => {
    setLoadingToggle(true)
    try {
      await onToggle(todo.id)
    } catch (err) {
      console.error('Failed to toggle todo:', err)
    } finally {
      setLoadingToggle(false)
    }
  }

  const handleDelete = async () => {
    setLoadingDelete(true)
    try {
      await onDelete(todo.id)
    } catch (err) {
      console.error('Failed to delete todo:', err)
    } finally {
      setLoadingDelete(false)
    }
  }

  return (
    <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #eee' }}>
      <div>
        <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
            disabled={loadingToggle || loadingDelete}
          />
<span style={{ textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? 'green' : 'white' }}>
            {todo.text}
          </span>
        </label>
      </div>
      <div>
        <button
          onClick={handleDelete}
          className='text-red-500 transition hover:rounded hover:bg-red-500 hover:text-white px-2 py-1'
          disabled={loadingToggle || loadingDelete}
        >
          {loadingDelete ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </li>
  )
}
