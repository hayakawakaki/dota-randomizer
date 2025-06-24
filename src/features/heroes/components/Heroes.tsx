import {
  HeroesConfigPanel,
  HeroesGrid,
  HeroesResult,
  useHeroManager,
  useHeroRandom,
} from "@/features/heroes";

type HeroesComponentProps = {
  isMobile: boolean;
};

export function HeroesComponent({ isMobile }: HeroesComponentProps) {
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
        isMobile={isMobile}
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
