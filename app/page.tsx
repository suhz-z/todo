"use client"
import React from 'react'
import { useTodos } from '../data/TodoContext'
import { TodoItem } from '../components/TodoItem'
import Link from 'next/link'

export default function Home() {
  const { todos, toggleTodo, deleteTodo } = useTodos()


  return (
    <div>
      <section>
        <h2 className='text-2xl font-bold text-red-400'>Your Todos</h2>
        {todos.length === 0 ? (
          <p>
            No todos yet. Add one on the{' '}
            <a href="/new" className='hover:font-bold hover'>New</a> page.
          </p>
        ) : (
          <label className='font-semibold'>You have {todos.length} {todos.length === 1 ? 'todo left' : 'todos'}
          <div className="mt-4 p-4 rounded-2xl backdrop-blur-md shadow-lg border border-white/30">
              <ul className="space-y-2 ">
                {todos.map((t) => (
                  <TodoItem
                    key={t.id}
                    todo={t}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                ))}
              </ul>
          </div>
          </label>
         )}
         <div className= 'flex mt-5 justify-center'>
          <button className='flex items-center justify-center bg-gray-300 rounded w-20 h-10 text-black  font-bold transition hover:scale-95' >
            <Link href='/new'>Add</Link>
          </button>
         </div>
      </section>

    </div>
  )
}
