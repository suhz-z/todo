import './globals.css'
import { ReactNode } from 'react'
import Link from 'next/link'
import { TodoProvider } from '@/data/TodoContext'
import { AuthProvider } from '@/data/authContext'



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
        <AuthProvider>
        <TodoProvider>
          <div className="app-root">
            <header className="header"><Link href='/' className='p-2 scale-120 h-12 font-bold font-poppins text-white hover:text-gray-300 transition'>Todo App </Link>
              <nav className='nav font-poppins text-gray-200 p-2'>
                <Link href="/" className=' hover:font-bold '>Home</Link>
                {' | '}
                <Link href="/login" className='hover:font-bold '>Login</Link>
                {' | '}
                <Link href="/about" className=' hover:font-bold '>About</Link>
              </nav>
            </header>
            <main>{children}</main>
          </div>
        </TodoProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
