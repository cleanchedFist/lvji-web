import RiskLevel, { RiskLevelType } from '@/components/RiskLevel';

export type rulesDetailItem = {
  createdSource: number;
  description: string;
  id: number;
  name: string;
  riskLevel: RiskLevelType;
};
type SelectedRuleListProps = {
  data: rulesDetailItem[];
};

const sourceMap = ['系统创建', '用户自定义'];
const SelectedRuleList = ({ data }: SelectedRuleListProps) => {
  return (
    <table className="w-full text-sm text-left">
      <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
        <tr>
          <th className="px-6 py-3">序号</th>
          <th className="px-6 py-3">规则名称</th>
          <th className="px-6 py-3">规则来源</th>
          <th className="px-6 py-3">风险等级</th>
          <th className="px-6 py-3 text-right">操作</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 bg-white">
        {data.map((i, k) => (
          <tr key={i.id} className="hover:bg-slate-50">
            <td className="px-6 py-4 text-slate-400">{k + 1}</td>
            <td className="px-6 py-4 font-medium text-slate-700">{i.name}</td>
            <td className="px-6 py-4 text-slate-500">{sourceMap[i.createdSource]}</td>
            <td className="px-6 py-4">
              <RiskLevel type={i.riskLevel} />
            </td>
            <td className="px-6 py-4 text-right">
              <button type="button" className="text-slate-400 hover:text-rose-500 font-medium">
                删除
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SelectedRuleList;
