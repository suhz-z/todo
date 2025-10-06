import "./globals.css";
import { ReactNode } from "react";
import { TodoProvider } from "@/data/TodoContext";
import { AuthProvider } from "@/data/authContext";
import Header from "@/components/Header";

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
              <Header />
              <main>{children}</main>
            </div>
          </TodoProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
