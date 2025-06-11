import type { HeroTypes } from "@/types/heroes";

type HeroesGridProps = {
  heroData?: HeroTypes[] | undefined;
};

function HeroesGrid({ heroData }: HeroesGridProps) {
  return (
    <div>
      {heroData?.map((item) => (
        <p key={`hero-${item.id}`}>{item.name_loc}</p>
      ))}
    </div>
  );
}

export default HeroesGrid;
