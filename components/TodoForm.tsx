"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from './ui/input'
import toast from 'react-hot-toast'

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
      toast.success('added todo')
      setText('')
    } catch (err) {
      console.error('Failed to add todo:', err)
      toast.error('failed to add todo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className='group flex gap-2 mb-2 '>
      <Input className='group border-white/70 placeholder:text-white/30 focus:ring-1 focus:border-white/50 bg-gray-500/10'
        aria-label="todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo"
        disabled={loading}
      />
      <Button  variant='outline' type="submit" disabled={loading} className=' group-hover:border-green-500 hover:bg-green-500/15 hover:border-green-500 flex gap-8 '>
        {loading ? 'Adding...' : 'Add'}
      </Button>
    </form>
  )
}
