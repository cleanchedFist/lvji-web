import { Info } from 'lucide-react';
import AnalysisBaseCard from './AnalysisBaseCard';

type responsibilitie = {
  condition: string;
  consequence: string;
  detail: string;
  original: string;
};

type ViolateItemData = {
  party: string;
  responsibilities: responsibilitie[];
};
type ViolateCardData = {
  contractee: ViolateItemData;
  contractor: ViolateItemData;
};

const ViolateItem = ({ party, data }: { data: responsibilitie[]; party: string }) => {
  return data.map((item, idx) => (
    <div
      key={idx}
      className="bg-white mb-2 border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-all hover:-translate-y-0.5 group"
    >
      {/* 顶部状态条 */}
      <div className="h-1.5 w-full bg-orange-400"></div>

      <div className="p-5 md:p-6 flex-1 flex flex-col">
        <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
          {party}
        </div>
        <h4 className="text-base md:text-lg font-bold text-slate-800 mb-4 leading-snug">
          {item.condition}
        </h4>

        <div className="mt-auto space-y-3 pt-4 border-t border-slate-100">
          <div
            className={`flex items-start gap-3 px-3 py-2.5 rounded-lg text-sm bg-orange-50/80 text-orange-900 border border-orange-100`}
          >
            <div className={`w-1 h-4 rounded-full mt-0.5 bg-orange-500`}></div>
            <span className="font-medium">{item.consequence}</span>
          </div>

          <div className={`text-xs px-2 flex items-start gap-1.5 text-slate-500`}>
            <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 opacity-70" />
            <span className="leading-relaxed">{item.detail || '具体违约责任约定留空'}</span>
          </div>
        </div>
      </div>
    </div>
  ));
};

const ViolateCard = ({ data }: { data: ViolateCardData }) => {
  return (
    <AnalysisBaseCard title="违约责任">
      {data ? (
        <>
          <ViolateItem party="甲方" data={data.contractee?.responsibilities || []}></ViolateItem>
          <ViolateItem party="乙方" data={data.contractor?.responsibilities || []}></ViolateItem>
        </>
      ) : (
        '无内容'
      )}
    </AnalysisBaseCard>
  );
};
export default ViolateCard;
