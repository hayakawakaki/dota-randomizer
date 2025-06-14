import HeroesFilter from "@components/HeroesFilter";
import HeroesGrid from "@components/HeroesGrid";
import Layout from "@components/Layout";
import { useHeroManager } from "@/hooks/useHeroManager";

function App() {
  const {
    filteredHeroes,
    loading,
    error,
    randomHero,
    randomizeHero,
    updateAttribute,
    updateComplexity,
  } = useHeroManager();

  return (
    <Layout>
      <div>
        <button onClick={randomizeHero}>Randomize Hero</button>
        <p>{randomHero}</p>
      </div>
      <HeroesFilter
        updateAttribute={updateAttribute}
        updateComplexity={updateComplexity}
      />
      <HeroesGrid heroData={filteredHeroes} loading={loading} error={error} />
    </Layout>
  );
}

export default App;
