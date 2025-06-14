import { useState, useMemo } from "react";
import { useFetch } from "@hooks/useFetch";
import type { HeroTypes, HeroComplexity, HeroAttribute } from "@/types/heroes";

type HeroManagerReturn = {
  filteredHeroes: HeroTypes[];
  loading: boolean;
  error: string | null;
  complexity: HeroComplexity;
  attribute: Set<HeroAttribute>;
  updateAttribute: (value: HeroAttribute) => void;
  updateComplexity: (value: HeroComplexity) => void;
  clearFilters: () => void;
}

export function useHeroManager(): HeroManagerReturn {
  const {
    data: heroes,
    loading,
    error,
  } = useFetch<HeroTypes[]>("/api/heroes.json");

  const [complexity, setComplexity] = useState<HeroComplexity>(0);
  const [attribute, setAttribute] = useState<Set<HeroAttribute>>(new Set());

  const filteredHeroes = useMemo(() => {
    if (!heroes) return [];
    let currentHeroes = heroes;
    if (currentHeroes.length === 0) return [];

    // Attribute filter
    if (attribute.size > 0) {
      currentHeroes = currentHeroes.filter((item) =>
        attribute.has(item.primary_attr)
      );
    }

    // Complexity filter
    if (complexity > 0) {
      currentHeroes = currentHeroes.filter(
        (item) => item.complexity === complexity
      );
    }

    return currentHeroes;
  }, [heroes, attribute, complexity]);

  function updateAttribute(value: HeroAttribute) {
    setAttribute((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      return newSet;
    });
  }

  function updateComplexity(value: HeroComplexity) {
    if (value === complexity) {
      setComplexity(0);
      return;
    }
    setComplexity(value);
  }

  function clearFilters() {
    setComplexity(0);
    setAttribute(new Set());
  }

   return {
    filteredHeroes,
    loading,
    error,
    complexity,
    attribute,
    updateAttribute,
    updateComplexity,
    clearFilters,
   }
}