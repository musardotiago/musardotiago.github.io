import importedRecipes from "./recipes.json";
import stella from "@/assets/Stella.jpeg.asset.json";
import davi from "@/assets/Davi.jpeg.asset.json";
import valentina from "@/assets/Valentina.jpeg.asset.json";
/**
 * ✏️ CONTEÚDO EDITÁVEL DO SITE
 * Stella, Davi e Valentina: alterem os textos aqui! Campos com "" (vazio)
 * aparecem no site como "A preencher".
 */

export type CategoryId = "doces" | "geladas" | "bolos" | "salgados";

export const categories: { id: CategoryId; name: string; emoji: string; description: string }[] = [
  { id: "doces", name: "Doces", emoji: "🍫", description: "Brigadeiros, brownies e docinhos para adoçar o dia." },
  { id: "geladas", name: "Sobremesas geladas", emoji: "🍦", description: "Sorvetes e delícias fresquinhas." },
  { id: "bolos", name: "Bolos e tortas", emoji: "🎂", description: "Fatias perfeitas para compartilhar." },
  { id: "salgados", name: "Lanches salgados", emoji: "🥪", description: "Para quem prefere um salgadinho." },
];

export type Recipe = {
  id?: number;
  ingredientGroups?: { title: string; items: string[] }[];
  needsReview?: boolean;
  name: string;
  image?: string; // URL da foto ou ilustração
  category: CategoryId;
  ingredients: string[];
  steps: string[];
  time: string; // ex.: "30 minutos"
  servings: string; // ex.: "8 porções"
  notes: string; // observações sobre glúten e lactose
};

/** Adicionem as receitas reais aqui quando estiverem prontas. */
export const recipes: Recipe[] = importedRecipes.map((recipe) => ({ ...recipe, category: recipe.category as CategoryId }));

/** Páginas do livro digital. Para adicionar uma página de receita, inclua { kind: "image", image: "URL", alt: "..." }. */
export const extraBookPages: { kind: "image"; image: string; alt: string }[] = [];

export const creators = [
  { name: "Stella", photo: stella.url, emoji: "🍓", hat: "strawberry" as const, message: "" },
  { name: "Davi", photo: davi.url, emoji: "🍫", hat: "caramel" as const, message: "" },
  { name: "Valentina", photo: valentina.url, emoji: "🧁", hat: "butter" as const, message: "" },
];
export const teamMessage = "Juntos, misturamos ideias, criatividade e muita vontade de empreender!";

export const journey = [
  { emoji: "🔍", title: "Identificamos um desafio", done: undefined as boolean | undefined },
  { emoji: "👥", title: "Pensamos em quem poderia se beneficiar", done: undefined as boolean | undefined },
  { emoji: "💡", title: "Trocamos ideias e escolhemos uma solução", done: undefined as boolean | undefined },
  { emoji: "📖", title: "Começamos a criar o livro", done: undefined as boolean | undefined },
  { emoji: "🎪", title: "Preparamos nosso produto para a feira", done: undefined as boolean | undefined },
  { emoji: "📣", title: "Compartilhamos nossa ideia com o público", done: undefined as boolean | undefined },
];

/** Informações para os jurados. Deixe "" para mostrar "A preencher". */
export const colab = [
  { emoji: "❓", title: "Problema identificado", text: "Encontrar opções gostosas e variadas pode ser difícil para quem precisa ou deseja evitar glúten e lactose." },
  { emoji: "🙋", title: "Público-alvo (persona)", text: "" },
  { emoji: "🧠", title: "Brainstorming e escolha da solução", text: "" },
  { emoji: "🎯", title: "Missão, visão e valores", text: "" },
  { emoji: "⭐", title: "Diferenciais do produto", text: "" },
  { emoji: "📣", title: "Estratégia de marketing", text: "" },
  { emoji: "🛠️", title: "Criação e produção do livro", text: "" },
  { emoji: "💰", title: "Custos, preço e expectativa de lucro", text: "" },
];

export const fair = {
  date: "",
  time: "",
  place: "",
};
