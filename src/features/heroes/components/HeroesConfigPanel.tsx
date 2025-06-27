import { useState } from "react";
import { useDeviceContext } from "@/hooks/device";
import { useHeroContext } from "@/features/heroes";
import { ToggleButton, SliderCheckBox } from "@components/ui";
import { ConfigPanelSection } from "./ConfigPanelSection";
import { CaretUpIcon, CaretDownIcon } from "@phosphor-icons/react/dist/ssr";
import {
  COMPLEXITY_BUTTONS,
  ATTRIBUTE_BUTTONS,
  RANDOMIZE_SETTING_BUTTONS,
} from "@/constant";
import "@features/heroes/styles/HeroesConfigPanel.css";

export function HeroesConfigPanel() {
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
  const { isMobile } = useDeviceContext();
  const {
    heroAttribute,
    updateHeroAttribute,
    heroComplexity,
    updateHeroComplexity,
    updateRandomizationSetting,
    randomizeSetting,
  } = useHeroContext();

  return (
    <aside className="heroes-config-panel">
      {isMobile && (
        <ToggleButton
          className="config-toggle"
          onClick={() => setIsPanelOpen(!isPanelOpen)}
        >
          <i>{isPanelOpen ? <CaretDownIcon /> : <CaretUpIcon />}</i>
        </ToggleButton>
      )}
      <div className={isPanelOpen ? "config-panel visible" : "config-panel"}>
        <ConfigPanelSection
          className="settings-panel"
          label="Randomization Setting"
          data={RANDOMIZE_SETTING_BUTTONS}
          renderItem={(item) => (
            <SliderCheckBox
              key={`setting-button-${item.key}`}
              label={item.label}
              checked={randomizeSetting[item.key]}
              onChange={() => updateRandomizationSetting(item.key)}
            />
          )}
        />
        <ConfigPanelSection
          className="attr-panel"
          label="Attributes Filter"
          data={ATTRIBUTE_BUTTONS}
          renderItem={(item) => (
            <ToggleButton
              className={`attr-buttons attr-${item.value}`}
              activeClassName="attr-buttons-active"
              isActive={heroAttribute.has(item.value)}
              onClick={() => updateHeroAttribute(item.value)}
              key={`attr-button-${item.label}`}
            >
              <img src={`/images/attr/${item.value}.webp`} />
            </ToggleButton>
          )}
        />
        <ConfigPanelSection
          className="complexity-panel"
          label="Complexity Filter"
          data={COMPLEXITY_BUTTONS}
          renderItem={(item) => (
            <ToggleButton
              className="complexity-buttons"
              activeClassName="complexity-buttons-active"
              isActive={heroComplexity >= item.value}
              onClick={() => updateHeroComplexity(item.value)}
              key={`complexity-button-${item.label}`}
            >
              <img
                src="/images/diamond.webp"
                alt={`Complexity - ${item.label}`}
              />
            </ToggleButton>
          )}
        />
      </div>
    </aside>
  );
}
