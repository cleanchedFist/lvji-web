import { AlertTriangle } from 'lucide-react';
import Markdown from 'react-markdown';
import AnalysisBaseCard from './AnalysisBaseCard';
import { components } from './MarkdownStyle';

const RiskCard = ({ data }: { data: string }) => {
  return (
    data && (
      <div className="mt-2 p-2 relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-red-100 to-amber-100 rounded-2xl blur opacity-30"></div>
        <div className="relative bg-white border-2 border-red-50 rounded-2xl p-6 flex gap-5 shadow-sm">
          <div className="flex-shrink-0">
            <div className="bg-red-500 p-3 rounded-xl shadow-lg shadow-red-200">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-black text-red-600 text-lg">合同标的风险提示</h4>
              <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold rounded uppercase">
                Critical
              </span>
            </div>
            <div className="text-gray-700 text-sm leading-relaxed">
              <Markdown>{data.replace('合同标的风险提示', '').trim()}</Markdown>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

const MainCard = ({ data }: { data: string[] }) => {
  return (
    data.length &&
    data.map((section, idx) => (
      <div
        key={idx}
        className="bg-gray-50/50 p-2 rounded-2xl border border-gray-100 relative overflow-hidden mb-2"
      >
        <Markdown components={components}>{`# ${section}`}</Markdown>
      </div>
    ))
  );
};

const ObjectCard = ({ data }: { data: string }) => {
  if (!data) return <></>;
  const sections = data.split('# ').filter((i) => i);
  const riskSection = sections.find((s) => s.startsWith('合同标的风险提示'));
  const mainSections = sections.filter((s) => s && !s.startsWith('合同标的风险提示'));
  return (
    <AnalysisBaseCard title="合同标的">
      <MainCard data={mainSections} />
      {riskSection && <RiskCard data={riskSection} />}
    </AnalysisBaseCard>
  );
};

export default ObjectCard;
