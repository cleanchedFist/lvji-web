import React from 'react';
type CatalogeCardBtnProps = {
  onClick: (props?: any) => void;
  disabled?: boolean;
  children: React.ReactNode;
};
const CatalogeCardBtn = ({ onClick, disabled = false, children }: CatalogeCardBtnProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`flex-1 py-1.5 text-sm font-medium  ${
        disabled ? 'text-gray-400' : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
      } rounded transition-colors flex items-center justify-center gap-1`}
    >
      {children}
    </button>
  );
};

export default CatalogeCardBtn;
