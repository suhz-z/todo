"use client";
import React from "react";
import { useTodos } from "../data/TodoContext";
import { TodoItem } from "../components/TodoItem";
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
    <div>
      <section>
        <header>
          <h2 className="text-3xl font-bold text-red-400 ">Your Todos</h2>
        </header>
        <div className="absolute right-135 top-35">
          <Button
            variant="outline"
            className="border-green-500 hover:bg-green-500 hover:text-black"
          >
            <Link href="/new">Add</Link>
          </Button>
        </div>
        {todos.length === 0 ? (
          <p>
            No todos yet. Add one on the{" "}
            <a href="/new" className="hover:font-bold hover">
              New
            </a>
          </p>
        ) : (
          <label className="font-semibold justify-between">
            You have {todos.length} {todos.length === 1 ? "todo left" : "todos"}
            <Card className="mt-4 p-4  bg-black backdrop-blur-md border border-white/20 shadow-xl rounded-2xl ">
              <ul className="space-y-2 ">
                {todos.map((t) => (
                  <TodoItem
                    key={t.id}
                    todo={t}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                ))}
              </ul>
              <div className="flex mt-5 justify-center">
                <Button
                  variant={"outline"}
                  className=" w-185 scale-110 border-green-500 hover:bg-green-500 hover:text-black"
                >
                  <Link href="/new">Add</Link>
                </Button>
              </div>
            </Card>
          </label>
        )}
      </section>
    </div>
  );
}
