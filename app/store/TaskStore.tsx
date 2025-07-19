import { create } from "zustand";
import { persist } from "zustand/middleware";

type Task = {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  dueDate?: string;
  completed: boolean;
};

type TaskCategory = "dailyGoals" | "shortTermTasks" | "ongoingCommitments";

type TaskStore = {
  tasks: Record<TaskCategory, Task[]>;
  addTask: (category: TaskCategory, task: Task) => void;
  toggleTask: (category: TaskCategory, taskId: string) => void;
  removeTask: (category: TaskCategory, taskId: string) => void;
  removeAllTasks: () => void;
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: {
        dailyGoals: [],
        shortTermTasks: [],
        ongoingCommitments: [],
      },
      addTask: (category, task) =>
        set((state) => ({
          tasks: {
            ...state.tasks,
            [category]: [...state.tasks[category], task],
          },
        })),
      toggleTask: (category, taskId) =>
        set((state) => ({
          tasks: {
            ...state.tasks,
            [category]: state.tasks[category].map((t) =>
              t.id === taskId ? { ...t, completed: !t.completed } : t
            ),
          },
        })),
      removeTask: (category, taskId) =>
        set((state) => ({
          tasks: {
            ...state.tasks,
            [category]: state.tasks[category].filter((t) => t.id !== taskId),
          },
        })),
      removeAllTasks: () =>
        set((state) => ({
          tasks: {
            dailyGoals: [],
            shortTermTasks: [],
            ongoingCommitments: [],
          },
        })),
    }),
    {
      name: "task-storage",
    }
  )
);
