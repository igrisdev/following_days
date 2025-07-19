import { TaskDialog } from "~/components/functional/DialogForm";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Following Days" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  // const dailyGoals = useTaskStore((state) => state.tasks.dailyGoals);

  return (
    <div className="grid grid-rows-3 h-screen">
      <header className="">
        <h1>Following Days</h1>
      </header>
      <main className="">
        <TaskDialog />
      </main>
      <footer>
        <p>This is the footer.</p>
      </footer>
    </div>
  );
}
