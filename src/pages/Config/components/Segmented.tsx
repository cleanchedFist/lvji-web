import { useState } from 'react';
type OptionItem = {
  label: string;
  value: number;
};
type SegmentedProps = {
  options: OptionItem[];
  onChange: (value: number) => void;
  defaultValue: number;
};
const Segmented = ({ options, onChange, defaultValue }: SegmentedProps) => {
  const [value, setValue] = useState(defaultValue);
  const defaultBtnClass = 'px-4 py-1.5 rounded-md text-sm font-medium transition-all';
  const handleChange = (v: number) => {
    setValue(v);
    onChange(v);
  };
  return (
    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg inline-flex mb-6">
      {options.map((i) => (
        <button
          key={i.value}
          type="button"
          className={`${defaultBtnClass} ${
            value === i.value
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
          onClick={() => handleChange(i.value)}
        >
          {i.label}
        </button>
      ))}
    </div>
  );
};

export default Segmented;
