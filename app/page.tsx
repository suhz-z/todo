"use client";
import React from "react";
import { useTodos } from "../data/TodoContext";
import { TodoItem } from "../components/TodoItem";
import Link from "next/link";
import { useAuth } from "@/data/authContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export default function Home() {
  const { todos, toggleTodo, deleteTodo } = useTodos();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center gap-4">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return (
      <div className=" mt-40 flex-col items-center justify-center h-screen text-center text-white">
        <h1 className="text-3xl font-bold">Welcome to Todo App</h1>
        <p className="text-gray-400 mt-2">
          Sign in to create your personal todos.
        </p>
        <Button variant='outline'className="border-blue-400 hover:bg-blue-500 hover:scale-105 flex-col items-center mt-5">
        <Link
          href="/login"
          className=" px-4 py-2  text-white"
        >
          Login
        </Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <section>
        <header className="flex justify-between">
          <h2 className="text-3xl font-bold text-red-400 ">Your Todos</h2>
          <div className="flex">
            <Button
              variant="outline"
              className=" border-green-500 hover:bg-green-500 hover:text-black"
            >
              <Link href="/dashboard">Add</Link>
            </Button>
          </div>
        </header>
        <div className="p-4 mt-10">
          
          {todos.length === 0 ? (
            <p>
              No todos yet. Add one on the{" "}
              <a href="/dashboard" className="hover:font-bold hover">
                New
              </a>
            </p>
          ) : (
            <label className=" font-semibold justify-between">
              You have {todos.length}{" "}
              {todos.length === 1 ? "todo left" : "todos"}
              <Card className="mt-1 p-4  bg-black backdrop-blur-md border border-white/20 shadow-xl rounded-2xl ">
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
                    className="w-178 scale-110 border-green-500 hover:bg-green-500 hover:text-black"
                  >
                    <Link href="/dashboard">Add</Link>
                  </Button>
                </div>
              </Card>
            </label>
          )}
        </div>
      </section>
    </div>
  );
}
