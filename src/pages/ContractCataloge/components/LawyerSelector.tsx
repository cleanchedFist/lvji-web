import { getLawyerList } from '@/services/ant-design-pro/api';
import { useRequest } from '@umijs/max';
import { Briefcase } from 'lucide-react';
import { useEffect } from 'react';

type LaywerInfo = {
  userId: number;
  username: string;
};

const LawyerSelector = ({ onChange }: { onChange: (id: number) => void }) => {
  const { data } = useRequest(getLawyerList);
  useEffect(() => {
    onChange(data?.[0]?.userId);
  }, [data]);
  return (
    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 mb-3">
      <label className="block text-sm font-semibold text-blue-800 mb-2 flex items-center gap-2">
        <Briefcase className="w-[16px] h-[16px]" />
        指派审核律师
      </label>
      <select
        name="lawyerId"
        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white outline-none"
        onChange={(e) => onChange(+e.target.value)}
      >
        {data &&
          data.map((i: LaywerInfo) => (
            <option key={i.userId} value={i.userId}>
              {i.username}
            </option>
          ))}
      </select>
      <p className="text-xs text-blue-600 mt-2">* 该律师将在其“待办客户审查”列表中看到此合同。</p>
    </div>
  );
};

export default LawyerSelector;
