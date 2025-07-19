import type { Route } from "./+types/home";
import { DialogDemo } from "~/components/functional/DialogForm";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Following Days" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="grid grid-rows-3 h-screen">
      <header className="">
        <h1>Following Days</h1>
      </header>
      <main className="">
        <DialogDemo />
      </main>
      <footer>
        <p>This is the footer.</p>
      </footer>
    </div>
  );
}
