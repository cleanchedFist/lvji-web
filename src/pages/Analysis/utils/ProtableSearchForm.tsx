import useFormStyle from './useFormStyle';
const ProtableSearchForm = (props: { defaultDom: JSX.Element }) => {
  const { defaultDom } = props;
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
};
export default ProtableSearchForm;
