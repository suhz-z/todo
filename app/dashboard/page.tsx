"use client";

import TodoForm from "@/components/TodoForm";
import { TodoItem } from "@/components/TodoItem";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/data/authContext";
import { useTodos } from "@/data/TodoContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, } = useAuth();
  const {
    todos,
    toggleTodo,
    deleteTodo,
    addTodo,
    loading: todosLoading,
  } = useTodos();
  const router = useRouter();

  

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (todosLoading) {
    return (
      <div className="flex items-center gap-4">
        <Spinner />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="">
      <h1 className="flex text-2xl py-2">
        Welcome, <p className="font-bold text-red-400">{user.name}</p>
      </h1>
      <div className="p-6 mt-5 ">
        <TodoForm onAdd={addTodo} />
        <div className="mt-5">
          <label className="font-semibold">
            You have {todos.length} {todos.length === 1 ? "todo left" : "todos"}
            <Card className="mt-1 p-4  bg-black backdrop-blur-md border border-white/20 shadow-xl rounded-2xl ">
              <ul className="space-y-2 ">
                {todos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                ))}
              </ul>
            </Card>
          </label>
        </div>
      </div>
    </div>
  );
}
