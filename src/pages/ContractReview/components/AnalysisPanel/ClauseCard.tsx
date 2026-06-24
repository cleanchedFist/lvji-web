import {
  AlertCircle,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Info,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import AnalysisBaseCard from './AnalysisBaseCard';

type ReviewBasicsData = {
  type: string;
  description: string;
  detail?: string;
};
type ClauseData = {
  clauseName: string;
  riskLevel: string;
  original: string;
  reviewResult: string;
  reviewBasics: ReviewBasicsData[];
};

const getRiskStyles = (risk: string) => {
  switch (risk) {
    case '高风险':
      return {
        bg: 'bg-rose-50/75 border-rose-200',
        text: 'text-rose-700',
        badge: 'bg-rose-100 text-rose-800 border-rose-300',
        accent: 'border-l-rose-500',
        icon: <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />,
      };
    case '中风险':
      return {
        bg: 'bg-amber-50/75 border-amber-200',
        text: 'text-amber-700',
        badge: 'bg-amber-100 text-amber-800 border-amber-300',
        accent: 'border-l-amber-500',
        icon: <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />,
      };
    case '低风险':
    default:
      return {
        bg: 'bg-sky-50/75 border-sky-200',
        text: 'text-sky-700',
        badge: 'bg-sky-100 text-sky-800 border-sky-300',
        accent: 'border-l-sky-500',
        icon: <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0" />,
      };
  }
};

const ClauseItem = ({ clause }: { clause: ClauseData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const styles = useMemo(() => {
    return getRiskStyles(clause.riskLevel);
  }, [clause.riskLevel]);

  return (
    <div
      className={`bg-white rounded-2xl border-l-4 ${styles.accent} border-t border-r border-b border-slate-200/85 shadow-sm hover:shadow-md transition-shadow overflow-hidden mb-2`}
    >
      <div className="p-5 border-b border-slate-100/80 flex items-start justify-between gap-4">
        <h3 className="text-lg font-bold text-slate-900">{clause.clauseName}</h3>
        <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${styles.badge}`}>
          {clause.riskLevel}
        </span>
      </div>

      {/* 卡片内容区 */}
      <div className="p-5 space-y-4">
        {/* 审查结果：醒目突出 */}
        <div className={`p-4 rounded-xl border ${styles.bg} flex gap-3`}>
          {styles.icon}
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              审查意见
            </div>
            <p className="text-slate-700 text-sm leading-relaxed font-medium">
              {clause.reviewResult}
            </p>
          </div>
        </div>

        {/* 审查依据 (截图的核心特色 - 带有分类的警告牌样式) */}
        {clause.reviewBasics && clause.reviewBasics.length > 0 && (
          <div className="space-y-2.5">
            <div className="text-xs font-bold text-slate-400 tracking-wider flex items-center gap-1">
              <Info className="w-3.5 h-3.5" /> 审查依据与缺陷详情
            </div>
            <div className="space-y-2">
              {clause.reviewBasics.map((basic, bIdx) => (
                <div
                  key={bIdx}
                  className="bg-slate-50/60 rounded-xl p-3.5 border border-slate-100 space-y-2"
                >
                  <div className="flex items-start gap-2">
                    <span className="bg-slate-200/70 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded whitespace-nowrap">
                      {basic.type}
                    </span>
                    <span className="text-slate-600 text-xs font-medium">{basic.description}</span>
                  </div>
                  {basic.detail && (
                    <p className="text-slate-500 text-xs pl-2 border-l-2 border-slate-300">
                      {basic.detail}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 条款原文：支持伸缩折叠 */}
        <div className="pt-2 border-t border-slate-100/80">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between text-xs text-slate-400 hover:text-slate-600 transition-colors font-semibold"
          >
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>相关合同原文</span>
            </span>
            <div className="flex items-center gap-1">
              <span>{isExpanded ? '收起原文' : '查看完整原文'}</span>
              {isExpanded ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </div>
          </button>

          {isExpanded && (
            <div className="mt-3 bg-slate-50/70 border border-slate-200/50 p-3.5 rounded-xl">
              <pre className="text-xs text-slate-600 font-mono leading-relaxed whitespace-pre-wrap select-all">
                {clause.original}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ClauseCard = ({ data }: { data: ClauseData[] }) => {
  if (!data || !data.length) return <></>;
  return (
    <AnalysisBaseCard title="程序性条款审查">
      {data.map((i) => (
        <ClauseItem key={i.clauseName} clause={i} />
      ))}
    </AnalysisBaseCard>
  );
};
export default ClauseCard;
