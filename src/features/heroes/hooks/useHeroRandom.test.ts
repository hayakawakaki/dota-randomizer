import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";
import {
  HERO_COMPLEXITY,
  HERO_ATTRIBUTE,
  HERO_RANDOMIZE_SETTING,
} from "@/constant";
import { useHeroRandom, setInitialRandomizeSettings } from "./useHeroRandom";

import type { HeroTypes } from "@/features/heroes";

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

describe("useHeroRandom", () => {
  beforeEach(() => {
    vi.spyOn(Math, "random");
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runAllTimers();
    vi.useRealTimers();
  });

  describe("useHeroManager initial state", () => {
    it("should return the initial return values of", () => {
      const { result } = renderHook(() => useHeroRandom(mockHeroes));

      expect(result.current.randomHero).toBeNull();
      expect(result.current.isRandomizing).toEqual(false);
      expect(result.current.randomizedLaneRef.current).toBeNull();
      expect(typeof result.current.randomizeHero).toBe("function");
      expect(typeof result.current.updateRandomizationSetting).toBe("function");
    });

    it("should have initial randomizeSetting object of", () => {
      const result = setInitialRandomizeSettings();

      expect(typeof result).toBe("object");
      Object.values(HERO_RANDOMIZE_SETTING).map((item) =>
        expect(result[item.key]).toBe(item.default)
      );
    });
  });

  describe("Hero randomization", () => {
    it("should randomize a hero from the passed hero data", () => {
      Math.random = vi.fn().mockReturnValueOnce(0.6);
      const { result } = renderHook(() => useHeroRandom(mockHeroes));
      const key = HERO_RANDOMIZE_SETTING.SKIPANIMATION.key;

      act(() => {
        result.current.updateRandomizationSetting(key);
      });

      expect(result.current.randomizeSetting[key]).toBe(true);

      act(() => {
        result.current.randomizeHero();
      });

      expect(result.current.randomHero).toBe("invoker");
    });

    it("should prevent heroes being randomized twice in a row", async () => {
      Math.random = vi.fn().mockReturnValueOnce(0.6).mockReturnValueOnce(0.3);
      const { result } = renderHook(() => useHeroRandom(mockHeroes));

      const key = HERO_RANDOMIZE_SETTING.SKIPANIMATION.key;

      act(() => {
        result.current.updateRandomizationSetting(key);
      });

      expect(result.current.randomizeSetting[key]).toBe(true);

      act(() => {
        result.current.randomizeHero();
      });

      const firstHero = result.current.randomHero;

      act(() => {
        result.current.randomizeHero();
      });

      expect(result.current.randomHero).not.toBe(firstHero);
    });

    it("should return is isRandomizing to false after randomizing", () => {
      Math.random = vi.fn().mockReturnValueOnce(0.6);
      const { result } = renderHook(() => useHeroRandom(mockHeroes));
      const key = HERO_RANDOMIZE_SETTING.SKIPANIMATION.key;

      act(() => {
        result.current.updateRandomizationSetting(key);
      });

      expect(result.current.randomizeSetting[key]).toBe(true);

      act(() => {
        result.current.randomizeHero();
      });

      expect(result.current.isRandomizing).toBe(false);
      expect(result.current.randomHero).toBeTruthy();
    });

    it("should skip animation when SKIPANIMATION is true", async () => {
      Math.random = vi.fn().mockReturnValueOnce(0.6);
      const { result } = renderHook(() => useHeroRandom(mockHeroes));
      const key = HERO_RANDOMIZE_SETTING.SKIPANIMATION.key;

      expect(result.current.randomizeSetting[key]).toBe(false);

      act(() => {
        result.current.updateRandomizationSetting(key);
      });

      expect(result.current.randomizeSetting[key]).toBe(true);

      const startTime = performance.now();

      await act(async () => {
        await result.current.randomizeHero();
      });

      const duration = performance.now() - startTime;
      expect(duration).toBeLessThan(100);
      expect(result.current.randomHero).toBeTruthy();
      vi.runAllTimers();
    });
  });

  describe("Randomization settings", () => {
    it("updateRandomizationSetting should toggle the passed key to true/false", () => {
      const { result } = renderHook(() => useHeroRandom(mockHeroes));
      const key = HERO_RANDOMIZE_SETTING.LANES.key;
      const defaultValue = result.current.randomizeSetting[key];
      act(() => {
        result.current.updateRandomizationSetting(key);
      });
      expect(result.current.randomizeSetting[key]).not.toBe(defaultValue);
      act(() => {
        result.current.updateRandomizationSetting(key);
      });
      expect(result.current.randomizeSetting[key]).toBe(defaultValue);
    });

    it("should randomize a lane when the randomizeSettings.LANES is set to true", () => {
      Math.random = vi.fn().mockReturnValueOnce(0.6).mockReturnValueOnce(0.3);
      const { result } = renderHook(() => useHeroRandom(mockHeroes));
      const key = HERO_RANDOMIZE_SETTING.LANES.key;
      const skipKey = HERO_RANDOMIZE_SETTING.SKIPANIMATION.key;
      act(() => {
        result.current.updateRandomizationSetting(key);
        result.current.updateRandomizationSetting(skipKey);
      });
      expect(result.current.randomizeSetting[key]).toBe(true);
      act(() => {
        result.current.randomizeHero();
      });
      expect(result.current.randomHero).toBe("invoker");
      expect(result.current.randomizedLaneRef.current).toBe("Midlane");
    });
  });
});
