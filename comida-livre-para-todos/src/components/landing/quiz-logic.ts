export type Profile = "chocolatudo" | "inventor" | "pratico" | "confeiteiro";

export const profiles: Record<Profile, { name: string; emoji: string; text: string }> = {
  chocolatudo: { name: "Chef Chocolatudo", emoji: "🍫", text: "Você adora doces e não resiste a uma receita com chocolate!" },
  inventor: { name: "Chef Inventor", emoji: "🧪", text: "Você gosta de experimentar combinações diferentes e criar sabores novos." },
  pratico: { name: "Chef Prático", emoji: "⚡", text: "Receitas simples, rápidas e gostosas são a sua especialidade." },
  confeiteiro: { name: "Chef Confeiteiro", emoji: "🧁", text: "Você ama preparar sobremesas especiais, cheias de capricho." },
};

type Option = { label: string; emoji: string; points: Partial<Record<Profile, number>> };

export const questions: { q: string; options: Option[] }[] = [
  {
    q: "Qual sabor conquista seu coração?",
    options: [
      { label: "Chocolate", emoji: "🍫", points: { chocolatudo: 3 } },
      { label: "Frutas", emoji: "🍓", points: { confeiteiro: 2, inventor: 1 } },
      { label: "Salgadinhos", emoji: "🥨", points: { pratico: 2, inventor: 1 } },
    ],
  },
  {
    q: "Na cozinha, você prefere…",
    options: [
      { label: "Preparar algo rapidinho", emoji: "⏱️", points: { pratico: 3 } },
      { label: "Inventar uma receita diferente", emoji: "💡", points: { inventor: 3 } },
      { label: "Caprichar em uma sobremesa", emoji: "🍰", points: { confeiteiro: 2, chocolatudo: 1 } },
    ],
  },
  {
    q: "Escolha seu superpoder culinário!",
    options: [
      { label: "Criatividade", emoji: "🎨", points: { inventor: 3 } },
      { label: "Praticidade", emoji: "🚀", points: { pratico: 3 } },
      { label: "Capricho", emoji: "💖", points: { confeiteiro: 2, chocolatudo: 1 } },
    ],
  },
];

/** answers = índice da opção escolhida em cada pergunta. Empate: vence o perfil mais forte da 1ª resposta. */
export function computeProfile(answers: number[]): Profile {
  const score: Record<Profile, number> = { chocolatudo: 0, inventor: 0, pratico: 0, confeiteiro: 0 };
  answers.forEach((a, qi) => {
    const pts = questions[qi]?.options[a]?.points;
    if (!pts) return;
    for (const k of Object.keys(pts) as Profile[]) score[k] += pts[k] ?? 0;
  });
  const answer = answers[0];
  const first = answer === undefined ? {} : questions[0]?.options[answer]?.points ?? {};
  const tiebreak = (Object.keys(first) as Profile[]).sort((a, b) => (first[b] ?? 0) - (first[a] ?? 0));
  const order: Profile[] = [...tiebreak, "chocolatudo", "inventor", "pratico", "confeiteiro"];
  let best: Profile = order[0] ?? "chocolatudo";
  for (const p of order) if (score[p] > score[best]) best = p;
  return best;
}
