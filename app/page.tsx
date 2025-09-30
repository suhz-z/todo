"use client"
import React from 'react'
import { useTodos } from '../data/TodoContext'
import TodoItem from '../components/TodoItem'

export default function Home() {
  const { todos, toggleTodo, deleteTodo } = useTodos()

  return (
    <div>
      <section>
        <h2 className='text-2xl font-bold'>Your Todos</h2>
        {todos.length === 0 ? (
          <p>
            No todos yet. Add one on the{' '}
            <a href="/new" className='hover:font-bold'>New</a> page.
          </p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {todos.map((t) => (
              <TodoItem
                key={t.id}
                todo={t}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

console.log('Home component rendered')
