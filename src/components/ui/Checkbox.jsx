import { Check } from "lucide-react";

export default function Checkbox({
  checked,
  onChange,
  label,
}) {
  return (
    <button
      type="button"
      className={`checkbox ${
        checked ? "checkbox--checked" : ""
      }`}
      onClick={onChange}
      aria-pressed={checked}
      aria-label={label}
    >
      {checked && <Check size={15} strokeWidth={3} />}
    </button>
  );
}