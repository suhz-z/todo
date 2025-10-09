"use client"; 

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext"; // 🔐 Import user authentication (custom)

// define the shape of a single Todo item
export type Todo = { id: number; text: string; completed: boolean };

// define what data/functions the TodoContext will provide
type TodoContextType = {
  todos: Todo[];                               // All todos for the logged-in user
  addTodo: (text: string) => Promise<void>;   
  toggleTodo: (id: number) => Promise<void>;  
  deleteTodo: (id: number) => Promise<void>;   
  loading: boolean;                            
}

// create the context object
const TodoContext = createContext<TodoContextType | undefined>(undefined);

// custom hook 
export const useTodos = () => {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodos must be used within TodoProvider");
  return ctx;
};

// backend API endpoint for todos
const API_URL = "/api/todos";

// the provider component that wraps layout/app 
export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();               
  const [todos, setTodos] = useState<Todo[]>([]); 
  const [loading, setLoading] = useState(true);   

  // fetch todos whenever a valid token is available
  useEffect(() => {
    if (!token) return; // dont fetch if no token (user not logged in)

    const fetchTodos = async () => {
      try {
        setLoading(true);
        console.log("Token in TodoProvider:", token);

        // send request to get users todos with Authorization header
        const res = await fetch(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          console.error("Fetch todos failed:", await res.text());
          return;
        }

        // parse response JSON into Todo[]
        const data: Todo[] = await res.json();
        setTodos(data);
      } catch (err) {
        console.error("Fetch todos error:", err);
      } finally {
        setLoading(false); 
      }
    };

    fetchTodos(); // run fetch function
  }, [token]); // re-fetch when user logs in/out or token changes

  // add a new todo
  const addTodo = async (text: string) => {
    if (!token) return; // dont allow adding if user not logged in

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // attach token
      },
      body: JSON.stringify({ text }), // send todo text
    });

    if (!res.ok) return console.error(await res.text());

    const newTodo: Todo = await res.json(); // get created todo from backend
    setTodos((prev) => [newTodo, ...prev]); // add to top of list
  };

  // toggle a todos completed state
  const toggleTodo = async (id: number) => {
    if (!token) return;

    const todo = todos.find((t) => t.id === id);
    if (!todo) return; // skip if not found

    const res = await fetch(API_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, completed: !todo.completed }),
    });

    if (!res.ok) return console.error(await res.text());

    const updatedTodo: Todo = await res.json();
    // replace updated todo in local state
    setTodos((prev) => prev.map((t) => (t.id === id ? updatedTodo : t)));
  };

  // delete a todo
  const deleteTodo = async (id: number) => {
    if (!token) return;

    const res = await fetch(API_URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) return console.error(await res.text());

    // remove deleted todo from local state
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  // provide todo data and actions to all children
  return (
    <TodoContext.Provider
      value={{ todos, addTodo, toggleTodo, deleteTodo, loading }}
    >
      {children}
    </TodoContext.Provider>
  );
};
