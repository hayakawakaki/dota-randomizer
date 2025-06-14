import HeroesConfigPanel from "@/components/HeroesConfigPanel";
import HeroesGrid from "@components/HeroesGrid";
import Layout from "@components/Layout";
import { useHeroManager } from "@/hooks/useHeroManager";
import { useHeroRandom } from "@/hooks/useHeroRandom";
import HeroesResult from "@/components/HeroesResult";

function App() {
  const { filteredHeroes, loading, error, updateAttribute, updateComplexity } =
    useHeroManager();

  const {
    randomHero,
    randomizedLaneRef,
    randomizeSetting,
    randomizeHero,
    updateRandomizationSetting,
  } = useHeroRandom(filteredHeroes);

  return (
    <Layout>
      <HeroesResult
        randomHero={randomHero}
        randomizeHero={randomizeHero}
        randomizedLaneRef={randomizedLaneRef}
      />
      <HeroesConfigPanel
        randomizeSetting={randomizeSetting}
        updateAttribute={updateAttribute}
        updateComplexity={updateComplexity}
        updateRandomizationSetting={updateRandomizationSetting}
      />
      <HeroesGrid heroData={filteredHeroes} loading={loading} error={error} />
    </Layout>
  );
}

export default App;
