import Layout from "@components/Layout";
import { useDevice } from "@hooks/useDevice";
import {
  HeroesConfigPanel,
  HeroesGrid,
  HeroesResult,
  useHeroManager,
  useHeroRandom,
} from "@/features/heroes";

function App() {
  const {
    filteredHeroes,
    loading,
    error,
    heroAttribute: attribute,
    updateHeroAttribute: updateAttribute,
    heroComplexity: complexity,
    updateHeroComplexity: updateComplexity,
  } = useHeroManager();

  const {
    randomHero,
    isRandomizing,
    randomizedLaneRef,
    randomizeSetting,
    randomizeHero,
    updateRandomizationSetting,
  } = useHeroRandom(filteredHeroes);

  const { isDeviceAtLeast } = useDevice();

  const isNonMobile = isDeviceAtLeast("LAPTOP");

  return (
    <Layout>
      {!isNonMobile && (
        <HeroesResult
          randomHero={randomHero}
          isRandomizing={isRandomizing}
          randomizeHero={randomizeHero}
          randomizeSetting={randomizeSetting}
          randomizedLaneRef={randomizedLaneRef}
        />
      )}
      <HeroesConfigPanel
        isNonMobile={isNonMobile}
        randomizeSetting={randomizeSetting}
        attribute={attribute}
        updateAttribute={updateAttribute}
        complexity={complexity}
        updateComplexity={updateComplexity}
        updateRandomizationSetting={updateRandomizationSetting}
      />
      <HeroesGrid heroData={filteredHeroes} loading={loading} error={error} />
    </Layout>
  );
}

export default App;
