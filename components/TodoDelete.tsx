"use client";
import React, { useState } from "react";
import { Todo } from "../data/TodoContext";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";

type Props = {
  todo: Todo;
  onDelete: (id: number) => Promise<void>;
  loadingDelete: boolean;
  setLoadingDelete: (loading: boolean) => void;
};

export const TodoDelete = ({ todo, onDelete, loadingDelete, setLoadingDelete }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  return (
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
  );
};
