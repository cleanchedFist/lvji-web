import { useState } from 'react';
const MAX_LENGTH = 40;
const ExpandableText = ({ text: displayableText }: { text: string }) => {
  // 状态用于控制文本是否已展开
  const [isExpanded, setIsExpanded] = useState(false);

  // 限制显示的字符数

  // 示例文本，确保它足够长以触发截断效果

  // 检查是否需要截断 (即文本长度是否超过最大字符数)
  const needsTruncation = displayableText.length > MAX_LENGTH;

  // 根据展开状态和是否需要截断来决定最终显示的文本内容
  const displayText = isExpanded
    ? displayableText // 展开时显示全部内容
    : needsTruncation
    ? `${displayableText.substring(0, MAX_LENGTH)}...` // 收起且需要截断时，显示前60个字符加省略号
    : displayableText; // 不需要截断时，显示全部内容

  // 按钮文本
  const buttonText = isExpanded ? '收起' : '展开';

  // 样式类集合
  // 字体颜色为浅灰色 (text-gray-600)
  const baseClasses = 'text-[#86909c] leading-relaxed transition-all duration-300';

  // 文本内容类，不需要 line-clamp，因为我们用 JS 进行了字符截断
  const contentClasses = baseClasses;

  // 切换展开/收起状态的函数
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col">
      {/* 文本内容区域 */}
      <p className={`${contentClasses} inline flex-grow`}>{displayText}</p>

      {/* 展开/收起链接：只有当文本长度超过 MAX_LENGTH 时才显示链接 */}
      {needsTruncation && (
        <div>
          <span
            onClick={toggleExpanded}
            className="inline-block text-blue-600 font-medium ml-2 flex-shrink-0 whitespace-nowrap hover:text-blue-700 cursor-pointer"
            title={buttonText}
          >
            {buttonText}
          </span>
        </div>
      )}
    </div>
  );
};

export default ExpandableText;
