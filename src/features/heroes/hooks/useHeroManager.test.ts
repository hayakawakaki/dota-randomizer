import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { HERO_COMPLEXITY, HERO_ATTRIBUTE } from "@/constant";
import { useFetch } from "@hooks/useFetch";
import { useHeroManager } from "./useHeroManager";
import type { HeroTypes } from "@/features/heroes";

vi.mock("@hooks/useFetch");
const mockUseFetch = vi.mocked(useFetch);

const mockHeroes: HeroTypes[] = [
  {
    id: 1,
    name: "pudge",
    name_loc: "Pudge",
    name_english_loc: "Pudge",
    primary_attr: HERO_ATTRIBUTE.STRENGTH.value,
    complexity: HERO_COMPLEXITY.EASY.value,
  },
  {
    id: 2,
    name: "invoker",
    name_loc: "Invoker",
    name_english_loc: "invoker",
    primary_attr: HERO_ATTRIBUTE.INTELLIGENCE.value,
    complexity: HERO_COMPLEXITY.HARD.value,
  },
  {
    id: 3,
    name: "phantomassassin",
    name_loc: "Phantom Assassin",
    name_english_loc: "Phantom Assassin",
    primary_attr: HERO_ATTRIBUTE.AGILITY.value,
    complexity: HERO_COMPLEXITY.NORMAL.value,
  },
];

describe("useHeroManager", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(Math, "random").mockReturnValue(0.6);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("useHeroManager initial state", () => {
    it("should return the initial state values", () => {
      mockUseFetch.mockReturnValue({
        data: null,
        loading: true,
        error: null,
      });

      const { result } = renderHook(() => useHeroManager());

      expect(result.current.filteredHeroes).toEqual([]);
      expect(result.current.loading).toBe(true);
      expect(result.current.error).toBeNull();
      expect(result.current.heroComplexity).toBe(
        HERO_COMPLEXITY.UNDEFINED.value
      );
      expect(result.current.heroAttribute).toEqual(new Set());
    });

    it("should return heroes data as is when the fetch is successful", () => {
      mockUseFetch.mockReturnValue({
        data: mockHeroes,
        loading: false,
        error: null,
      });

      const { result } = renderHook(() => useHeroManager());

      expect(result.current.filteredHeroes).toEqual(mockHeroes);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it("should return an error state when it fails", () => {
      const errorMessage = "Fetching heroes failed";
      mockUseFetch.mockReturnValue({
        data: null,
        loading: false,
        error: errorMessage,
      });

      const { result } = renderHook(() => useHeroManager());

      expect(result.current.filteredHeroes).toEqual([]);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(errorMessage);
    });
  });

  describe("Filter heroes by attributes", () => {
    beforeEach(() => {
      mockUseFetch.mockReturnValue({
        data: mockHeroes,
        loading: false,
        error: null,
      });
    });

    it("should filter heroes by single attribute", () => {
      const { result } = renderHook(() => useHeroManager());

      act(() => {
        result.current.updateHeroAttribute(HERO_ATTRIBUTE.STRENGTH.value);
      });

      expect(
        result.current.heroAttribute.has(HERO_ATTRIBUTE.STRENGTH.value)
      ).toBe(true);
      expect(result.current.filteredHeroes).toHaveLength(1);
      expect(result.current.filteredHeroes[0].name_loc).toBe("Pudge");
    });

    it("should filter heroes by multiple attributes", () => {
      const { result } = renderHook(() => useHeroManager());

      act(() => {
        result.current.updateHeroAttribute(HERO_ATTRIBUTE.STRENGTH.value);
        result.current.updateHeroAttribute(HERO_ATTRIBUTE.INTELLIGENCE.value);
      });

      expect(
        result.current.heroAttribute.has(HERO_ATTRIBUTE.STRENGTH.value)
      ).toBe(true);
      expect(
        result.current.heroAttribute.has(HERO_ATTRIBUTE.INTELLIGENCE.value)
      ).toBe(true);
      expect(result.current.filteredHeroes).toHaveLength(2);
      expect(result.current.filteredHeroes.map((h) => h.name_loc)).toEqual(
        expect.arrayContaining(["Pudge", "Invoker"])
      );
    });

    it("should toggle attribute on/off when called multiple times", () => {
      const { result } = renderHook(() => useHeroManager());
      act(() => {
        result.current.updateHeroAttribute(HERO_ATTRIBUTE.STRENGTH.value);
      });
      expect(
        result.current.heroAttribute.has(HERO_ATTRIBUTE.STRENGTH.value)
      ).toBe(true);

      act(() => {
        result.current.updateHeroAttribute(HERO_ATTRIBUTE.STRENGTH.value);
      });

      expect(
        result.current.heroAttribute.has(HERO_ATTRIBUTE.STRENGTH.value)
      ).toBe(false);
      expect(result.current.filteredHeroes).toHaveLength(3);
    });
  });

  describe("Filter heroes by complexity", () => {
    beforeEach(() => {
      mockUseFetch.mockReturnValue({
        data: mockHeroes,
        loading: false,
        error: null,
      });
    });

    it("should filter heroes by the selected complexity level", () => {
      const { result } = renderHook(() => useHeroManager());

      act(() => {
        result.current.updateHeroComplexity(HERO_COMPLEXITY.EASY.value);
      });

      expect(result.current.heroComplexity).toBe(HERO_COMPLEXITY.EASY.value);
      expect(result.current.filteredHeroes).toHaveLength(1);
      expect(result.current.filteredHeroes.map((h) => h.name_loc)).toEqual(
        expect.arrayContaining(["Pudge"])
      );
    });

    it("should toggle complexity filter off when same value is selected", () => {
      const { result } = renderHook(() => useHeroManager());

      act(() => {
        result.current.updateHeroComplexity(HERO_COMPLEXITY.EASY.value);
      });
      expect(result.current.heroComplexity).toBe(HERO_COMPLEXITY.EASY.value);

      act(() => {
        result.current.updateHeroComplexity(HERO_COMPLEXITY.EASY.value);
      });

      expect(result.current.heroComplexity).toBe(
        HERO_COMPLEXITY.UNDEFINED.value
      );
      expect(result.current.filteredHeroes).toHaveLength(3);
    });

    it("should change complexity filter when different value is selected", () => {
      const { result } = renderHook(() => useHeroManager());

      act(() => {
        result.current.updateHeroComplexity(HERO_COMPLEXITY.EASY.value);
      });

      act(() => {
        result.current.updateHeroComplexity(HERO_COMPLEXITY.HARD.value);
      });

      expect(result.current.heroComplexity).toBe(HERO_COMPLEXITY.HARD.value);
      expect(result.current.filteredHeroes).toHaveLength(1);
      expect(result.current.filteredHeroes[0].name_loc).toBe("Invoker");
    });
  });

  describe("Filter heroes by attribute and complexity", () => {
    beforeEach(() => {
      mockUseFetch.mockReturnValue({
        data: mockHeroes,
        loading: false,
        error: null,
      });
    });

    it("should apply both attribute and complexity filters", () => {
      const { result } = renderHook(() => useHeroManager());

      act(() => {
        result.current.updateHeroAttribute(HERO_ATTRIBUTE.INTELLIGENCE.value);
        result.current.updateHeroComplexity(HERO_COMPLEXITY.HARD.value);
      });

      expect(result.current.filteredHeroes).toHaveLength(1);
      expect(result.current.filteredHeroes[0].name_loc).toBe("Invoker");
    });

    it("should return empty array when filters match no heroes", () => {
      const { result } = renderHook(() => useHeroManager());

      act(() => {
        result.current.updateHeroAttribute(1);
        result.current.updateHeroComplexity(3);
      });

      expect(result.current.filteredHeroes).toHaveLength(0);
    });
  });

  describe("Filter clearing", () => {
    beforeEach(() => {
      mockUseFetch.mockReturnValue({
        data: mockHeroes,
        loading: false,
        error: null,
      });
    });

    it("should reset all filters to initial state", () => {
      const { result } = renderHook(() => useHeroManager());

      act(() => {
        result.current.updateHeroAttribute(HERO_ATTRIBUTE.STRENGTH.value);
        result.current.updateHeroAttribute(HERO_ATTRIBUTE.INTELLIGENCE.value);
        result.current.updateHeroComplexity(HERO_COMPLEXITY.NORMAL.value);
      });

      expect(result.current.heroAttribute.size).toBe(2);
      expect(result.current.heroComplexity).toBe(2);

      act(() => {
        result.current.clearFilters();
      });

      expect(result.current.heroAttribute.size).toBe(0);
      expect(result.current.heroComplexity).toBe(
        HERO_COMPLEXITY.UNDEFINED.value
      );
      expect(result.current.filteredHeroes).toHaveLength(3);
    });
  });
});
