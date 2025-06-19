import HeroesConfigPanel from "@components/HeroesConfigPanel";
import HeroesGrid from "@components/HeroesGrid";
import Layout from "@components/Layout";
import { useHeroManager } from "@hooks/useHeroManager";
import { useHeroRandom } from "@hooks/useHeroRandom";
import HeroesResult from "@components/HeroesResult";

function App() {
  const {
    filteredHeroes,
    loading,
    error,
    attribute,
    updateAttribute,
    complexity,
    updateComplexity,
  } = useHeroManager();

  const {
    randomHero,
    isRandomizing,
    randomizedLaneRef,
    randomizeSetting,
    randomizeHero,
    updateRandomizationSetting,
  } = useHeroRandom(filteredHeroes);

  return (
    <Layout>
      <HeroesResult
        randomHero={randomHero}
        isRandomizing={isRandomizing}
        randomizeHero={randomizeHero}
        randomizeSetting={randomizeSetting}
        randomizedLaneRef={randomizedLaneRef}
      />
      <HeroesConfigPanel
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
