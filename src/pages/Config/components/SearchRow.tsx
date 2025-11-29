import { debounce } from 'lodash';
import { Plus } from 'lucide-react';
import React, { useCallback } from 'react';

type SearchRowProps = {
  onAdd: () => void;
  placeholder: string;
  btnText: string;
  onChange: (keyword: string) => void;
};
const SearchRow = ({ placeholder, btnText, onAdd, onChange }: SearchRowProps) => {
  const debounced = useCallback(debounce(onChange, 300), []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    debounced(e.target.value);
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none w-64 focus:ring-1 focus:ring-indigo-500"
      />
      <button
        type="button"
        onClick={onAdd}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors"
      >
        <Plus className="w-[16px] h-[16px]" />
        {btnText}
      </button>
    </div>
  );
};

export default SearchRow;
