import { Package } from 'lucide-react';
import AnalysisBaseCard from './AnalysisBaseCard';
type PurposeCardData = {
  conditions: string[];
  objective: string;
};

const PurposeItem = ({ data }: { data: PurposeCardData }) => {
  return (
    <div className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden mb-2">
      <div className="p-4 flex items-start gap-4">
        <div className="mt-1">
          <i data-lucide="chevron-down" className="w-5 h-5 text-gray-400"></i>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-gray-800 text-base">{data.objective}</h3>
          </div>

          <div className="space-y-3">
            {data.conditions?.map((i, k) => (
              <div
                key={k}
                className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-100"
              >
                <Package className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-700">{i}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PurposeCard = ({ data }: { data: PurposeCardData[] }) => {
  return (
    <AnalysisBaseCard title="合同目的">
      {data?.map((i, k) => (
        <PurposeItem data={i} key={k} />
      ))}
    </AnalysisBaseCard>
  );
};
export default PurposeCard;
