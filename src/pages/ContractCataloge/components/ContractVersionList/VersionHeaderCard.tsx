import { Clock4, FileText, Target, User } from 'lucide-react';
import formatTime from '../../utils/formatTime';

type VersionHeaderCardProps = {
  data: API.ContractListItem;
};
const VersionHeaderCard = ({ data }: VersionHeaderCardProps) => {
  const { type, name, createTimeStamp, parta, partb, chooseParty, demand } = data;
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 space-y-6 mb-1">
      {/* Main Title Area */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">{name}</h2>
          <div className="flex gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <FileText className="w-[14px] h-[14px]" />
              合同类型: {type}
            </span>
            <span className="flex items-center gap-1">
              <Clock4 className="w-[14px] h-[14px]" />
              创建日期: {formatTime(createTimeStamp)}
            </span>
          </div>
        </div>
      </div>

      {/* New: Information Section (Unified Card) */}

      {/* Parties and Stance row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            合同主体 - 甲方
          </label>
          <div className="text-slate-800 font-medium">{parta || '-'}</div>
        </div>
        <div className="space-y-1.5 border-l md:border-l-0 md:pl-0 pl-0 border-slate-200">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            合同主体 - 乙方
          </label>
          <div className="text-slate-800 font-medium">{partb || '-'}</div>
        </div>
        {chooseParty && (
          <div className="space-y-1.5 md:border-l border-slate-200 md:pl-6">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              用户立场
            </label>
            <div className="inline-flex items-center px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold border border-indigo-100">
              <User size={12} className="mr-1" />
              {chooseParty}
            </div>
          </div>
        )}
      </div>

      {/* User Requirements - Highlighted Area */}
      {demand && (
        <div className="pt-6 border-t border-slate-200/60">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-2">
            <Target size={14} className="text-indigo-500" />
            用户需求描述
          </label>
          <div className="bg-white/80 p-4 rounded-xl border border-slate-100 text-sm text-slate-600 leading-relaxed shadow-sm">
            {demand}
          </div>
        </div>
      )}
    </div>
  );
};
export default VersionHeaderCard;
