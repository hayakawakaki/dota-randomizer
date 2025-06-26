import "./styles/SliderCheckBox.css";

export type SliderCheckBoxProps = {
  label: string;
  checked: boolean;
  onChange: () => void;
};

export function SliderCheckBox({
  label,
  checked,
  onChange,
}: SliderCheckBoxProps) {
  return (
    <>
      <label className="switch">
        <span className="switch-label">{label}</span>
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="slider" />
      </label>
    </>
  );
}
