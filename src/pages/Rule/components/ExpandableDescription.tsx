import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
const MAX_LENGTH = 80;
const ExpandableDescription = ({ description }: { description: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // 根据状态选择显示哪个图标
  const Icon = isExpanded ? ChevronUp : ChevronDown;

  if (description.length <= MAX_LENGTH) {
    return <p className="text-gray-800">{description}</p>;
  }

  const truncated = description.substring(0, MAX_LENGTH) + '...';
  const displayDescription = isExpanded ? description : truncated;

  return (
    // 使用 flex 容器来确保文字和图标在同一行且垂直对齐
    <div className="text-sm flex items-start">
      <p className={`inline text-gray-600 leading-relaxed ${isExpanded ? '' : 'pr-1'}`}>
        {displayDescription}
      </p>
      {/* 展开/收起按钮 - 替换为图标 */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-blue-600 hover:text-blue-800 focus:outline-none ml-1 p-0.5 rounded-md hover:bg-blue-50 transition duration-150 flex-shrink-0"
        aria-label={isExpanded ? 'Collapse description' : 'Expand description'}
      >
        <Icon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ExpandableDescription;
