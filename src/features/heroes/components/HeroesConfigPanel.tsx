import { useState } from "react";
import { useDeviceContext } from "@/hooks/device";
import { ToggleButton, SliderCheckBox } from "@components/ui";
import { Panel } from "./Panel";
import { CaretUpIcon, CaretDownIcon } from "@phosphor-icons/react/dist/ssr";

import {
  COMPLEXITY_BUTTONS,
  ATTRIBUTE_BUTTONS,
  RANDOMIZE_SETTING_BUTTONS,
} from "@/constant";

import type {
  HeroComplexity,
  HeroAttribute,
  HeroRandomizeSetting,
  HeroRandomizeSettingKey,
} from "@features/heroes";

import "@features/heroes/styles/HeroesConfigPanel.css";

type HeroesFilterProps = {
  attribute: Set<HeroAttribute>;
  updateAttribute: (value: HeroAttribute) => void;
  complexity: HeroComplexity;
  updateComplexity: (value: HeroComplexity) => void;
  updateRandomizationSetting: (value: HeroRandomizeSettingKey) => void;
  randomizeSetting: HeroRandomizeSetting;
};

export function HeroesConfigPanel({
  attribute,
  updateAttribute,
  complexity,
  updateComplexity,
  updateRandomizationSetting,
  randomizeSetting,
}: HeroesFilterProps) {
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
  const { isMobile } = useDeviceContext();

  return (
    <div className="heroes-config-panel">
      {isMobile && (
        <ToggleButton
          className="config-toggle"
          onClick={() => setIsPanelOpen(!isPanelOpen)}
        >
          <i>{isPanelOpen ? <CaretDownIcon /> : <CaretUpIcon />}</i>
        </ToggleButton>
      )}
      <aside className={isPanelOpen ? "config-panel visible" : "config-panel"}>
        <Panel
          label="Randomization Setting"
          data={RANDOMIZE_SETTING_BUTTONS}
          renderItem={(item) => (
            <SliderCheckBox
              className="setting-buttons"
              key={`setting-button-${item.key}`}
              label={item.label}
              checked={randomizeSetting[item.key]}
              onChange={() => updateRandomizationSetting(item.key)}
            />
          )}
        />
        <Panel
          label="Attributes Filter"
          data={ATTRIBUTE_BUTTONS}
          renderItem={(item) => (
            <ToggleButton
              className={`attr-buttons attr-${item.value}`}
              activeClassName="attr-buttons-active"
              isActive={attribute.has(item.value)}
              onClick={() => updateAttribute(item.value)}
              key={`attr-button-${item.label}`}
            >
              <img src={`/images/attr/${item.image}`} />
            </ToggleButton>
          )}
        />
        <Panel
          label="Complexity Filter"
          data={COMPLEXITY_BUTTONS}
          renderItem={(item) => (
            <ToggleButton
              className="complexity-buttons"
              activeClassName="complexity-buttons-active"
              isActive={complexity >= item.value}
              onClick={() => updateComplexity(item.value)}
              key={`complexity-button-${item.label}`}
            >
              <img
                src="/images/diamond.webp"
                alt={`Complexity - ${item.label}`}
              />
            </ToggleButton>
          )}
        />
        {!isMobile && <button style={{ flexGrow: "3" }}>Randomize</button>}
      </aside>
    </div>
  );
}
