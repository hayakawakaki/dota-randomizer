import { useContext } from "react";
import { HeroContext } from "./HeroContext";

export function useHeroContext() {
  const context = useContext(HeroContext);
  if (context === undefined) {
    throw new Error("useHeroContext must be used within a HeroProvider");
  }
  return context;
}
