import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Book } from "@/components/landing/Book";
import { Quiz } from "@/components/landing/Quiz";
import { Why, Flavors, Journey, Creators, Colab, Fair, Footer } from "@/components/landing/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Comida Livre para Todos — Além do Glúten & da Lactose" },
      { name: "description", content: "Comida Livre para Todos: receitas sem glúten e sem lactose com muito sabor. Projeto COLAB 2026 de Stella, Davi e Valentina." },
      { property: "og:title", content: "Comida Livre para Todos — Livro de receitas" },
      { property: "og:description", content: "Conheça a Comida Livre para Todos e o livro Além do Glúten & da Lactose. Descubra receitas e seu perfil de chef." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <Nav />
      <Hero />
      <Book />
      <Quiz />
      <Why />
      <Flavors />
      <Journey />
      <Creators />
      <Colab />
      <Fair />
      <Footer />
    </main>
  );
}
