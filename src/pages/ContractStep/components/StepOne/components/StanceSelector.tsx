import React from 'react';
import { allowedScale } from '../../../dataSchema';

// ------------------------------------
// 组件：立场选择按钮 (Stance Selector)
// ------------------------------------
type StanceSelectorProps = {
  selectedStance: string;
  setSelectedStance: React.Dispatch<string>;
};
const StanceSelector = ({ selectedStance, setSelectedStance }: StanceSelectorProps) => {
  const stances = [
    {
      label: allowedScale.Strong,
      description:
        '你代表贵方的谈判利益，对贵方利益做出最大的保护，可能导致审查结果相对激进，但能争取到较多有利条款。',
    },
    {
      label: allowedScale.Neutral,
      description:
        '你将基于行业标准和法律公平性进行审查，目标是平衡双方利益，确保合同条款公正合理，减少潜在风险。',
    },
    {
      label: allowedScale.Weak,
      description:
        '你代表对方的谈判利益，以降低交易阻力为主要目标，审查结果将倾向于接受大部分条款，仅对重大法律风险提出建议。',
    },
  ];

  const currentStance = stances.find((s) => s.label === selectedStance) || stances[0];

  return (
    <div className="space-y-4">
      {/* 1. 选项卡/切换按钮 */}
      <div className="flex w-full bg-gray-100 rounded-lg p-1">
        {stances.map((stance) => (
          <button
            type="button"
            key={stance.label}
            onClick={() => setSelectedStance(stance.label)}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
              selectedStance === stance.label
                ? 'bg-white text-indigo-600 shadow-md' // 选中状态：白色背景，主色调文字，带阴影
                : 'text-gray-600 hover:bg-gray-200' // 未选中状态：灰色背景，悬停变深
            }`}
          >
            {stance.label}
          </button>
        ))}
      </div>

      {/* 2. 描述文本 */}
      <div className="p-4 bg-indigo-50 border-l-4 border-indigo-300 rounded-r-lg text-sm text-gray-700">
        <p>{currentStance.description}</p>
        <p className="mt-2 text-xs text-indigo-600 font-medium">
          请根据你的实际利益调整，避免过度激进或保守。
        </p>
      </div>
    </div>
  );
};
export default StanceSelector;
