import { getLawyerList } from '@/services/ant-design-pro/api';
import { useRequest } from '@umijs/max';
import { Briefcase } from 'lucide-react';

const LawyerSelector = () => {
  const { data } = useRequest(getLawyerList);
  return (
    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 mb-3">
      <label className="block text-sm font-semibold text-blue-800 mb-2 flex items-center gap-2">
        <Briefcase className="w-[16px] h-[16px]" />
        指派审核律师
      </label>
      <select
        name="lawyerId"
        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white outline-none"
      >
        {data &&
          data.map((i) => (
            <option key={i.id} value={i.id}>
              {i.name}
            </option>
          ))}
      </select>
      <p className="text-xs text-blue-600 mt-2">* 该律师将在其“待办客户审核”列表中看到此合同。</p>
    </div>
  );
};

export default LawyerSelector;
