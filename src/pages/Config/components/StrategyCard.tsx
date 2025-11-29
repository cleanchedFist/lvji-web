type StrategyCardProps = {
  name: string;
  description: string;
  id: string;
  onDelete: (id: string) => void;
  onSet: (id: string) => void;
};
const StrategyCard = ({ id, name, description, onDelete, onSet }: StrategyCardProps) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow relative group">
      <h3 className="font-bold text-slate-800 mb-3 text-lg">{name}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">{description}</p>
      <div className="absolute bottom-6 right-6 flex gap-3">
        <button
          type="button"
          className="px-3 py-1.5 text-xs font-medium text-rose-500 border border-rose-200 rounded hover:bg-rose-50 transition-colors"
          onClick={() => onDelete(id)}
        >
          删除策略
        </button>
        <button
          type="button"
          className="px-3 py-1.5 text-xs font-medium text-slate-600 border border-slate-200 rounded hover:bg-slate-50 transition-colors"
          onClick={() => onSet(id)}
        >
          配置策略
        </button>
      </div>
    </div>
  );
};

export default StrategyCard;
