import { useState, useRef, type RefObject, useCallback } from "react";
import { HERO_RANDOMIZE_SETTING, HERO_LANES } from "@/constant";
import type { HeroTypes } from "@/features/heroes";
import type {
  HeroRandomizeSetting,
  HeroRandomizeSettingKey,
  HeroLanes,
} from "@/features/heroes";

export type HeroRandomReturn = {
  randomHero: HeroTypes | null;
  isRandomizing: boolean;
  randomizedLaneRef: RefObject<string | null>;
  randomizeSetting: HeroRandomizeSetting;
  randomizeHero: () => void;
  updateRandomizationSetting: (targetSetting: HeroRandomizeSettingKey) => void;
};

export function setInitialRandomizeSettings() {
  return Object.fromEntries(
    Object.values(HERO_RANDOMIZE_SETTING).map(
      ({ key, default: defaultValue }) => [key, defaultValue]
    )
  ) as HeroRandomizeSetting;
}

export function useHeroRandom(heroes: HeroTypes[]): HeroRandomReturn {
  const [randomHero, setRandomHero] = useState<HeroTypes | null>(null);
  const [isRandomizing, setIsRandomizing] = useState<boolean>(false);
  const [randomizeSetting, setRandomizeSetting] =
    useState<HeroRandomizeSetting>(setInitialRandomizeSettings);
  const lastRandomizedHeroRef = useRef<number | null>(null);
  const randomizedLaneRef = useRef<HeroLanes | null>(null);

  function randomizeLane() {
    const lanes = Object.values(HERO_LANES);
    let idx = Math.floor(Math.random() * lanes.length);
    randomizedLaneRef.current = lanes[idx];
  }

  async function animateRandomization() {
    let heroIdx, laneIdx;
    const lanes = randomizeSetting.LANES ? Object.values(HERO_LANES) : null;

    for (let i = 0; i < 40; i++) {
      heroIdx = Math.floor(Math.random() * heroes.length);

      await new Promise((resolve) => {
        setTimeout(resolve, 10 + i * 5);
      });

      setRandomHero(heroes[heroIdx]);

      if (lanes) {
        laneIdx = Math.floor(Math.random() * lanes.length);
        randomizedLaneRef.current = lanes[laneIdx];
      }
    }
  }

  async function randomizeHero() {
    if (!heroes || heroes.length === 0 || isRandomizing === true) return;

    let idx = Math.floor(Math.random() * heroes.length);
    // Prevents same hero to be randomized
    while (heroes.length > 1 && lastRandomizedHeroRef.current === idx)
      idx = Math.floor(Math.random() * heroes.length);

    // Skip animation setting
    if (randomizeSetting.SKIPANIMATION === false) {
      setIsRandomizing(true);
      try {
        await animateRandomization();
      } finally {
        setIsRandomizing(false);
      }
    }

    // Set result
    lastRandomizedHeroRef.current = idx;
    setRandomHero(heroes[idx]);

    // Randomize lanes setting
    if (randomizeSetting.LANES === true) {
      randomizeLane();
    } else if (randomizeSetting.LANES === false && randomizedLaneRef.current) {
      // Reset to null when used then got disabled
      randomizedLaneRef.current = null;
    }
  }

  const updateRandomizationSetting = useCallback(
    (targetSetting: HeroRandomizeSettingKey) => {
      setRandomizeSetting((prev) => ({
        ...prev,
        [targetSetting]: !prev[targetSetting],
      }));
    },
    []
  );

  return {
    randomHero,
    isRandomizing,
    randomizedLaneRef,
    randomizeSetting,
    randomizeHero,
    updateRandomizationSetting,
  };
}
