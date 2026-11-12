import { describe, expect, it } from "vitest";
import { fair, officialSiteUrl, recipes } from "@/content/site";
import { computeProfile } from "@/components/landing/quiz-logic";

describe("Supplied recipe content", () => {
  it("imports all 42 recipes with chapter categories", () => {
    expect(recipes).toHaveLength(42);
    expect(recipes.filter(r => r.category === "bolos")).toHaveLength(10);
    expect(recipes.filter(r => r.category === "salgados")).toHaveLength(12);
    expect(recipes.filter(r => r.category === "doces")).toHaveLength(10);
    expect(recipes.filter(r => r.category === "geladas")).toHaveLength(10);
  });
  it("preserves chocolate cake ingredients and all seven steps", () => {
    expect(recipes[0]?.ingredients).toContain("2 xícaras de farinha de amêndoas");
    expect(recipes[0]?.steps).toHaveLength(7);
    expect(recipes[0]?.servings).toBe("8 fatias");
  });
  it("uses the supplied complete tuna pie with both ingredient groups", () => {
    const pie = recipes.find(r => r.id === 22);
    expect(pie?.needsReview).toBe(false);
    expect(pie?.ingredientGroups).toHaveLength(2);
    expect(pie?.ingredientGroups?.[0]?.items).toEqual([
      "3 ovos",
      "1 xícara de leite sem lactose ou bebida vegetal sem açúcar (240 ml)",
      "½ xícara de óleo (120 ml)",
      "1 xícara de farinha de arroz (aproximadamente 140 g)",
      "½ xícara de amido de milho (aproximadamente 60 g)",
      "1 colher de sopa de fermento químico em pó (12 g)",
      "½ colher de chá de sal",
    ]);
    expect(pie?.ingredientGroups?.[1]?.items).toHaveLength(8);
    expect(pie?.ingredients).toEqual(pie?.ingredientGroups?.flatMap(group => group.items));
    expect(pie?.steps).toHaveLength(9);
    expect(pie?.steps[7]).toBe("Asse por aproximadamente 35 a 40 minutos, até a superfície ficar dourada e a massa estar completamente assada.");
    expect(pie?.steps[8]).toBe("Aguarde 5 a 10 minutos antes de cortar e servir.");
    expect(pie?.tips).toHaveLength(5);
    expect(pie?.tips?.[0]).toBe("Massa mais fofinha: substitua ¼ de xícara da farinha de arroz por fécula de batata.");
  });
  it("retains preparation steps for every recipe", () => {
    expect(recipes.every(r => r.steps.length > 0)).toBe(true);
    expect(recipes.find(r => r.id === 9)?.steps).toHaveLength(7);
  });
});

describe("Official website and fair details", () => {
  it("uses the official QR destination regardless of preview origin", () => {
    expect(officialSiteUrl).toBe("https://mitsd.com.br/comida-livre-para-todos/");
  });
  it("sets the supplied fair date", () => {
    expect(fair.date).toBe("13/11/2026");
  });
  it("sets the supplied fair time", () => {
    expect(fair.time).toBe("Período matutino");
  });
  it("sets the supplied fair address", () => {
    expect(fair.place).toBe("St. G Norte Nº 26 - Taguatinga, Brasília");
  });
});

describe("Chef scoring", () => {
  it.each([
    [[0, 2, 2], "chocolatudo"],
    [[1, 1, 0], "inventor"],
    [[2, 0, 1], "pratico"],
    [[1, 2, 2], "confeiteiro"],
  ] as const)("calculates the profile from %j", (answers, result) => {
    expect(computeProfile([...answers])).toBe(result);
  });
});