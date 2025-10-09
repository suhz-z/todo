"use client";

import { TodoFilter } from "@/components/TodoFilter";
import TodoForm from "@/components/TodoForm";
import { TodoItem } from "@/components/TodoItem";

import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/data/authContext";
import { useTodos } from "@/data/TodoContext";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function DashboardPage() {
  const { user, } = useAuth();
  const {
    todos,
    toggleTodo,
    deleteTodo,
    addTodo,
    editTodo,
    loading: todosLoading,
  } = useTodos();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentFilter =
      (searchParams.get("filter") as "all" | "completed" | "active") || "all";
    const [filter, setFilter] = useState<"all" | "completed" | "active">(
      currentFilter
    );
  


  useEffect(() => {
      router.replace(`dashboard/?filter=${filter}`);
    }, [filter, router]);
  
    // Filtered todos
    const filteredTodos = useMemo(() => {
      // useMemo fro effecient repeat filter
      if (filter === "completed") return todos.filter((t) => t.completed);
      if (filter === "active") return todos.filter((t) => !t.completed);
      return todos;
    }, [filter, todos]);

  

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (todosLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner className="w-10 h-5"/>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="">
      <h1 className="flex text-2xl py-2">
        Welcome, <p className="font-bold text-red-400">{user.name}</p>
      </h1>
      <div className="p-6 mt-5">
        <TodoForm onAdd={addTodo} />
        <div className="mt-10 justify-between flex items-center">
          <label className="font-semibold">
            You have {filteredTodos.length} {filteredTodos.length === 1 ? "todo left" : "todos"}
            </label>
            <div className="mb-5">
            <TodoFilter currentFilter={filter} onChange={setFilter} />
            </div>
            </div>
            <Card className="mt-1 p-4  bg-black backdrop-blur-md border border-white/20 shadow-xl rounded-2xl ">
              <ul className="space-y-2 ">
                {filteredTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onEdit={editTodo}
                  />
                ))}
              </ul>
            </Card>
          
        
      </div>
    </div>
  );
}
