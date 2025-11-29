type StrategyCardProps = {
  name: string;
  description?: string;
  id: string;
  createdSource: number;
  userId?: number;
  onDelete: (id: string) => void;
  onSet: (id: string) => void;
};

const baseBtnClassName = 'px-3 py-1.5 text-xs font-medium cursor-pointer';
const disabledBtnClassName =
  'text-slate-500 bg-slate-50 hover:bg-slate-100 rounded transition-colors disabled:cursor-not-allowed';
const normalBtnClassName =
  'text-slate-600 border border-slate-200 rounded hover:bg-slate-50 transition-colors';

const RuleCard = ({ id, name, createdSource, onDelete, onSet }: StrategyCardProps) => {
  const highLevel = createdSource === 0;

  return (
    <div className="relative bg-white border border-slate-200 rounded-xl p-5 hover:border-indigo-300 transition-colors flex flex-col justify-between h-32">
      <h3 className="font-bold text-slate-700">{name}</h3>
      <div className="absolute bottom-6 right-6 flex gap-3">
        {!highLevel && (
          <button
            type="button"
            onClick={() => onDelete(id)}
            className="px-3 py-1.5 text-xs font-medium text-rose-500 border border-rose-200 rounded hover:bg-rose-50 transition-colors"
          >
            删除规则
          </button>
        )}
        <button
          type="button"
          onClick={() => onSet(id)}
          disabled={highLevel}
          className={`${baseBtnClassName} ${highLevel ? disabledBtnClassName : normalBtnClassName}`}
        >
          配置规则
        </button>
      </div>
    </div>
  );
};

export default RuleCard;
