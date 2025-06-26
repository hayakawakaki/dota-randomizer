export type SliderCheckBoxProps = {
  label: string;
  checked: boolean;
  onChange: () => void;
  className?: string;
};

export function SliderCheckBox({
  label,
  checked,
  onChange,
  className,
}: SliderCheckBoxProps) {
  return (
    <label className={className}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span>{label}</span>
    </label>
  );
}
