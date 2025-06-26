import { HeroProvider } from "@/features/heroes";
import { useDeviceContext } from "@/hooks/device";
import { HeroesResult, HeroesConfigPanel, HeroesGrid } from "@features/heroes";

export function HeroesComponent() {
  const { isMobile } = useDeviceContext();

  return (
    <HeroProvider>
      {isMobile && <HeroesResult />}
      <HeroesConfigPanel />
      <HeroesGrid />
    </HeroProvider>
  );
}
