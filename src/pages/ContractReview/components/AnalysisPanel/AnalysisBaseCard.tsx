type AnalysisBaseCardProps = {
  children: React.ReactNode;
  title: string;
};
const AnalysisBaseCard = ({ children, title }: AnalysisBaseCardProps) => {
  return (
    <div className="w-full flex flex-col bg-white border-l border-gray-100 shadow-xl rounded-2xl p-6 mb-2">
      {/* 大纲内容区域 */}
      <div className="flex-1 overflow-y-auto -mr-4 pr-4 text-gray-700">
        <h2 className="text-2xl font-extrabold text-gray-900 border-b pb-2 mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
};
export default AnalysisBaseCard;
