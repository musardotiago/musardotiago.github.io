import { describe, expect, it } from "vitest";
import { recipes } from "@/content/site";
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
  it("flags the incomplete tuna pie without inventing a dough", () => {
    const pie = recipes.find(r => r.id === 22);
    expect(pie?.needsReview).toBe(true);
    expect(pie?.ingredientGroups).toHaveLength(1);
    expect(pie?.time).toBe("Tempo não informado");
  });
  it("retains preparation steps for every recipe", () => {
    expect(recipes.every(r => r.steps.length > 0)).toBe(true);
    expect(recipes.find(r => r.id === 9)?.steps).toHaveLength(7);
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