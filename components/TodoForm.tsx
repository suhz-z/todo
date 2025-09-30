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
      <input className='border border-gray-300 rounded px-4 py-2 flex-grow text-white bg-transparent'
        aria-label="todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo"
        disabled={loading}
      />
      <button type="submit" disabled={loading} className=' text-white transition hover:font-semibold px-4 py-2 rounded hover:bg-gray-100 hover:text-black'>
        {loading ? 'Adding...' : 'Add'}
      </button>
    </form>
  )
}
