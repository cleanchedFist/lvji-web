import { strategyList } from '@/services/ant-design-pro/api';
import { history, useRequest } from '@umijs/max';
import { Plus } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { transformToKey, transformToValue } from '../utils/StepOneMap';
import CustomSelect from './CustomSelect';
import StanceSelector from './StanceSelector';
export type FormData = {
  // key值
  reviewStance?: string | null; // step1
  scale?: string; // step1
  strategyId?: number; // step1
  reviewer?: string;
};

type StepOneProps = {
  formData: FormData;
  data: {
    reviewResultNewId: number;
    partyA: string;
    partyB: string;
    contractType: string;
  };
  onOk: (data: FormData) => void;
};

// 需要有一个data 到 form 的映射关系，可以不用映射，直接设置值

// 传入的dataKey, 需要映射为组件内部的dataValue，用于组件展示
// 最终的结果，需要映射为dataKey，传到组件外部使用

const StepOne = (props: StepOneProps) => {
  const { data, formData } = props;
  // 组件内部只维护组件状态
  const formValue = transformToValue(formData);
  const [reviewStance, setReviewStance] = useState(formValue.reviewStance ?? 0);
  const [scale, setScale] = useState(formValue.scale ?? 0);
  const [reviewer, setReviewer] = useState(formValue.reviewer ?? '');
  const [strategyId, setStrategyId] = useState(formValue.strategyId);
  const { data: strategyArr } = useRequest(strategyList);

  const selectOptions =
    strategyArr?.records?.map((item) => ({
      label: item.name,
      value: item.id,
    })) || [];

  function handleNextStep() {
    const data = transformToKey({ reviewStance, scale, strategyId, reviewer });
    props.onOk(data);
  }

  function handleAddStrategy() {
    history.push(`/clm/config/strategy-edit/add`);
  }

  const partyCardInfo = useMemo(
    () => [
      { position: 0, data: data.partyA, title: '甲方' },
      { position: 1, data: data.partyB, title: '乙方' },
    ],
    [data],
  );

  return (
    <div className=" mx-auto space-y-8">
      {/* 1. 选择你的立场 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <span className="text-indigo-600 text-xl mr-2">•</span> 选择你的立场
          </h2>
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            {data.contractType}
          </h3>
        </div>

        <p className="text-sm text-gray-500 mb-4">基于合同主体确认您的立场</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 cursor-pointer ">
          {partyCardInfo.map((i) => (
            <div
              key={i.position}
              className={`p-4 border rounded-lg hover:border-indigo-200 transition duration-1500 ${
                reviewStance === i.position
                  ? 'border-indigo-200 bg-indigo-50'
                  : 'border-gray-200 bg-white'
              }`}
              onClick={() => setReviewStance(i.position)}
            >
              <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">{i.title}</h3>
              <p className="text-lg font-medium text-gray-800">{i.data || '-'}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. 选择你的审查尺度 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center mb-2">
          <span className="text-indigo-600 text-xl mr-2">•</span> 选择你的审查尺度
        </h2>
        <p className="text-sm text-gray-500 mb-6">选择不同审查尺度，对应不同的审查范围</p>

        <StanceSelector selectedStance={scale} setSelectedStance={setScale} />
      </div>

      {/* 3. 设置审阅人 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center mb-2">
          <span className="text-indigo-600 text-xl mr-2">•</span> 设置审阅人
        </h2>
        <p className="text-sm text-gray-500 mb-4">设置审阅人名称，在导出修订版本生效</p>
        <input
          type="text"
          value={reviewer}
          onChange={(e) => setReviewer(e.target.value)}
          placeholder="请输入审阅人姓名"
          className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-10 px-3 transition duration-150 ease-in-out"
        />
      </div>

      {/* 4. 设置审阅重点  */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center mb-2">
          <span className="text-indigo-600 text-xl mr-2">•</span> 设置审阅重点
        </h2>
        <p className="text-sm text-gray-500 mb-4">围绕设置的审阅重点，提炼贵方的审阅倾向</p>

        {/* 下拉选择框 */}
        <CustomSelect
          value={strategyId}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
            setStrategyId(e.target.value)
          }
          placeholder="选择一个策略"
          options={selectOptions}
        ></CustomSelect>

        {/* 新增审阅按钮 */}
        <button
          type="button"
          className="mt-4 flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors duration-150"
          onClick={handleAddStrategy}
        >
          <Plus className="h-6 w-6" />
          <span className="leading-6">新增策略</span>
        </button>
      </div>

      {/* 底部操作按钮 */}
      <div className="flex justify-center pt-4">
        <button
          type="button"
          onClick={handleNextStep}
          // 使用第一张图的主色调 indigo-600
          className="px-10 py-3 bg-indigo-600 text-white rounded-md text-base font-medium hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-150 ease-in-out shadow-lg"
        >
          下一步
        </button>
      </div>
    </div>
  );
};

export default StepOne;
