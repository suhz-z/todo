"use client"
import React, { useState } from 'react'

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
    <form onSubmit={submit} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
      <input
        aria-label="todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo"
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add'}
      </button>
    </form>
  )
}
