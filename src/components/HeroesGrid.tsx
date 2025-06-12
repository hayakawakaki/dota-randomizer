import Loading from "@components/Loading";
import type { HeroTypes } from "@/types/heroes";

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
    <div>
      {heroData.map((item) => (
        <p key={`hero-${item.id}`}>{item.name_loc}</p>
      ))}
    </div>
  );
}

export default HeroesGrid;
