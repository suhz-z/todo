"use client"
import React, { useState } from 'react'
import { Todo } from '../data/TodoContext'
import { Checkbox } from './ui/checkbox'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Card } from './ui/card'

type Props = {
  todo: Todo
  onToggle: (id: number) => Promise<void>
  onDelete: (id: number) => Promise<void>
}

export const TodoItem =({ todo, onToggle, onDelete }: Props) =>{
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
    <li className="group flex items-center justify-between py-2 border-b hover:border border-white/45 hover:rounded-sm hover:bg-white/10">
      <Label className="flex items-center gap-2 cursor-pointer font-semibold">
        <Checkbox
          className='flex ml-2 me-2'
          checked={todo.completed}
          onCheckedChange={handleToggle}
          disabled={loadingToggle || loadingDelete}
        />
        <span
          className={`${
            todo.completed ? "line-through text-green-600" : "text-white"
          }`}
        >
          {todo.text}
        </span>
      </Label>

      <div className="flex px-2">
        <Button
          className='flex mb-1 hover:bg-red-500 transition group-hover:font-bold group-hover:border-red-500 '
          variant="outline"
          onClick={handleDelete}
          disabled={loadingToggle || loadingDelete}
        >
          {loadingDelete ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </li>
  );
}
