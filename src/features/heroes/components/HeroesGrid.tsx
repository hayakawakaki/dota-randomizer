import Loading from "@components/Loading";
import type { HeroTypes } from "@/features/heroes/types/heroes.types";
import "@features/heroes/styles/HeroesGrid.css";

type HeroesGridProps = {
  heroData: HeroTypes[];
  loading: boolean;
  error: string | null;
};

export function HeroesGrid({ heroData, loading, error }: HeroesGridProps) {
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
