"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";

export type Todo = { id: number; text: string; completed: boolean };

type TodoContextType = {
  todos: Todo[];
  addTodo: (text: string) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodos = () => {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodos must be used within TodoProvider");
  return ctx;
};

const API_URL = "/api/todos";

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (!token) return;

    const fetchTodos = async () => {
      try {
        console.log("Token in TodoProvider:", token)
        const res = await fetch(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          console.error("Fetch todos failed:", await res.text());
          return;
        }

        const data: Todo[] = await res.json();
        setTodos(data);
      } catch (err) {
        console.error("Fetch todos error:", err);
      }
    };

    fetchTodos();
  }, [token]);

  const addTodo = async (text: string) => {
    if (!token) return;
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) return console.error(await res.text());
    const newTodo: Todo = await res.json();
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = async (id: number) => {
    if (!token) return;
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const res = await fetch(API_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id, completed: !todo.completed }),
    });
    if (!res.ok) return console.error(await res.text());
    const updatedTodo: Todo = await res.json();
    setTodos((prev) => prev.map((t) => (t.id === id ? updatedTodo : t)));
  };

  const deleteTodo = async (id: number) => {
    if (!token) return;
    const res = await fetch(API_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) return console.error(await res.text());
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
