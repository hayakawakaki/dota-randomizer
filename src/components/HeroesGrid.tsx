import Loading from "@components/Loading";
import type { HeroTypes } from "@/types/heroes";
import "@css/components/heroes/grid.css";

type HeroesGridProps = {
  heroData: HeroTypes[];
  loading: boolean;
  error: string | null;
};

function HeroesGrid({ heroData, loading, error }: HeroesGridProps) {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error : {error}</div>;
  }

  return (
    <div className="heroes-container">
      <div className="heroes-grid">
        {heroData.map((item) => (
          <img
            key={`hero-${item.id}`}
            src={`/images/heroes/${item.name}.webp`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroesGrid;
