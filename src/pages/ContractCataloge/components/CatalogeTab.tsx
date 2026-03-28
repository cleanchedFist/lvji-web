import { LayoutGrid, User } from 'lucide-react';

import React from 'react';
type CatalogeTabProps = {
  onChange: (id: number) => void;
  tabId: number;
  processingCount: number;
};

type BtnProps = {
  onClick: (props?: any) => void;
  active?: boolean;
  children: React.ReactNode;
};

const Btn = ({ active, onClick, children }: BtnProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`relative pb-4 text-sm font-medium border-b-2 focus:outline-none ${
        active
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent text-slate-500 hover:text-slate-700'
      } transition-colors flex items-center gap-2 `}
    >
      {children}
    </button>
  );
};
const CatalogeTab = ({ onChange, tabId, processingCount }: CatalogeTabProps) => {
  const handleClick = (id: number) => {
    onChange(id);
  };
  return (
    <div className="mb-1.5 border-b-1 border-slate-200 px-6 pt-4 flex gap-8">
      <Btn onClick={() => handleClick(0)} active={tabId === 0}>
        <User className="w-[18px] h-[18px]" />
        我的个人合同库
      </Btn>
      <Btn onClick={() => handleClick(1)} active={tabId === 1}>
        <LayoutGrid className="w-[18px] h-[18px]" />
        待办客户审查
        {/* 红色角标 (Badge) 设计 */}
        {processingCount > 0 && (
          <div className="absolute -top-0 -right-1 transform translate-x-2/3 -translate-y-2/3">
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white shadow-sm ring-2 ring-white">
              {processingCount > 99 ? '99+' : processingCount}
            </span>
          </div>
        )}
      </Btn>
    </div>
  );
};

export default CatalogeTab;
