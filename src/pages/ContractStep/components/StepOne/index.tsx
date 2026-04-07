import CustomSelect from '@/components/CustomSelect';
import { getSupportModels } from '@/services/ant-design-pro/api';
import { useRequest } from '@umijs/max';
import { Form, FormInstance, Input } from 'antd';
import React, { useEffect, useMemo } from 'react';
import { allowedStances } from '../../dataSchema';
import StanceBtn from './components/StanceBtn';
import StanceSelector from './components/StanceSelector';
export type FormData = {
  // key值
  reviewStance: string; // step1
  scale: string; // step1
  userReviewPoint?: number; // step1
  reviewer?: string;
  model?: string;
};

type StepOneProps = {
  formData: FormInstance<FormData>;
  data: {
    reviewResultNewId: number;
    partyA: string;
    partyB: string;
    contractType: string;
    isAssigned?: number;
  };
  onOk: () => void;
};

// props.formData 用来解决stepTwo 回退时，用户选择能正确展示
const StepOne = (props: StepOneProps) => {
  const { data, formData } = props;
  const { data: models } = useRequest(getSupportModels);

  const reviewStance = Form.useWatch('reviewStance', formData);
  const scale = Form.useWatch('scale', formData);
  const model = Form.useWatch('model', formData);
  const reviewer = Form.useWatch('reviewer', formData);
  const userReviewPoint = Form.useWatch('userReviewPoint', formData);

  const stanceCardOptions = useMemo(
    () => [
      { value: data.partyA, label: allowedStances.PartyA },
      { value: data.partyB, label: allowedStances.PartyB },
    ],
    [data],
  );

  const modelOptions = useMemo(() => {
    return (
      models?.map((item: string) => ({
        label: item,
        value: item,
      })) || []
    );
  }, [models]);

  useEffect(() => {
    if (models && !model) {
      formData.setFieldValue('model', models[0]);
    }
  }, [models, model]);

  return (
    <div className=" mx-auto space-y-8">
      {/* 1. 选择你的立场 */}
      <Form.Item name="reviewStance">
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
            {stanceCardOptions.map((i) => (
              <StanceBtn
                key={i.label}
                {...i}
                active={reviewStance === i.label}
                onClick={() => formData.setFieldValue('reviewStance', i.label)}
              ></StanceBtn>
            ))}
          </div>
        </div>
      </Form.Item>

      {/* 2. 选择你的审查尺度 */}
      <Form.Item name="scale">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center mb-2">
            <span className="text-indigo-600 text-xl mr-2">•</span> 选择你的审查尺度
          </h2>
          <p className="text-sm text-gray-500 mb-6">选择不同审查尺度，对应不同的审查范围</p>

          <StanceSelector
            selectedStance={scale}
            setSelectedStance={(value) => formData.setFieldValue('scale', value)}
          />
        </div>
      </Form.Item>

      {/* 3. 设置审查模型 */}

      {data.isAssigned === 1 && (
        <Form.Item name="model" noStyle>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center mb-2">
              <span className="text-indigo-600 text-xl mr-2">•</span> 设置审查模型
            </h2>
            <p className="text-sm text-gray-500 mb-4">选择不同的审查模型以平衡审查速度与逻辑深度</p>
            <CustomSelect
              value={model}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
                formData.setFieldValue('model', e.target.value)
              }
              placeholder="选择一个策略"
              options={modelOptions}
            ></CustomSelect>
          </div>
        </Form.Item>
      )}

      {/* 4. 设置审阅人 */}
      <Form.Item name="reviewer">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center mb-2">
            <span className="text-indigo-600 text-xl mr-2">•</span> 设置审阅人
          </h2>
          <p className="text-sm text-gray-500 mb-4">设置审阅人名称，在导出修订版本生效</p>
          <input
            type="text"
            value={reviewer || ''}
            onChange={(e) => formData.setFieldValue('reviewer', e.target.value)}
            placeholder="请输入审阅人姓名"
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-10 px-3 transition duration-150 ease-in-out"
          />
        </div>
      </Form.Item>

      {/* 5. 设置审阅重点  */}
      <Form.Item name="userReviewPoint" noStyle>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center mb-2">
            <span className="text-indigo-600 text-xl mr-2">•</span> 设置审阅重点
          </h2>
          <p className="text-sm text-gray-500 mb-4">围绕设置的审阅重点，提炼贵方的审阅倾向</p>
          <Input.TextArea
            rootClassName="hover:border-indigo-600 focus:border-indigo-600"
            placeholder="请输入审阅重点..."
            rows={3}
            maxLength={200}
            value={userReviewPoint || ''}
            onChange={(e) => formData.setFieldValue('userReviewPoint', e.target.value)}
          />
          <div className="p-4 bg-indigo-50 border-l-4 border-indigo-300 rounded-r-lg text-sm text-gray-700 mt-4">
            <p>填写建议:</p>
            <p className="mt-2 text-xs text-indigo-600 font-medium">
              请提供实质性的政策要求或决策偏好，无需包含序号、段落、字体等格式说明，系统将根据您的输入自动确保文档规范性。
            </p>
          </div>
        </div>
      </Form.Item>
      {/* 底部操作按钮 */}
      <div className="flex justify-center pt-4">
        <button
          type="button"
          onClick={props.onOk}
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
