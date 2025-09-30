import './globals.css'
import { ReactNode } from 'react'
import Link from 'next/link'
import { TodoProvider } from '../data/TodoContext'



export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <TodoProvider>
          <div className="app-root">
            <header className="header"><Link href='/' className='text-flex font-bold font-poppins hover:text-gray-300 transition'>Todo App </Link>
              <nav className='nav font-poppins'>
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
