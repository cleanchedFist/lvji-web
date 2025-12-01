import { scenarioAdd } from '@/services/ant-design-pro/api';
import { message } from 'antd';
import { useState } from 'react';
import Mask from '../Mask';

type AddRuleSetModalProps = {
  onSubmit: (success: boolean) => void;
  onCancel: () => void;
  visible: boolean;
};

const handleSubmit = async (value: string) => {
  const hide = message.loading('新增中');
  try {
    await scenarioAdd({ name: value });
    hide();
    message.success('新增成功');
    return true;
  } catch (error) {
    hide();
    message.error('新增失败，请重试');
    return false;
  }
};

// 主应用组件，包含重新设计的新增规则集模态框
const AddRuleSetModal = ({ onSubmit, onCancel, visible }: AddRuleSetModalProps) => {
  const [value, setValue] = useState('');

  const handleCancel = () => {
    setValue('');
    onCancel();
  };

  const handleConfirm = async (value: string) => {
    const success = await handleSubmit(value);
    onSubmit(success);
  };

  return (
    // 模态框背景遮罩层
    <Mask visible={visible}>
      {/* 模态框主体 */}
      <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl transition-all duration-300 transform scale-100">
        {/* 头部：标题和关闭按钮，模仿原图的简洁风格 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">新增规则集</h2>
        </div>

        {/* 内容区域：表单元素 */}
        <div className="p-6 space-y-6">
          <div className="flex flex-col space-y-2">
            <label htmlFor="ruleSetName" className="text-sm font-medium text-gray-700">
              规则集名称
            </label>
            {/* 输入框：采用圆角和主色调的焦点样式，与上传合同界面的风格统一 */}
            <input
              id="ruleSetName"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="请输入"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 placeholder-gray-400"
            />
          </div>
        </div>

        {/* 底部：操作按钮，右对齐，采用目标样式的颜色和圆角 */}
        <div className="flex justify-end p-6 bg-gray-50 border-t border-gray-100 rounded-b-xl space-x-3">
          {/* 取消按钮：边框样式，与原图的“取消”按钮保持一致 */}
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition duration-150"
          >
            取消
          </button>

          {/* 确定按钮：主色调填充，与原图的“确定”按钮保持一致 */}
          <button
            type="button"
            onClick={() => handleConfirm(value)}
            className="px-6 py-2 text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150"
          >
            确定
          </button>
        </div>
      </div>
    </Mask>
  );
};

export default AddRuleSetModal;
