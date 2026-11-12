import { useRef, useState } from "react";
import capa from "@/assets/capa-livro.jpg.asset.json";
import apresentacao from "@/assets/apresentacao.jpg.asset.json";
import capaPaisagem from "@/assets/capa.jpg.asset.json";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { extraBookPages } from "@/content/site";
import { SectionTitle, Reveal } from "./shared";

type Page =
  | { kind: "image"; image: string; alt: string }
  | { kind: "goals" }
  | { kind: "soon" };

const pages: Page[] = [
  { kind: "image", image: capa.url, alt: "Capa do livro Além do Glúten & da Lactose" },
  {
    kind: "image",
    image: apresentacao.url,
    alt: "Apresentação do livro: Quem disse que a lactose e o glúten são um problema? Neste livro você encontrará receitas muito gostosas, saborosas e variadas!",
  },
  { kind: "goals" },
  ...extraBookPages,
  { kind: "soon" },
];

export function Book() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState<"next" | "prev">("next");
  const touchX = useRef<number | null>(null);
  const go = (d: 1 | -1) => {
    const n = i + d;
    if (n < 0 || n >= pages.length) return;
    setDir(d === 1 ? "next" : "prev");
    setI(n);
  };
  const page = pages[i];
  if (!page) return null;

  return (
    <section id="livro" className="relative px-5 py-20">
      <SectionTitle kicker="O livro" title="Uma pitada de criatividade, uma colher de sabor!" subtitle="Folheie uma prévia do nosso livro. Toque nas setas ou arraste para o lado." />
      <Reveal className="mx-auto max-w-md">
        <div
          className="relative aspect-[3/4] select-none"
          onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? null)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
          }}
          tabIndex={0}
          role="region"
          aria-roledescription="livro"
          aria-label={`Página ${i + 1} de ${pages.length}`}
        >
          <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-r-2xl bg-primary/20" aria-hidden />
          <div key={i} className={`relative h-full overflow-hidden rounded-r-2xl rounded-l-md bg-card shadow-soft ${dir === "next" ? "animate-flip-next" : "animate-flip-prev"}`}>
            {page.kind === "image" && <img src={page.image} alt={page.alt} className="h-full w-full object-cover" />}
            {page.kind === "goals" && (
              <div className="flex h-full flex-col justify-center gap-4 bg-gingham-soft p-7 text-center">
                <h3 className="text-2xl text-primary">Nossos objetivos</h3>
                <ul className="space-y-3 rounded-2xl bg-card/90 p-5 text-left text-base">
                  <li>🍰 Mostrar que restrição alimentar não precisa ser sinônimo de comida sem graça.</li>
                  <li>📚 Reunir receitas criativas, saborosas e variadas.</li>
                  <li>🚀 Transformar uma ideia em um produto de verdade no Projeto COLAB.</li>
                </ul>
              </div>
            )}
            {page.kind === "soon" && (
              <div className="relative flex h-full flex-col items-center justify-end">
                <img src={capaPaisagem.url} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div className="relative m-5 rounded-2xl border-stitch bg-card/95 p-5 text-center">
                  <p className="font-display text-xl font-bold text-primary">42 receitas para descobrir! 🍽️</p>
                  <p className="mt-1 text-sm text-muted-foreground">Explore os ingredientes e o preparo na seção de sabores.</p>
                  <Button asChild variant="hero" className="mt-3"><a href="#sabores">Ver receitas</a></Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <Button variant="sticker" size="icon" className="h-12 w-12" onClick={() => go(-1)} disabled={i === 0} aria-label="Página anterior">
            <ChevronLeft />
          </Button>
          <div className="flex gap-2" aria-hidden>
            {pages.map((_, k) => (
              <span key={k} className={`h-2.5 rounded-full transition-all ${k === i ? "w-6 bg-primary" : "w-2.5 bg-primary/30"}`} />
            ))}
          </div>
          <Button variant="sticker" size="icon" className="h-12 w-12" onClick={() => go(1)} disabled={i === pages.length - 1} aria-label="Próxima página">
            <ChevronRight />
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
