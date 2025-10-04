"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from './ui/input'

type Props = { onAdd: (text: string) => Promise<void> }

export default function TodoForm({ onAdd }: Props) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    setLoading(true)
    try {
      await onAdd(trimmed)
      setText('')
    } catch (err) {
      console.error('Failed to add todo:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className='flex gap-2 mb-2'>
      <Input className='border-white/70 placeholder:text-white/30 focus:ring-1 focus:border-white/50'
        aria-label="todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo"
        disabled={loading}
      />
      <Button  variant='outline' type="submit" disabled={loading} className='flex gap-8 '>
        {loading ? 'Adding...' : 'Add'}
      </Button>
    </form>
  )
}
