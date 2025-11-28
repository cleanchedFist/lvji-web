import './pagination.css';
import columns from './tableColumn';
import useFormStyle from './useFormStyle';
import useTableStyle from './useTableStyle';

const ProtableConfig = {
  columns,
  pagination: {
    showSizeChanger: false,
    showTotal: () => null,
    rootClassName: 'justify-center custom-pagination',
    itemRender: (current: any, type: string, originalElement: React.ReactNode) => {
      if (type === 'prev') {
        return (
          <button
            type="button"
            className="px-3 py-1 mx-1 text-sm rounded-md transition duration-150 bg-gray-100 hover:bg-gray-200"
          >
            上一页
          </button>
        );
      }
      if (type === 'next') {
        return (
          <button
            type="button"
            className="px-3 py-1 mx-1 text-sm rounded-md transition duration-150 bg-gray-100 hover:bg-gray-200"
          >
            下一页
          </button>
        );
      }
      if (type === 'page') {
        return (
          <button
            type="button"
            className="px-3 py-1 mx-1 text-sm rounded-md transition duration-150 font-semibold bg-white hover:bg-blue-50 text-gray-700"
          >
            {current}
          </button>
        );
      }
      return originalElement;
    },
  },
  tableRender: (props: any, dom: JSX.Element) => {
    // eslint-disable-next-line
    const { styles } = useTableStyle();
    return <div className={styles.wrapper}>{dom}</div>;
  },
  searchFormRender: (props: any, defaultDom: JSX.Element) => {
    // eslint-disable-next-line
    const { styles } = useFormStyle();
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-4">
        <h2 className="text-lg font-bold text-slate-800 mb-2">合同分析</h2>
        <p className="text-slate-500 text-sm mb-6">
          在这里查看您的合同分析审查结果，可查看分析结果、合同评分、导出审查报告。
        </p>
        <div className={`flex gap-4 ${styles.wrapper}`}>{defaultDom}</div>
      </div>
    );
  },
};

export default ProtableConfig;
