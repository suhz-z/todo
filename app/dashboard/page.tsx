"use client";

import { useAuth } from '@/data/authContext';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {user.email}</h1>
      <button
        onClick={logout}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
      >
        Logout
      </button>
    </main>
  );
}
