import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTaskStore } from "@/store/TaskStore";
import { nanoid } from "nanoid";

export function TaskDialog() {
  const addTask = useTaskStore((state) => state.addTask);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<
    "dailyGoals" | "shortTermTasks" | "ongoingCommitments"
  >("dailyGoals");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newTask = {
      id: nanoid(),
      title: title.trim(),
      createdAt: new Date().toISOString(),
      completed: false,
    };

    addTask(category, newTask);
    setTitle("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Crear</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Nueva Actividad</DialogTitle>
            <DialogDescription>
              Escribe el nombre de tu tarea y selecciona su categoría.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                placeholder="Escribe tu tarea"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Categoría</Label>
              <select
                id="category"
                className="border rounded px-3 py-2"
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value as
                      | "dailyGoals"
                      | "shortTermTasks"
                      | "ongoingCommitments"
                  )
                }
              >
                <option value="dailyGoals">Objetivos del día</option>
                <option value="shortTermTasks">
                  Responsabilidades a corto plazo
                </option>
                <option value="ongoingCommitments">
                  Compromisos continuos
                </option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancelar
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit">Crear</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
