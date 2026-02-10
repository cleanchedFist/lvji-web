import React from 'react';
type CatalogeCardBtnProps = {
  onClick: (props?: any) => void;
  disabled?: boolean;
  children: React.ReactNode;
  type?: string;
};

const btnTypes = ['default', 'primary'];
const btnClassMap = {
  default: {
    normal: 'px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded',
    disabled:
      'px-3 py-1.5 text-xs font-medium bg-[#F5F5F5] text-gray-400 cursor-not-allowed rounded shadow-sm',
  },
  primary: {
    normal:
      'px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded shadow-sm',
    disabled: 'px-3 py-1.5 text-xs font-medium text-white bg-indigo-400 cursor-not-allowed rounded',
  },
};
const CatalogeCardBtn = ({
  type = 'default',
  onClick,
  disabled = false,
  children,
}: CatalogeCardBtnProps) => {
  const _type = (btnTypes.includes(type) ? type : 'default') as keyof typeof btnClassMap;
  const btnClass = btnClassMap[_type];
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={disabled ? btnClass.disabled : btnClass.normal}
    >
      {children}
    </button>
  );
};

export default CatalogeCardBtn;
