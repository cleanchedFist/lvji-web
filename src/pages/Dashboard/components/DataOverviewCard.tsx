/**
 * @description: 概览数据卡片组件
 */
import React from 'react';

export type DataOverviewCardProps = {
  name: string;
  icon: React.ReactNode;
  bgClassName: string;
  fontClassName: string;
  value: string;
};

const DataOverviewCard: React.FC<{ data: DataOverviewCardProps }> = ({ data }) => {
  return (
    <div className="bg-white rounded-[24px] p-6  shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-50 transition-transform hover:scale-105 duration-300">
      <div className="flex justify-between items-start mb-6">
        <div
          className={`w-[60px] h-[60px] bg-opacity-10 ${data.bgClassName} rounded-[18px] flex items-center justify-center ${data.fontClassName}`}
        >
          {data.icon}
        </div>
      </div>
      {/* <!-- 文本标签 --> */}
      <div className="text-[#64748B] text-[15px] font-medium mb-2 tracking-wide">{data.name}</div>

      {/* <!-- 数字和底部箭头 --> */}
      <div className="flex items-end gap-2">
        <span className="text-[44px] font-bold text-[#1E293B] leading-none tracking-tight">
          {data.value}
        </span>
        <span className="text-[14px] text-[rgba(0,0,0,0.6)]">个</span>
      </div>
    </div>
  );
};

export default DataOverviewCard;
