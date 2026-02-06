import React from 'react';
type NormalBtnProps = {
  onClick: (props?: any) => void;
  disabled?: boolean;
  children: React.ReactNode;
};
const NormalBtn = ({ onClick, disabled = false, children }: NormalBtnProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-1.5 ml-2 ${
        disabled
          ? 'bg-gray-100 text-indigo-300 cursor-not-allowed'
          : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
      } rounded-lg text-sm font-semibold transition-colors`}
    >
      {children}
    </button>
  );
};

export default NormalBtn;
