import './globals.css'
import { ReactNode } from 'react'
import Link from 'next/link'
import { TodoProvider } from '../data/TodoContext'


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TodoProvider>
          <div className="app-root">
            <header className="header">
              <h1 className='font-bold'>Todo App</h1>
              <nav>
                <Link href="/" className='hover:font-bold'>Home</Link>
                {' | '}
                <Link href="/new" className='hover:font-bold'>New</Link>
                {' | '}
                <Link href="/about" className='hover:font-bold'>About</Link>
              </nav>
            </header>
            <main>{children}</main>
          </div>
        </TodoProvider>
      </body>
    </html>
  )
}
