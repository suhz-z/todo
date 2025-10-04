import "./globals.css";
import { ReactNode } from "react";
import Link from "next/link";
import { TodoProvider } from "@/data/TodoContext";
import { AuthProvider } from "@/data/authContext";
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";
import { SlashIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
              <header className="header">
                <Link
                  href="/"
                  className="p-2 scale-120 h-12 font-bold font-poppins text-white hover:text-gray-300 transition"
                >
                  Todo App{" "}
                </Link>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link className="hover:font-bold" href="/">Home</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                      { ' | ' }
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link className='hover:font-bold' href="/login">Login</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                      { ' | ' }
                    </BreadcrumbSeparator>
                    <BreadcrumbLink asChild>
                        <Link className='hover:font-bold' href="/about">About</Link>
                      </BreadcrumbLink>
                  </BreadcrumbList>
                </Breadcrumb>
              </header>
              <main>{children}</main>
            </div>
          </TodoProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
