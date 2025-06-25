import type { ReactNode } from "react";
import "@features/heroes/styles/HeroesConfigPanel.css";

type PanelProps<T> = {
  label: string;
  data: T[];
  renderItem: (item: T, index: number) => ReactNode;
};

export function Panel<T>({ label, data, renderItem }: PanelProps<T>) {
  return (
    <section className="panel">
      <p className="panel-label">{label}</p>
      <div className="panel-buttons settings-panel">
        {data.map((item, index) => renderItem(item, index))}
      </div>
    </section>
  );
}
