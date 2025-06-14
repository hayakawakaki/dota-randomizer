import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useHeroManager } from '@/hooks/useHeroManager';
import { useFetch } from '@hooks/useFetch';
import { HERO_COMPLEXITY, HERO_ATTRIBUTE } from '@/constant';
import type { HeroTypes } from '@/types/heroes';

vi.mock('@hooks/useFetch');
const mockUseFetch = vi.mocked(useFetch);

const mockHeroes: HeroTypes[] = [
  {
    id: 1,
    name: 'pudge',
    name_loc: 'Pudge',
    name_english_loc: 'Pudge',
    primary_attr: HERO_ATTRIBUTE.STRENGTH,
    complexity: HERO_COMPLEXITY.EASY,
  },
  {
    id: 2,
    name: 'invoker',
    name_loc: 'Invoker',
    name_english_loc: 'invoker',
    primary_attr: HERO_ATTRIBUTE.INTELLIGENCE,
    complexity: HERO_COMPLEXITY.HARD,
  },
  {
    id: 3,
    name: 'phantomassassin',
    name_loc: 'Phantom Assassin',
    name_english_loc: 'Phantom Assassin',
    primary_attr: HERO_ATTRIBUTE.AGILITY,
    complexity: HERO_COMPLEXITY.NORMAL,
  }
];

describe('useHeroes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(Math, 'random').mockReturnValue(0.6);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('useHeroes initial state', () => {
    it('should return the initial state values', () => {

      mockUseFetch.mockReturnValue({
        data: null,
        loading: true,
        error: null,
      });

      const { result } = renderHook(() => useHeroManager());

      expect(result.current.filteredHeroes).toEqual([]);
      expect(result.current.loading).toBe(true);
      expect(result.current.error).toBe(null);
      expect(result.current.randomHero).toBe('Not Selected');
      expect(result.current.complexity).toBe(HERO_COMPLEXITY.UNDEFINED);
      expect(result.current.attribute).toEqual(new Set());
    });

    it('should return heroes data as is when the fetch is successful', () => {
      mockUseFetch.mockReturnValue({
        data: mockHeroes,
        loading: false,
        error: null,
      });

      const { result } = renderHook(() => useHeroManager());

      expect(result.current.filteredHeroes).toEqual(mockHeroes);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
    });

    it('should return an error state when it fails', () => {
      const errorMessage = 'Fetching heroes failed';
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

  describe('Filter heroes by attributes', () => {
    beforeEach(() => {
      mockUseFetch.mockReturnValue({
        data: mockHeroes,
        loading: false,
        error: null,
      });
    });

    it('should filter heroes by single attribute', () => {
      const { result } = renderHook(() => useHeroManager());

      act(() => {
        result.current.updateAttribute(HERO_ATTRIBUTE.STRENGTH);
      });

      expect(result.current.attribute.has(HERO_ATTRIBUTE.STRENGTH)).toBe(true);
      expect(result.current.filteredHeroes).toHaveLength(1);
      expect(result.current.filteredHeroes[0].name_loc).toBe('Pudge');
    });

    it('should filter heroes by multiple attributes', () => {
      const { result } = renderHook(() => useHeroManager());

      act(() => {
        result.current.updateAttribute(HERO_ATTRIBUTE.STRENGTH);
        result.current.updateAttribute(HERO_ATTRIBUTE.INTELLIGENCE);
      });

      expect(result.current.attribute.has(HERO_ATTRIBUTE.STRENGTH)).toBe(true);
      expect(result.current.attribute.has(HERO_ATTRIBUTE.INTELLIGENCE)).toBe(true);
      expect(result.current.filteredHeroes).toHaveLength(2);
      expect(result.current.filteredHeroes.map(h => h.name_loc)).toEqual(
        expect.arrayContaining(['Pudge', 'Invoker'])
      );
    });

    it('should toggle attribute on/off when called multiple times', () => {
      const { result } = renderHook(() => useHeroManager());
      act(() => {
        result.current.updateAttribute(HERO_ATTRIBUTE.STRENGTH);
      });
      expect(result.current.attribute.has(HERO_ATTRIBUTE.STRENGTH)).toBe(true);

      act(() => {
        result.current.updateAttribute(HERO_ATTRIBUTE.STRENGTH);
      });

      expect(result.current.attribute.has(HERO_ATTRIBUTE.STRENGTH)).toBe(false);
      expect(result.current.filteredHeroes).toHaveLength(3);
    });
  });

  describe('Filter heroes by complexity', () => {
    beforeEach(() => {
      mockUseFetch.mockReturnValue({
        data: mockHeroes,
        loading: false,
        error: null,
      });
    });

    it('should filter heroes by the selected complexity level', () => {
      const { result } = renderHook(() => useHeroManager());

      act(() => {
        result.current.updateComplexity(HERO_COMPLEXITY.EASY);
      });

      expect(result.current.complexity).toBe(HERO_COMPLEXITY.EASY);
      expect(result.current.filteredHeroes).toHaveLength(1);
      expect(result.current.filteredHeroes.map(h => h.name_loc)).toEqual(
        expect.arrayContaining(['Pudge'])
      );
    });

    it('should toggle complexity filter off when same value is selected', () => {
      const { result } = renderHook(() => useHeroManager());

      act(() => {
        result.current.updateComplexity(HERO_COMPLEXITY.EASY);
      });
      expect(result.current.complexity).toBe(HERO_COMPLEXITY.EASY);

      act(() => {
        result.current.updateComplexity(HERO_COMPLEXITY.EASY);
      });

      expect(result.current.complexity).toBe(HERO_COMPLEXITY.UNDEFINED);
      expect(result.current.filteredHeroes).toHaveLength(3);
    });

    it('should change complexity filter when different value is selected', () => {
      const { result } = renderHook(() => useHeroManager());

      act(() => {
        result.current.updateComplexity(HERO_COMPLEXITY.EASY);
      });

      act(() => {
        result.current.updateComplexity(HERO_COMPLEXITY.HARD);
      });

      expect(result.current.complexity).toBe(HERO_COMPLEXITY.HARD);
      expect(result.current.filteredHeroes).toHaveLength(1);
      expect(result.current.filteredHeroes[0].name_loc).toBe('Invoker');
    });
  });

  describe('Filter heroes by attribute and complexity', () => {
    beforeEach(() => {
      mockUseFetch.mockReturnValue({
        data: mockHeroes,
        loading: false,
        error: null,
      });
    });

    it('should apply both attribute and complexity filters', () => {
      const { result } = renderHook(() => useHeroManager());

      act(() => {
        result.current.updateAttribute(HERO_ATTRIBUTE.INTELLIGENCE);
        result.current.updateComplexity(HERO_COMPLEXITY.HARD);
      });

      expect(result.current.filteredHeroes).toHaveLength(1);
      expect(result.current.filteredHeroes[0].name_loc).toBe('Invoker');
    });

    it('should return empty array when filters match no heroes', () => {
      const { result } = renderHook(() => useHeroManager());

      act(() => {
        result.current.updateAttribute(1);
        result.current.updateComplexity(3);
      });

      expect(result.current.filteredHeroes).toHaveLength(0);
    });
  });

  describe('Randomizing hero', () => {
    beforeEach(() => {
      mockUseFetch.mockReturnValue({
        data: mockHeroes,
        loading: false,
        error: null,
      });
    });

    it('should randomize hero from filtered heroes', () => {
      const { result } = renderHook(() => useHeroManager());

      act(() => {
        result.current.randomizeHero();
      });

      expect(result.current.randomHero).toBe('Invoker');
    });

    it('should not randomize when no filtered heroes available', () => {
      const { result } = renderHook(() => useHeroManager());

      act(() => {
        result.current.updateAttribute(HERO_ATTRIBUTE.STRENGTH);
        result.current.updateComplexity(HERO_COMPLEXITY.HARD);
      });

      act(() => {
        result.current.randomizeHero();
      });

      expect(result.current.randomHero).toBe('Not Selected');
    });

    it('should prevent selecting the same hero twice in a row', () => {
      Math.random = vi.fn()
        .mockReturnValueOnce(0.6)
        .mockReturnValueOnce(0.3);

      const { result } = renderHook(() => useHeroManager());

      act(() => {
        result.current.randomizeHero();
      });
      const firstHero = result.current.randomHero;

      act(() => {
        result.current.randomizeHero();
      });

      expect(result.current.randomHero).not.toBe(firstHero);
    });

    it('should work correctly with single hero in filtered list', () => {

      const { result } = renderHook(() => useHeroManager());

      act(() => {
        result.current.updateAttribute(1);
      });

      act(() => {
        result.current.randomizeHero();
      });

      expect(result.current.randomHero).toBe('Pudge');
    });
  });

  describe('Filter clearing', () => {
    beforeEach(() => {
      mockUseFetch.mockReturnValue({
        data: mockHeroes,
        loading: false,
        error: null,
      });
    });

    it('should reset all filters to initial state', () => {
      const { result } = renderHook(() => useHeroManager());

      act(() => {
        result.current.updateAttribute(HERO_ATTRIBUTE.STRENGTH);
        result.current.updateAttribute(HERO_ATTRIBUTE.INTELLIGENCE);
        result.current.updateComplexity(HERO_COMPLEXITY.NORMAL);
      });

      expect(result.current.attribute.size).toBe(2);
      expect(result.current.complexity).toBe(2);

      act(() => {
        result.current.clearFilters();
      });

      expect(result.current.attribute.size).toBe(0);
      expect(result.current.complexity).toBe(HERO_COMPLEXITY.UNDEFINED);
      expect(result.current.filteredHeroes).toHaveLength(3);
    });

    it('should not affect randomHero state when clearing filters', () => {
      const { result } = renderHook(() => useHeroManager());

      act(() => {
        result.current.randomizeHero();
      });
      const randomizedHero = result.current.randomHero;

      act(() => {
        result.current.updateComplexity(1);
      });

      act(() => {
        result.current.clearFilters();
      });

      expect(result.current.randomHero).toBe(randomizedHero);
    });
  });
});