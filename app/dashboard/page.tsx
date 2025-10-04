"use client";

import TodoForm from '@/components/TodoForm';
import { TodoItem } from '@/components/TodoItem';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/data/authContext';
import { useTodos } from '@/data/TodoContext';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { todos, toggleTodo, deleteTodo ,addTodo } = useTodos();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
      <Button
        onClick={logout}
        variant={"outline"}
        className="border-red-500 text-red-400 hover:text-white rounded hover:bg-red-700 hover:scale-105 transition"
      >
        Logout
      </Button>
      <TodoForm onAdd={addTodo}/>
        <label className="font-semibold justify-between">
          You have {todos.length} {todos.length === 1 ? "todo left" : "todos"}
          <Card className="mt-4 p-4  bg-black backdrop-blur-md border border-white/20 shadow-xl rounded-2xl ">
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
  );
}
