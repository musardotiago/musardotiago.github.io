import { useState } from "react";
import logo from "@/assets/logo_comida_para_todos.jpeg.asset.json";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const links = [
  ["#livro", "Livro"],
  ["#quiz", "Quiz"],
  ["#ideia", "Ideia"],
  ["#sabores", "Sabores"],
  ["#criadores", "Equipe"],
  ["#feira", "Feira"],
];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3">
      <nav className="mx-auto flex max-w-5xl items-center justify-between rounded-full border-2 border-primary bg-card/95 px-5 py-2 shadow-sticker backdrop-blur" aria-label="Principal">
        <a href="#inicio" className="flex items-center gap-2 font-display text-sm font-bold text-primary"><img src={logo.url} alt="Comida Livre Para Todos" className="h-12 w-12 rounded-full object-contain" /><span>Além do Glúten</span></a>
        <ul className="hidden gap-5 font-semibold md:flex">
          {links.map(([h, l]) => (
            <li key={h}><a href={h} className="hover:text-caramel">{l}</a></li>
          ))}
        </ul>
        <Button variant="ghost" className="flex h-10 w-10 items-center justify-center md:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </Button>
      </nav>
      {open && (
        <ul className="mx-auto mt-2 grid max-w-5xl grid-cols-2 gap-2 rounded-3xl border-2 border-primary bg-card p-3 shadow-sticker md:hidden">
          {links.map(([h, l]) => (
            <li key={h}><a href={h} onClick={() => setOpen(false)} className="block rounded-2xl bg-secondary px-4 py-3 text-center font-bold">{l}</a></li>
          ))}
        </ul>
      )}
    </header>
  );
}
