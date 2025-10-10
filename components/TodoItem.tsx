"use client";
import React, { useState } from "react";
import { Todo } from "../data/TodoContext";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

type Props = {
  todo: Todo;
  onToggle: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onEdit: (id: number, string: string) => Promise<void>;
};

export const TodoItem = ({ todo, onToggle, onDelete, onEdit }: Props) => {
  const [loadingToggle, setLoadingToggle] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [IsEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

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

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      await onDelete(todo.id);
      toast.error("Task Deleted");
    } catch (err) {
      console.error("Failed to delete todo:", err);
      toast.error("Failed to delete");
    } finally {
      setLoadingDelete(false);
      setIsDialogOpen(false);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = editText.trim();
    if (!trimmed) return;
    setIsEditing(true);
    setIsSheetOpen(true);

    try {
      setIsEditing(true);
      await onEdit(todo.id, trimmed);
      console.log("added");
      toast.success("Task Completed");
    } catch (err) {
      console.error("Failed to edit todo:", err);
      toast.error("Failed to edit");
    } finally {
      setIsSheetOpen(false);
      setIsEditing(false);
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
                  disabled={IsEditing}
                  variant="outline"
                  className="border-blue-500 hover:bg-blue-500/30"
                >
                  {IsEditing ? "Saving..." : "Save"}
                </Button>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="flex mb-1 border-white/50 hover:bg-red-700 group-hover:border-red-500 "
              variant="outline"
            >
              <Trash2 />
            </Button>
          </DialogTrigger>

          <DialogContent className="border-white/20">
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="border-white/40 hover:bg-gray-500/20"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  variant="outline"
                  onClick={handleDelete}
                  className="border-red-500 hover:bg-red-700"
                >
                  <Trash2 />
                </Button>
              </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </li>
  );
};
