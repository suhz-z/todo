// app/(dashboard)/layout.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/data/authContext";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col text-white">
      {/* Dashboard Navbar */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <nav className="flex items-center gap-4">
          <Link href="/" className="hover:font-bold">
            Home
          </Link>
          {user ? (
            <>
              <Button
                onClick={logout}
                variant="outline"
                className="border-red-600 hover:bg-red-500 hover:font-bold hover:text-black"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/login" className="text-sm text-blue-400">
              Login
            </Link>
          )}
        </nav>
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
