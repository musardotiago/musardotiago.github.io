import capa from "@/assets/capa-livro.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const floaters = [
  { e: "🍓", c: "left-[6%] top-[18%]", r: "-12deg" },
  { e: "🍰", c: "right-[8%] top-[12%]", r: "10deg" },
  { e: "🥄", c: "left-[10%] bottom-[22%]", r: "20deg" },
  { e: "🍫", c: "right-[6%] bottom-[28%]", r: "-8deg" },
  { e: "✨", c: "left-[45%] top-[8%]", r: "0deg" },
  { e: "⭐", c: "right-[40%] bottom-[10%]", r: "0deg" },
];

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-gingham pb-20 pt-24 sm:pt-28">
      {floaters.map((f, i) => (
        <span
          key={i}
          aria-hidden
          className={`absolute text-3xl sm:text-5xl ${i % 2 ? "animate-float-slow" : "animate-float"} ${f.c}`}
          style={{ ["--r" as string]: f.r, animationDelay: `${i * 0.7}s` }}
        >
          {f.e}
        </span>
      ))}
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <span className="inline-block -rotate-2 rounded-full bg-accent px-4 py-1 text-sm font-bold text-accent-foreground shadow-sticker">
            Projeto COLAB • 2026
          </span>
          <h1 className="mt-5 text-4xl leading-[1.1] text-primary sm:text-5xl lg:text-6xl">
            Sem glúten, sem lactose… mas com <span className="rounded-lg bg-secondary px-2">MUITO</span> sabor!
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-foreground/80 lg:mx-0">
            Quem disse que receitas sem glúten e sem lactose precisam ser sem graça? Descubra um livro cheio de
            criatividade, sabores e ideias deliciosas!
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button asChild variant="hero" size="xl">
              <a href="#livro">📖 Conheça nosso livro!</a>
            </Button>
            <Button asChild variant="sticker" size="xl">
              <a href="#quiz">👩‍🍳 Descubra seu perfil de chef!</a>
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="animate-float-slow" style={{ ["--r" as string]: "0deg" }}>
            <img
              src={capa.url}
              alt="Capa do livro Além do Glúten & da Lactose: xadrez amarelo, selo marrom com o título e doces ilustrados"
              className="book-3d w-64 rounded-r-xl rounded-l-sm sm:w-80"
              width={1086}
              height={1448}
            />
          </div>
        </div>
      </div>
      <a
        href="#livro"
        aria-label="Rolar para baixo"
        className="absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center text-sm font-bold text-primary"
      >
        role para provar
        <ChevronDown className="animate-bounce" />
      </a>
    </section>
  );
}
