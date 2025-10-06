import "./globals.css";
import { ReactNode } from "react";
import { TodoProvider } from "@/data/TodoContext";
import { AuthProvider } from "@/data/authContext";
import Header from "@/components/Header";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],       
  weight: ["400", "600", "700"],
  variable: "--font-poppins", 
});


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className="font-poppins">
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
