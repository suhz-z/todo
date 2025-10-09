"use client"
import React, { useState } from 'react'
import { Todo } from '../data/TodoContext'
import { Checkbox } from './ui/checkbox'
import { Button } from './ui/button'
import { Label } from './ui/label'
import toast from 'react-hot-toast'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash, Trash2 } from 'lucide-react'

type Props = {
  todo: Todo
  onToggle: (id: number) => Promise<void>
  onDelete: (id: number) => Promise<void>
}

export const TodoItem =({ todo, onToggle, onDelete }: Props) =>{
  const [loadingToggle, setLoadingToggle] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const handleToggle = async () => {
    setLoadingToggle(true)
    try {
      await onToggle(todo.id)
      toast.success("Task Completed")
    } catch (err) {
      console.error('Failed to toggle todo:', err)
      toast.error('Failed to toggle')
    } finally {
      setLoadingToggle(false)
    }
  }

  const handleDelete = async () => {
    setLoadingDelete(true)
    try {
      await onDelete(todo.id)
      toast.error('Task Deleted')
    } catch (err) {
      console.error('Failed to delete todo:', err)
      toast.error('Failed to delete')
    } finally {
      setLoadingDelete(false)
      setIsDialogOpen(false)
    }
  }

  return (
    
    <li className="group flex items-center justify-between py-2 border-b hover:border border-white/45 hover:rounded-sm hover:bg-white/10">
      <Label className="flex items-center gap-2 cursor-pointer font-semibold">
        <Checkbox
          className='flex ml-2 me-2'
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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
        <Button
          className='flex mb-1 border-white/50 hover:bg-red-500  group-hover:font-bold group-hover:border-red-500 '
          variant="outline">
            <Trash2 size={16}  />
        </Button>
        </DialogTrigger>


        <DialogContent className='border-white/20'>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}
              className="border-white/40 hover:bg-gray-500/20">Cancel</Button>
            </DialogClose>
            <Button type="submit" variant="outline"
              onClick={handleDelete}
              className="border-red-500 hover:bg-red-700" ><Trash2/></Button>
          </DialogFooter>
      
    </DialogHeader>
  </DialogContent>
        </Dialog>
      </div>
    </li>
    
  );
}
