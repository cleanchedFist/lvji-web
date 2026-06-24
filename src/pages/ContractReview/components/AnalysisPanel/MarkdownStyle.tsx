import { AlertTriangle, ClipboardCheck, Search, Target } from 'lucide-react';
import React from 'react';
// 基础颜色和主题：使用应用的灰色和靛蓝色调

export const components = {
  h1: ({ children }: React.ComponentPropsWithoutRef<'h1'>) => {
    // 根据标题内容映射图标
    const title = children?.toString() || '';
    // 风险提示特殊处理
    if (title.includes('风险提示') || !title) return null;

    let icon = <Target className="w-5 h-5 text-blue-600" />;

    if (title.includes('类型判断')) {
      icon = <Search className="w-5 h-5 text-indigo-600" />;
    } else if (title.includes('审查要点')) {
      icon = <ClipboardCheck className="w-5 h-5 text-blue-600" />;
    } else if (title.includes('风险提示')) {
      icon = <AlertTriangle className="w-5 h-5 text-red-600" />;
    }

    return (
      <div className="flex items-center gap-2 mb-2 mt-2">
        <div className="p-1.5 bg-white rounded shadow-sm border border-gray-100">{icon}</div>
        <h3 className="text-lg font-bold text-gray-800 flex items-center">{children}</h3>
      </div>
    );
  },
  ul: ({ children }: React.ComponentPropsWithoutRef<'ul'>) => (
    <div className="space-y-3">{children}</div>
  ),
  li: ({ children }: React.ComponentPropsWithoutRef<'li'>) => {
    const childrenArray = React.Children.toArray(children);
    const isBoldSplit =
      typeof childrenArray?.[0] === 'object' &&
      (childrenArray?.[0] as React.ReactElement)?.type === 'strong';

    // --- 🛠️ 修复逻辑开始 ---
    let detail = '';
    if (childrenArray?.[1]) {
      const nextNode = childrenArray[1];

      if (typeof nextNode === 'string') {
        // 情况 A：如果是标准的纯字符串，直接正则替换
        detail = nextNode.replace(/^[：:]/, '');
      } else if (typeof nextNode === 'object' && 'props' in nextNode) {
        // 情况 B：如果是一个被包裹的 React 元素（对象），安全地提取它内部的文本再替换
        const nodeChildren = (nextNode as React.ReactElement).props?.children;
        if (typeof nodeChildren === 'string') {
          detail = nodeChildren.replace(/^[：:]/, '');
        }
      }
    }
    // --- 🛠️ 修复逻辑结束 ---

    return (
      <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm transition-hover hover:border-blue-200 mt-1">
        <div className="mt-[0.52rem]">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
        </div>
        <div className="text-sm text-gray-700 leading-relaxed">
          {isBoldSplit ? (
            <div className="flex flex-col gap-1">
              <span className="font-bold text-gray-900 border-b border-gray-50 pb-1 mb-1">
                {childrenArray[0]}
              </span>
              <span className="text-gray-600">{detail}</span>
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    );
  },
};
