import type { ReactNode } from "react";
import "@features/heroes/styles/HeroesConfigPanel.css";

type PanelProps<T> = {
  className?: string;
  label: string;
  data: T[];
  renderItem: (item: T, index: number) => ReactNode;
};

export function ConfigPanelSection<T>({
  className,
  label,
  data,
  renderItem,
}: PanelProps<T>) {
  return (
    <section className="panel">
      <p className="panel-label">{label}</p>
      <div className={`panel-buttons ${className}`}>
        {data.map((item, index) => renderItem(item, index))}
      </div>
    </section>
  );
}
