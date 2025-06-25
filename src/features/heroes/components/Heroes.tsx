import {
  HeroesConfigPanel,
  HeroesGrid,
  HeroesResult,
  useHeroManager,
  useHeroRandom,
} from "@/features/heroes";

import { useDeviceContext } from "@/hooks/device";

export function HeroesComponent() {
  const {
    heroes,
    heroAttribute,
    updateHeroAttribute,
    heroComplexity,
    updateHeroComplexity,
  } = useHeroManager();

  const {
    randomHero,
    isRandomizing,
    randomizedLaneRef,
    randomizeSetting,
    randomizeHero,
    updateRandomizationSetting,
  } = useHeroRandom(heroes);

  const { isMobile } = useDeviceContext();

  return (
    <>
      {isMobile ? (
        <HeroesResult
          randomHero={randomHero}
          isRandomizing={isRandomizing}
          randomizeHero={randomizeHero}
          randomizeSetting={randomizeSetting}
          randomizedLaneRef={randomizedLaneRef}
        />
      ) : null}

      <HeroesConfigPanel
        randomizeSetting={randomizeSetting}
        attribute={heroAttribute}
        updateAttribute={updateHeroAttribute}
        complexity={heroComplexity}
        updateComplexity={updateHeroComplexity}
        updateRandomizationSetting={updateRandomizationSetting}
      />
      <HeroesGrid heroes={heroes} />
    </>
  );
}
