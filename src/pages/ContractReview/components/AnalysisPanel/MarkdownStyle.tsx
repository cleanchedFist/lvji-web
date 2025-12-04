import { Components } from 'react-markdown';
// 基础颜色和主题：使用应用的灰色和靛蓝色调
const BASE_TEXT = 'text-gray-800';
const BG_ACCENT = 'bg-indigo-50';
const BORDER_ACCENT = 'border-indigo-300';
const CODE_BG = 'bg-gray-100';

export const components: Components = {
  // --- 容器/基本元素 ---

  // 段落
  p: ({ node: _node, ...props }) => (
    <p className={`mb-4 text-sm leading-relaxed ${BASE_TEXT}`} {...props} />
  ),

  // --- 标题 ---

  h1: ({ node: _node, ...props }) => (
    <h1 className={`text-xl text-center font-extrabold mt-8 mb-2 pb-0 ${BASE_TEXT}`} {...props} />
  ),

  h2: ({ node: _node, ...props }) => (
    <h2
      className={`text-lg font-bold mt-6 mb-3 pt-4 border-b-2 border-gray-100 ${BASE_TEXT}`}
      {...props}
    />
  ),

  h3: ({ node: _node, ...props }) => <h3 className={`text-base font-bold mt-5 mb-2 `} {...props} />,

  h4: ({ node: _node, ...props }) => (
    <h4 className={`text-sm font-semibold mt-4 mb-1 ${BASE_TEXT}`} {...props} />
  ),

  // --- 列表 ---

  // 无序列表
  ul: ({ node: _node, ...props }) => (
    <ul className={`list-disc text-sm list-inside ml-6 space-y-1 ${BASE_TEXT}`} {...props} />
  ),

  // 有序列表
  ol: ({ node: _node, ...props }) => (
    <ol className={`list-decimal text-sm list-inside ml-6 space-y-1 ${BASE_TEXT}`} {...props} />
  ),

  // 列表项
  li: ({ node: _node, ...props }) => <li className="pl-1 text-sm" {...props} />,

  // --- 引用/强调 ---

  // 块引用 (模仿报告中的信息块样式)
  blockquote: ({ node: _node, ...props }) => (
    <blockquote
      className={`border-l-4 ${BORDER_ACCENT} ${BG_ACCENT} p-4 my-6 italic rounded-r-lg ${BASE_TEXT}`}
      {...props}
    />
  ),

  // 链接
  a: ({ node: _node, ...props }) => (
    <a
      className={`$ hover:text-indigo-800 transition-colors font-medium underline-offset-4`}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),

  // --- 代码 ---

  // 行内代码
  code: ({ node: _node, ...props }) => {
    //   return (
    //     <code
    //       className={`px-1 py-0.5 rounded-md text-sm font-mono ${CODE_BG}`}
    //       {...props}
    //     />
    //   );
    // 代码块 (pre)
    return (
      <pre
        className={`p-4 my-4 rounded-xl overflow-x-auto ${CODE_BG} border border-gray-200 shadow-inner`}
      >
        <code className="text-sm font-mono text-gray-700" {...props} />
      </pre>
    );
  },

  // --- 表格 ---

  table: ({ node: _node, ...props }) => (
    <div className="overflow-x-auto my-6">
      <table
        className="w-full text-sm text-left border-collapse border border-gray-200 rounded-lg overflow-hidden"
        {...props}
      />
    </div>
  ),

  thead: ({ node: _node, ...props }) => (
    <thead className={`text-sm uppercase ${BG_ACCENT} border-b ${BORDER_ACCENT}`} {...props} />
  ),

  th: ({ node: _node, ...props }) => (
    <th scope="col" className="px-6 py-3 font-semibold tracking-wider" {...props} />
  ),

  tbody: ({ node: _node, ...props }) => <tbody className="divide-y divide-gray-100" {...props} />,

  tr: ({ node: _node, ...props }) => (
    <tr className="bg-white hover:bg-gray-50 transition-colors" {...props} />
  ),

  td: ({ node: _node, ...props }) => <td className="px-6 py-4" {...props} />,

  // --- 分隔线 ---

  hr: ({ node: _node, ...props }) => (
    <hr className={`my-8 border-t-2 border-gray-200`} {...props} />
  ),
};
