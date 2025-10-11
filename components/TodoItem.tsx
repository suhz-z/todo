"use client";
import React, { useState } from "react";
import { Todo } from "../data/TodoContext";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import toast from "react-hot-toast";
import { TodoEdit } from "./TodoEdit";
import { TodoDelete } from "./TodoDelete";

type Props = {
  todo: Todo;
  onToggle: (id: number) => Promise<void>;

  onDelete: (id: number) => Promise<void>;
  onEdit: (id: number, text: string) => Promise<void>;

};

export const TodoItem = ({ todo, onToggle, onDelete, onEdit }: Props) => {
  const [loadingToggle, setLoadingToggle] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleToggle = async () => {
    setLoadingToggle(true);
    try {
      await onToggle(todo.id);
      toast.success("Task Completed");
    } catch (err) {
      console.error("Failed to toggle todo:", err);
      toast.error("Failed to toggle");
    } finally {
      setLoadingToggle(false);
    }
  };

  return (
    <li className="group flex items-center justify-between py-2 border-b hover:border border-white/45 hover:rounded-sm hover:bg-white/10">
      <Label className="flex items-center gap-2 cursor-pointer font-semibold">
        <Checkbox
          className="flex ml-2 me-2"
          checked={todo.completed}
          onCheckedChange={handleToggle}
          disabled={loadingToggle || loadingDelete}
        />
        <span
          className={`${
            todo.completed ? "line-through text-green-600" : "text-white"
          }`}
        >
          {todo.text}
        </span>
      </Label>

      <div className="flex px-2 transition-all">
        <TodoEdit todo={todo} onEdit={onEdit} />
        <TodoDelete
          todo={todo}
          onDelete={onDelete}
          loadingDelete={loadingDelete}
          setLoadingDelete={setLoadingDelete}
        />
      </div>
    </li>
  );
};
