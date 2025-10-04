"use client";
import React from "react";
import { useTodos } from "@/data/TodoContext";
import { TodoItem } from '@/components/TodoItem'
import Link from "next/link";
import { useAuth } from "@/data/authContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  const { todos, toggleTodo, deleteTodo } = useTodos();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center text-white">
        <h1 className="text-3xl font-bold">Welcome to Todo App</h1>
        <p className="text-gray-400 mt-2">Sign in to create your personal todos.</p>
        <Link
          href="/login"
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-red-400">Your Todos</h2>
        <Button variant="outline" className="border-green-500 hover:bg-green-500 hover:text-black">
          <Link href="/new">Add</Link>
        </Button>
      </header>

      {todos.length === 0 ? (
        <p className="text-white">
          No todos yet. Add one on the{" "}
          <Link href="/new" className="underline hover:font-bold">
            New
          </Link>{" "}
          page.
        </p>
      ) : (
        <Card className="p-4 bg-black backdrop-blur-md border border-white/20 shadow-xl rounded-2xl">
          <p className="font-semibold mb-4">
            You have {todos.length} {todos.length === 1 ? "todo left" : "todos"}
          </p>
          <ul className="space-y-2">
            {todos.map((t) => (
              <TodoItem key={t.id} todo={t} onToggle={toggleTodo} onDelete={deleteTodo} />
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
