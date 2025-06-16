type SliderCheckBoxProps = {
  label: string;
  checked: boolean;
  onChange: () => void;
};

function SliderCheckBox({ label, checked, onChange }: SliderCheckBoxProps) {
  return (
    <label>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span>{label}</span>
    </label>
  );
}

export default SliderCheckBox;
