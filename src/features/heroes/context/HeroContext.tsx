import { createContext, useContext, type ReactNode } from "react";
import {
  useHeroManager,
  useHeroRandom,
  type HeroManagerReturn,
  type HeroRandomReturn,
} from "@features/heroes";

type HeroContextType = HeroManagerReturn & HeroRandomReturn;
const HeroContext = createContext<HeroContextType | undefined>(undefined);

type HeroProviderProps = {
  children: ReactNode;
};

export function HeroProvider({ children }: HeroProviderProps) {
  const heroData = useHeroManager();
  const randomData = useHeroRandom(heroData.heroes);

  const providerValue = { ...heroData, ...randomData };

  console.log("HeroProvider rendering");

  return <HeroContext value={providerValue}>{children}</HeroContext>;
}

export function useHeroContext() {
  const context = useContext(HeroContext);
  if (context === undefined) {
    throw new Error("useHeroContext must be used within a HeroProvider");
  }
  return context;
}
