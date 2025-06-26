import { HeroProvider } from "@/features/heroes";
import { HeroesResult, HeroesConfigPanel, HeroesGrid } from "@features/heroes";

export function HeroesComponent() {
  return (
    <HeroProvider>
      <HeroesConfigPanel />
      <HeroesGrid />
      <HeroesResult />
    </HeroProvider>
  );
}
