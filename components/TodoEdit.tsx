"use client";
import React, { useState } from "react";
import { Todo } from "../data/TodoContext";
import { Button } from "./ui/button";
import { Edit } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

type Props = {
  todo: Todo;
  onEdit: (id: number, text: string) => Promise<void>;
};

export const TodoEdit = ({ todo, onEdit }: Props) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = editText.trim();
    if (!trimmed) return;
    setIsEditing(true);

    try {
      await onEdit(todo.id, trimmed);
      toast.success("Task Edited");
      setIsSheetOpen(false);
    } catch (err) {
      console.error("Failed to edit todo:", err);
      toast.error("Failed to edit");
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="border-white/50 group-hover:border-yellow-500 hover:bg-yellow-700 mr-2"
        >
          <Edit />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className=" border-yellow-400/30">
        <SheetHeader>
          <SheetTitle>Edit Todo</SheetTitle>
          <SheetDescription>
            Update your todo text and click save.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleEdit} className="mt-5 space-y-4">
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="Edit your todo..."
            className="bg-gray-900 text-white border-yellow-400/20 focus-visible:ring-yellow-400"
          />

          <SheetFooter>
            <Button
              type="submit"
              disabled={isEditing}
              variant="outline"
              className="border-blue-500 hover:bg-blue-500/30"
            >
              {isEditing ? "Saving..." : "Save"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};
