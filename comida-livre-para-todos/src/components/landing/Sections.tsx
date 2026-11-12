import { useEffect, useState } from "react";
import mascot from "@/assets/mascote_comida_para_todos.jpeg.asset.json";
import logo from "@/assets/logo_comida_para_todos.jpeg.asset.json";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { categories, colab, creators, fair, journey, recipes, teamMessage, type CategoryId, type Recipe } from "@/content/site";
import { Pending, Reveal, SectionTitle } from "./shared";

export function Why() {
  const cards = [
    { e: "🤔", t: "O desafio", d: "Encontrar opções gostosas e variadas pode ser difícil para quem precisa ou deseja evitar glúten e lactose." },
    { e: "💡", t: "Nossa ideia", d: "Reunir receitas que mostrem como é possível explorar sabores e preparar comidas deliciosas com ingredientes adequados." },
    { e: "📖", t: "Nossa solução", d: "Um livro de receitas pensado para inspirar experiências culinárias criativas, saborosas e acessíveis ao público interessado." },
  ];
  return (
    <section id="ideia" className="px-5 py-20">
      <SectionTitle kicker="Por quê?" title="Todo grande projeto começa com uma ideia!" />
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
        {cards.map((c, k) => (
          <Reveal key={c.t} delay={k * 120}>
            <article className={`h-full rounded-3xl border-2 border-primary bg-card p-6 shadow-sticker transition-transform hover:-translate-y-1 ${k === 1 ? "md:rotate-1" : "md:-rotate-1"}`}>
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-3xl">{c.e}</div>
              <h3 className="text-xl text-primary">{c.t}</h3>
              <p className="mt-2">{c.d}</p>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-10 text-center">
        <span className="inline-block rotate-[-3deg] rounded-full border-2 border-dashed border-primary bg-accent px-5 py-2 font-display font-bold text-accent-foreground shadow-sticker">
          ⭐ Criado por jovens empreendedores do 7º ano!
        </span>
      </Reveal>
    </section>
  );
}

export function Flavors() {
  const [filter, setFilter] = useState<CategoryId | "todas">("todas");
  const [open, setOpen] = useState<Recipe | null>(null);
  const shown = recipes.filter((r) => filter === "todas" || r.category === filter);
  const shownCats = categories.filter((c) => filter === "todas" || c.id === filter);

  return (
    <section id="sabores" className="bg-gingham px-5 py-20">
      <SectionTitle kicker="Sabores" title="O que você gostaria de preparar hoje?" />
      <div className="mx-auto mb-8 flex max-w-3xl flex-wrap justify-center gap-2" role="group" aria-label="Filtrar por categoria">
        {[{ id: "todas" as const, name: "Todas", emoji: "🍽️" }, ...categories].map((c) => (
          <Button variant={filter === c.id ? "default" : "outline"}
            key={c.id}
            onClick={() => setFilter(c.id)}
            aria-pressed={filter === c.id}
            className={`min-h-11 rounded-full border-2 border-primary px-4 font-bold transition-all ${filter === c.id ? "bg-primary text-primary-foreground" : "bg-card text-primary hover:bg-secondary"}`}
          >
            {c.emoji} {c.name}
          </Button>
        ))}
      </div>
      <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {shownCats.map((c, k) => {
          const count = recipes.filter((r) => r.category === c.id).length;
          return (
            <Reveal key={c.id} delay={k * 80}>
              <article className="group h-full rounded-3xl bg-card p-6 text-center shadow-soft transition-all hover:-translate-y-1.5 hover:rotate-1">
                <div className="mx-auto mb-3 flex h-24 w-24 items-center justify-center rounded-full bg-secondary text-5xl transition-transform group-hover:scale-110 group-hover:rotate-6">
                  {c.emoji}
                </div>
                <h3 className="text-lg text-primary">{c.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
                <div className="mt-4">
                  {count ? (
                    <Button variant="hero" size="sm" onClick={() => setFilter(c.id)}>Explorar ({count})</Button>
                  ) : (
                    <Pending label="Receitas em breve" />
                  )}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
      {shown.length > 0 && (
        <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((r) => (
            <article key={r.name} className="overflow-hidden rounded-2xl bg-card text-left shadow-soft transition-transform hover:-translate-y-1">
              {r.image && <img src={r.image} alt={r.name} className="aspect-video w-full object-cover" loading="lazy" />}
              <div className="p-5">
                <h4 className="text-lg text-primary">{r.name}</h4>
                {r.needsReview && <Pending label="Precisa de revisão" />}
                <p className="mt-2 text-sm text-muted-foreground">⏱️ {r.time}</p>
                <p className="text-sm text-muted-foreground">🍽️ {r.servings}</p>
                <Button variant="hero" className="mt-4" onClick={() => setOpen(r)}>Ver receita</Button>
              </div>
            </article>
          ))}
        </div>
      )}
      <p className="mx-auto mt-6 max-w-5xl text-center text-sm text-muted-foreground">Medidas do livro: 1 xícara = 240 ml • 1 colher de sopa = 15 ml • 1 colher de chá = 5 ml. Salvo indicação, forno preaquecido a 180 °C.</p>
      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          {open && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl text-primary">{open.name}</DialogTitle>
                <DialogDescription>⏱️ {open.time} • 🍽️ {open.servings}</DialogDescription>
              </DialogHeader>
              {open.image && <img src={open.image} alt={open.name} className="rounded-2xl" />}
              <h4 className="text-primary">Ingredientes</h4>
              {open.ingredientGroups?.map((group) => <div key={group.title}><p className="mb-2 font-bold">{group.title}</p><ul className="list-disc space-y-1 pl-5">{group.items.map((x, i) => <li key={i}>{x}</li>)}</ul></div>)}
              <h4 className="text-primary">Modo de preparo</h4>
              <ol className="list-decimal space-y-3 pl-5">{open.steps.map((x) => <li key={x}>{x}</li>)}</ol>
              {open.needsReview && <p role="note" className="rounded-2xl bg-secondary p-3 text-sm"><strong>Receita incompleta no documento:</strong> faltam os ingredientes e as quantidades da massa. O preparo menciona leite sem especificar o tipo. Confirme esses dados com a equipe antes de preparar.</p>}
              {open.notes && <p className="rounded-2xl bg-secondary p-3 text-sm">🌾🥛 {open.notes}</p>}
              <p className="text-sm text-muted-foreground">Confira os rótulos dos ingredientes quanto a glúten e lactose e evite contaminação cruzada. As receitas não substituem orientação individual sobre alergias e restrições alimentares.</p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

export function Journey() {
  return (
    <section id="jornada" className="px-5 py-20">
      <SectionTitle kicker="Jornada" title="Da ideia ao livro: nossa jornada!" />
      <ol className="relative mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row lg:gap-4">
        <span aria-hidden className="absolute bottom-0 left-7 top-0 w-1 rounded bg-caramel/40 lg:left-0 lg:right-0 lg:top-7 lg:bottom-auto lg:h-1 lg:w-auto" />
        {journey.map((s, k) => (
          <li key={s.title} className="relative flex-1">
            <Reveal delay={k * 90} className="flex items-start gap-4 lg:flex-col lg:items-center lg:text-center">
              <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-secondary text-2xl shadow-sticker">
                {s.emoji}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Etapa {k + 1}</span>
                <p className="font-semibold">{s.title}</p>
                {s.done === true && <span className="text-sm font-bold text-primary">✅ Concluída</span>}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

const hatBg = { strawberry: "bg-strawberry", caramel: "bg-caramel", butter: "bg-butter" };

export function Creators() {
  return (
    <section id="criadores" className="bg-gingham px-5 py-20">
      <SectionTitle kicker="Equipe" title="Três mentes criativas, uma receita de sucesso!" subtitle={teamMessage} />
      <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
        {creators.map((c, k) => (
          <Reveal key={c.name} delay={k * 120}>
            <article className={`rounded-3xl border-2 border-primary bg-card p-6 text-center shadow-sticker transition-transform hover:-translate-y-1 ${k === 1 ? "sm:-rotate-1" : "sm:rotate-1"}`}>
              <div className={`relative mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full ${hatBg[c.hat]}`}>
                <img src={c.photo} alt={`Foto de ${c.name}`} className="h-full w-full rounded-full object-cover" loading="lazy" />
              </div>
              <h3 className="text-2xl text-primary">{c.name}</h3>
              <div className="mt-2">{c.message ? <p>{c.message}</p> : <Pending label="Mensagem a preencher" />}</div>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-6 sm:flex-row">
        <img src={mascot.url} alt="Mascote do time: boneco artesanal com chapéu rosa e laço azul" className="h-64 w-48 rounded-2xl border-2 border-primary object-cover shadow-sticker" loading="lazy" />
        <div className="text-center sm:text-left"><span className="font-display text-sm font-bold text-primary">Mais um integrante!</span><h3 className="mt-2 text-2xl text-primary">Nosso mascote</h3><p className="mt-3 text-muted-foreground">O companheiro da nossa equipe, com chapéu rosa e muita personalidade.</p></div>
      </Reveal>
    </section>
  );
}

export function Colab() {
  const [visible, setVisible] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section id="colab" className="px-5 py-16">
      <div className="text-center">
        <Button variant="outline" className="rounded-full border-2 border-primary font-bold" onClick={() => setVisible((v) => !v)} aria-expanded={visible}>
          🏅 {visible ? "Fechar projeto COLAB" : "Conheça nosso projeto COLAB"}
        </Button>
      </div>
      {visible && (
        <div className="mx-auto mt-10 max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <SectionTitle kicker="Para os jurados" title="Você é o jurado!" subtitle="Toque em cada cartão para ver os detalhes do nosso projeto." />
          <div className="grid gap-4 sm:grid-cols-2">
            {colab.map((c, k) => {
              const open = openIdx === k;
              return (
                <div key={c.title} className="rounded-2xl border-2 border-primary/40 bg-card shadow-soft">
                  <Button variant="ghost" className="flex h-auto min-h-16 w-full whitespace-normal items-center gap-3 p-4 text-left" onClick={() => setOpenIdx(open ? null : k)} aria-expanded={open}>
                    <span className="text-2xl">{c.emoji}</span>
                    <span className="flex-1 font-display font-bold text-primary">{c.title}</span>
                    {!c.text && <span className="h-2.5 w-2.5 rounded-full bg-caramel" title="A preencher" />}
                    <span className={`transition-transform ${open ? "rotate-45" : ""}`} aria-hidden>＋</span>
                  </Button>
                  {open && <div className="border-t border-dashed px-4 py-4 animate-in fade-in">{c.text ? <p>{c.text}</p> : <Pending />}</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

export function Fair() {
  const [url, setUrl] = useState("");
  useEffect(() => setUrl(window.location.origin), []);
  const isPreview = url.includes("id-preview") || url.includes("localhost");
  return (
    <section id="feira" className="bg-gingham px-5 py-20">
      <SectionTitle kicker="Feira 2026" title="Venha conhecer nossa criação!" subtitle="Nosso livro nasceu de uma ideia, ganhou forma com o trabalho em equipe e agora está pronto para ser compartilhado com vocês!" />
      <div className="mx-auto grid max-w-4xl items-center gap-8 md:grid-cols-2">
        <Reveal>
          <div className="rounded-3xl border-2 border-primary bg-card p-6 shadow-sticker">
            <h3 className="text-xl text-primary">Feira de Empreendedorismo 2026 • Colégio Ideal</h3>
            <dl className="mt-4 space-y-3">
              {[["📅 Data", fair.date], ["⏰ Horário", fair.time], ["📍 Local", fair.place]].map(([k, v]) => (
                <div key={k} className="flex flex-wrap items-center justify-between gap-2">
                  <dt className="font-bold">{k}</dt>
                  <dd>{v || <Pending />}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="mx-auto max-w-xs rotate-1 rounded-3xl border-2 border-dashed border-primary bg-secondary p-6 text-center shadow-sticker">
            <p className="font-display text-lg font-bold text-primary">Além do Glúten & da Lactose</p>
            <div className="mx-auto my-4 w-fit rounded-2xl bg-card p-3">
              {url ? <QRCodeSVG value={url} size={150} fgColor="#704835" bgColor="#ffffff" aria-label="QR Code do site" /> : <div className="h-[150px] w-[150px]" />}
            </div>
            <p className="text-sm">Aponte a câmera e prove!</p>
            {isPreview && <p className="mt-2 text-xs text-muted-foreground">O QR Code final aparece com o endereço real depois que o site for publicado.</p>}
            <Button variant="hero" size="sm" className="mt-4" onClick={() => window.print()}>🖨️ Imprimir</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-gingham border-t-4 border-primary px-5 py-12 text-center">
      <div className="mx-auto max-w-xl rounded-3xl bg-card/90 p-6 shadow-soft">
        <img src={logo.url} alt="Comida Livre Para Todos" className="mx-auto mb-4 h-32 w-32 rounded-2xl object-contain" loading="lazy" />
        <p className="font-display text-2xl font-bold text-primary">Além do Glúten & da Lactose</p>
        <p className="mt-2">Uma ideia feita com criatividade, carinho e muito sabor!</p>
        <p className="mt-4 text-sm text-muted-foreground">Projeto COLAB • Feira de Empreendedorismo 2026 • Colégio Ideal</p>
        <p className="text-sm text-muted-foreground">Criado por Stella, Davi e Valentina.</p>
      </div>
    </footer>
  );
}
