export type RiskLevelType = 0 | 1 | 2;

export interface RiskInfo {
  name: string;
  className: string;
}

const riskMap: Record<RiskLevelType, RiskInfo> = {
  0: {
    name: '低风险',
    className: 'bg-emerald-100 text-emerald-600 border-emerald-200',
  },
  1: {
    name: '中风险',
    className: 'bg-amber-100 text-amber-600 border-amber-200',
  },
  2: {
    name: '高风险',
    className: 'bg-rose-100 text-rose-600 border-rose-200',
  },
};
const RiskLevel = ({ type }: { type: RiskLevelType }) => {
  return (
    <span
      className={`px-2 py-0.5 ml-1 rounded text-xs border shrink-0 font-medium ${riskMap[type]?.className}`}
    >
      {riskMap[type]?.name}
    </span>
  );
};

export default RiskLevel;
