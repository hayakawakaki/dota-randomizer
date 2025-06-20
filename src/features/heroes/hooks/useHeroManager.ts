import { useState, useMemo } from "react";
import { useFetch } from "@hooks/useFetch";
import type {
  HeroTypes,
  HeroComplexity,
  HeroAttribute,
} from "@/features/heroes/types/heroes.types";

type HeroManagerReturn = {
  filteredHeroes: HeroTypes[];
  loading: boolean;
  error: string | null;
  heroComplexity: HeroComplexity;
  heroAttribute: Set<HeroAttribute>;
  updateHeroAttribute: (value: HeroAttribute) => void;
  updateHeroComplexity: (value: HeroComplexity) => void;
  clearFilters: () => void;
};

export function useHeroManager(): HeroManagerReturn {
  const {
    data: heroes,
    loading,
    error,
  } = useFetch<HeroTypes[]>("/api/heroes.json");

  const [heroComplexity, setHeroComplexity] = useState<HeroComplexity>(0);
  const [heroAttribute, setHeroAttribute] = useState<Set<HeroAttribute>>(
    () => new Set()
  );

  const filteredHeroes = useMemo(() => {
    if (!heroes) return [];
    let currentHeroes = heroes;
    if (currentHeroes.length === 0) return [];

    // Attribute filter
    if (heroAttribute.size > 0) {
      currentHeroes = currentHeroes.filter((item) =>
        heroAttribute.has(item.primary_attr)
      );
    }

    // Complexity filter
    if (heroComplexity > 0) {
      currentHeroes = currentHeroes.filter(
        (item) => item.complexity === heroComplexity
      );
    }

    return currentHeroes;
  }, [heroes, heroAttribute, heroComplexity]);

  function updateHeroAttribute(value: HeroAttribute) {
    setHeroAttribute((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      return newSet;
    });
  }

  function updateHeroComplexity(value: HeroComplexity) {
    if (value === heroComplexity) {
      setHeroComplexity(0);
      return;
    }
    setHeroComplexity(value);
  }

  function clearFilters() {
    setHeroComplexity(0);
    setHeroAttribute(new Set());
  }

  return {
    filteredHeroes,
    loading,
    error,
    heroComplexity: heroComplexity,
    heroAttribute: heroAttribute,
    updateHeroAttribute: updateHeroAttribute,
    updateHeroComplexity: updateHeroComplexity,
    clearFilters,
  };
}
