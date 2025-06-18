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

  function randomizeHero() {
    if (!heroes || heroes.length === 0) return;

    let idx = Math.floor(Math.random() * heroes.length);

    // Prevents same hero to be randomized
    while (heroes.length > 1 && lastRandomizedHeroRef.current === idx)
      idx = Math.floor(Math.random() * heroes.length);

    lastRandomizedHeroRef.current = idx;
    setRandomHero(heroes[idx].name);

    if (randomizeSetting.LANES === true) {
      randomizeLane();
    } else if (randomizeSetting.LANES === false && randomizedLaneRef.current) {
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
    randomizedLaneRef,
    randomizeSetting,
    randomizeHero,
    updateRandomizationSetting,
  };
}
