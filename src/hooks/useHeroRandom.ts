import { useState, useRef, type RefObject } from "react";
import { RANDOMIZE_SETTING, LANE_NAMES } from "@/constant";
import type { HeroTypes } from "@/types/heroes";
import type {
  RandomSetting,
  RandomSettingKey,
  RandomLanes,
} from "@/types/randomize";

type HeroRandomReturn = {
  randomHero: string | null;
  isRandomizing: boolean;
  randomizedLaneRef: RefObject<string | null>;
  randomizeSetting: RandomSetting;
  randomizeHero: () => void;
  updateRandomizationSetting: (targetSetting: RandomSettingKey) => void;
};

export function setInitialRandomizeSettings() {
  return Object.fromEntries(
    Object.values(RANDOMIZE_SETTING).map(({ key, default: defaultValue }) => [
      key,
      defaultValue,
    ])
  ) as RandomSetting;
}

export function useHeroRandom(heroes: HeroTypes[]): HeroRandomReturn {
  const [randomHero, setRandomHero] = useState<string | null>(null);
  const [isRandomizing, setIsRandomizing] = useState<boolean>(false);
  const [randomizeSetting, setRandomizeSetting] = useState<RandomSetting>(
    setInitialRandomizeSettings
  );
  const lastRandomizedHeroRef = useRef<number | null>(null);
  const randomizedLaneRef = useRef<RandomLanes | null>(null);

  function randomizeLane() {
    const lanes = Object.values(LANE_NAMES);
    let idx = Math.floor(Math.random() * lanes.length);
    randomizedLaneRef.current = lanes[idx];
  }

  async function animateRandomization() {
    let heroIdx;
    let laneIdx;
    const lanes = randomizeSetting.LANES ? Object.values(LANE_NAMES) : null;

    for (let i = 0; i < 40; i++) {
      heroIdx = Math.floor(Math.random() * heroes.length);

      await new Promise((resolve) => {
        setTimeout(resolve, 10 + i * 5);
      });

      setRandomHero(heroes[heroIdx].name);

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
    setRandomHero(heroes[idx].name);

    // Randomize lanes setting
    if (randomizeSetting.LANES === true) {
      randomizeLane();
    } else if (randomizeSetting.LANES === false && randomizedLaneRef.current) {
      // Reset to null when used then got disabled
      randomizedLaneRef.current = null;
    }
  }

  function updateRandomizationSetting(targetSetting: RandomSettingKey) {
    setRandomizeSetting((prev) => ({
      ...prev,
      [targetSetting]: !prev[targetSetting],
    }));
  }

  return {
    randomHero,
    isRandomizing,
    randomizedLaneRef,
    randomizeSetting,
    randomizeHero,
    updateRandomizationSetting,
  };
}
