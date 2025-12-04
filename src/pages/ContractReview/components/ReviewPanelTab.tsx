type ReviewPanelTabProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};
const ReviewPanelTab = ({ activeTab, onTabChange }: ReviewPanelTabProps) => {
  const tabs = ['全部', '高风险', '合同标的', '合同条款', '文字符号', '自定义策略'];

  return (
    <div className="flex border-b border-gray-200 mb-6 -mx-6 px-6 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          type="button"
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`flex-shrink-0 pb-3 px-3 text-sm font-medium transition-colors duration-150 relative ${
            activeTab === tab ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {tab}
          {activeTab === tab && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-t-lg"></span>
          )}
        </button>
      ))}
    </div>
  );
};
export default ReviewPanelTab;
