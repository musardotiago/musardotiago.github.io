import { useState } from "react";
import { Button } from "@/components/ui/button";
import { computeProfile, profiles, questions } from "./quiz-logic";
import { Confetti, SectionTitle, Reveal } from "./shared";

export function Quiz() {
  const [answers, setAnswers] = useState<number[]>([]);
  const [burst, setBurst] = useState(0);
  const step = answers.length;
  const done = step === questions.length;
  const question = questions[step];
  const result = done ? profiles[computeProfile(answers)] : null;

  const choose = (k: number) => {
    const next = [...answers, k];
    setAnswers(next);
    if (next.length === questions.length) setBurst((b) => b + 1);
  };

  return (
    <section id="quiz" className="relative bg-gingham px-5 py-20">
      <SectionTitle kicker="Quiz" title="Descubra seu lado chef!" subtitle="Responda a três perguntinhas e descubra que tipo de chef combina com você!" />
      <Reveal className="relative mx-auto max-w-xl">
        <Confetti trigger={burst} />
        <div className="rounded-3xl border-2 border-primary bg-card p-6 shadow-sticker sm:p-8" aria-live="polite">
          {!done && question ? (
            <div key={step} className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="mb-5 flex items-center justify-between text-sm font-bold text-muted-foreground">
                <span>Pergunta {step + 1} de {questions.length}</span>
                <div className="flex gap-1.5">
                  {questions.map((_, k) => (
                    <span key={k} className={`h-2 w-8 rounded-full ${k <= step ? "bg-caramel" : "bg-muted"}`} />
                  ))}
                </div>
              </div>
              <h3 className="mb-6 text-2xl text-primary">{question.q}</h3>
              <div className="grid gap-3">
                {question.options.map((o, k) => (
                  <Button key={o.label} variant="choice" className="justify-start px-5 py-4 text-left" onClick={() => choose(k)}>
                    <span className="text-2xl">{o.emoji}</span> {o.label}
                  </Button>
                ))}
              </div>
              {step > 0 && (
                <Button variant="link" className="mt-4 text-sm font-semibold text-muted-foreground underline" onClick={() => setAnswers(answers.slice(0, -1))}>
                  ← voltar
                </Button>
              )}
            </div>
          ) : (
            result && (
              <div className="animate-in zoom-in-90 fade-in py-4 text-center duration-500">
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Você é…</p>
                <div className="mx-auto my-4 flex h-28 w-28 animate-wiggle items-center justify-center rounded-full bg-secondary text-6xl shadow-sticker">
                  {result.emoji}
                </div>
                <h3 className="text-3xl text-primary">{result.name}!</h3>
                <p className="mx-auto mt-3 max-w-sm text-lg">{result.text}</p>
                <Button variant="hero" size="xl" className="mt-6" onClick={() => setAnswers([])}>
                  🔄 Descobrir novamente!
                </Button>
              </div>
            )
          )}
        </div>
      </Reveal>
    </section>
  );
}
