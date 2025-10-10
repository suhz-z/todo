"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useTodos } from "../data/TodoContext";
import { TodoItem } from "../components/TodoItem";
import Link from "next/link";
import { useAuth } from "@/data/authContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSearchParams, useRouter } from "next/navigation";
import { TodoFilter } from "@/components/TodoFilter";

export default function Home() {
  const { todos, toggleTodo, deleteTodo, editTodo, loading: todosLoading } = useTodos();
  const { user, loading: userloading } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentFilter =
    (searchParams.get("filter") as "all" | "completed" | "active") || "all";
  const [filter, setFilter] = useState<"all" | "completed" | "active">(
    currentFilter
  );

  // Update URL whenever filter changes
  useEffect(() => {
    router.replace(`/?filter=${filter}`);
  }, [filter, router]);

  // Filtered todos
  const filteredTodos = useMemo(() => {
    // useMemo fro effecient repeat filter
    if (filter === "completed") return todos.filter((t) => t.completed);
    if (filter === "active") return todos.filter((t) => !t.completed);
    return todos;
  }, [filter, todos]);

  

  if (!user) {
    return (
      <div className=" mt-40 flex-col items-center justify-center h-screen text-center text-white">
        <h1 className="text-3xl font-bold">Welcome to Todo App</h1>
        <p className="text-gray-400 mt-2">
          Sign in to create your personal todos.
        </p>
        <Button
          variant="outline"
          className="border-blue-400 hover:bg-blue-500 hover:scale-105 flex-col items-center mt-5"
        >
          <Link href="/login" className=" px-4 py-2  text-white">
            Login
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="px-6">
      <section>
        <header className="flex px-5 py-5 justify-between">
          <h2 className="text-3xl font-bold text-red-400">
            {todos.length === 0 ? "Add your Todos" : "Your Todos"}
          </h2>
          <div className="flex">
            <Button
              variant="outline"
              className="border-green-500 hover:bg-green-500/15"
            >
              <Link href="/dashboard">Add</Link>
            </Button>
          </div>
        </header>

        {todos.length > 0 && (
          <div className=" mt-10 flex justify-between items-center">
            <label className="font-semibold py-3">
              You have {filteredTodos.length}{" "}
              {filteredTodos.length === 1 ? "todo left" : "todos"}
            </label>
            <div className="mb-5">

            <TodoFilter currentFilter={filter} onChange={setFilter} />
            </div>
          </div>
        )}

        {filteredTodos.length > 0 ? (
          <Card className=" p-4 bg-black backdrop-blur-md border border-white/20 shadow-xl rounded-2xl">
            <ul className="space-y-2">
              {filteredTodos.map((t) => (
                <TodoItem
                  key={t.id}
                  todo={t}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              ))}
            </ul>

            <div className="flex mt-5 justify-center">
              <Button
                variant="outline"
                className=" w-full border-green-500 hover:bg-green-500/15 "
              >
                <Link href="/dashboard">Add</Link>
              </Button>
            </div>
          </Card>
        ) : (
          todos.length === 0 && (
            <p className="text-gray-400 text-center">No todos found.</p>
          )
        )}
      </section>
    </div>
  );
}
