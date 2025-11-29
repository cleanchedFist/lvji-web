import { useState } from 'react';
import ReviewComponentCard, { FormData, RuleItem } from './ReviewComponentCard';

type StepTwoProps = {
  onBack: () => void;
  onOk: (data: FormData) => void;
};
const StepTwo = ({ onBack, onOk }: StepTwoProps) => {
  const ruleList: RuleItem[] = [
    {
      key: 'objectRule',
      checked: true,
      label: '标的审查',
      description: '系统分析合同标的类型及标的详情，智能分析标的条款可能存在的风险并进行审查修改。',
    },
    {
      key: 'purposeRule',
      checked: true,
      label: '目的审查',
      description:
        '系统基于审查立场分析其通过合同希望实现的目的以及对应需要满足的条件，进一步分析合同中对应的权利义务条款是否存在风险并进行审查修改。',
    },
    {
      key: 'violateRule',
      checked: true,
      label: '违约责任',
      description:
        '分析我方及相对方在合同中的义务及对应的违约责任条款安排，并判断相关条款安排是否存在风险。',
    },
    {
      key: 'clauseRule',
      checked: true,
      label: '程序性条款审查',
      description:
        '判断合同中是否包含鉴于、免责、通知与送达、争议解决、保密、效力、附件、签署等程序性条款，并分析是否存在风险。',
    },
    {
      key: 'dealNodesRule',
      checked: true,
      label: '交易节点规则',
      description: '交易节点规则审查。',
    },
  ];
  const [config, setConfig] = useState(ruleList);

  const toggleComponent = (key: string) => {
    setConfig(
      config.map((item) => ({
        ...item,
        checked: item.key === key ? !item.checked : item.checked,
      })),
    );
  };

  const handleConfirm = () => {
    const data = config
      .filter((item) => item.checked)
      .reduce((pre, cur) => {
        pre[cur.key] = true;
        return pre;
      }, {} as FormData);
    onOk(data);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center mb-2">
          <span className="text-indigo-600 text-xl mr-2">•</span> 选择合同审阅组件
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          系统将根据审查清单中的具体审查要求及参考资料审查合同。
        </p>

        {/* 组件卡片网格布局 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {config.map((comp) => (
            <ReviewComponentCard
              key={comp.key}
              rule={comp}
              isSelected={comp.checked}
              onToggle={toggleComponent}
            />
          ))}
        </div>
      </div>

      {/* 底部操作按钮 */}
      <div className="flex justify-center pt-4 space-x-4">
        <button
          type="button"
          onClick={onBack}
          className="px-8 py-3 bg-white text-gray-700 border border-gray-300 rounded-md text-base font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out shadow-sm"
        >
          返回上一步
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          // 主色调按钮
          className="px-10 py-3 bg-indigo-600 text-white rounded-md text-base font-medium hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-150 ease-in-out shadow-lg"
        >
          确定
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
