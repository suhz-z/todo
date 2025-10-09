import "./globals.css";
import { ReactNode } from "react";
import { TodoProvider } from "@/data/TodoContext";
import { AuthProvider } from "@/data/authContext";
import Header from "@/components/Header";
import { Poppins } from "next/font/google";
import { Toaster } from '@/components/ui/sonner'


const poppins = Poppins({
  subsets: ["latin"],       
  weight: ["400", "600", "700"],
  variable: "--font-poppins", 
});

export const dynamic = 'force-dynamic'
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className="font-poppins ">
        <AuthProvider>
          <TodoProvider>
            <div className="app-root">
              <Header />
              <main >{children}</main>
              <Toaster
          position="bottom-left"
          toastOptions={{
            duration: 3000,
            style: {
              font : 'poppins',
              background: "#171717",
              color: "white",
              borderRadius: "8px",
              padding: "12px 16px",
            },
          }}
        />
            </div>
          </TodoProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
