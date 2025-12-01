import { addRule, updateRule } from '@/services/ant-design-pro/api';
import { message } from 'antd';
import { useState } from 'react';
import Mask from '../Mask';
import Radio from '../Radio';

type AddRuleModalProps = {
  onSubmit: (success: boolean) => void;
  onCancel: () => void;
  visible: boolean;
  tableId: string;
  data?: API.RuleListItem;
};

type RuleInfo = {
  name?: string;
  description?: string;
  createdSource: number;
  riskLevel: string;
  ruleTableId: string;
};

const RISK_LEVELS = [
  { label: '高风险', value: '2' },
  { label: '中风险', value: '1' },
  { label: '低风险', value: '0' },
];

const handleAddSubmit = async (data: RuleInfo) => {
  const hide = message.loading('新增中');
  try {
    await addRule(data);
    hide();
    message.success('新增成功');
    return true;
  } catch (error) {
    hide();
    message.error('新增失败，请重试');
    return false;
  }
};

const handleUpdateSubmit = async (fields: Record<string, any>) => {
  const hide = message.loading('更新中');
  try {
    await updateRule(fields);
    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败，请重试');
    return false;
  }
};

// 主应用组件，包含重新设计的新增规则集模态框
const AddRuleModal = ({ onSubmit, onCancel, visible, tableId, data }: AddRuleModalProps) => {
  const [ruleName, setRuleName] = useState(data?.name || '');
  const [ruleDescription, setRuleDescription] = useState(data?.description);
  const [riskLevel, setRiskLevel] = useState<string>(
    data?.riskLevel !== void 0 ? `${data.riskLevel}` : RISK_LEVELS[0].value,
  ); // 默认选中中风险

  const handleCancel = () => {
    setRuleName('');
    setRuleDescription('');
    setRiskLevel(RISK_LEVELS[0].value);
    onCancel();
  };

  const handleConfirm = async () => {
    // 更新
    if (data?.id) {
      const success = await handleUpdateSubmit({
        ruleDetailId: data.id,
        ruleTableId: tableId,
        name: ruleName,
        description: ruleDescription,
        riskLevel,
      });
      onSubmit(success);
    } else {
      // 新增
      const success = await handleAddSubmit({
        name: ruleName,
        description: ruleDescription,
        riskLevel,
        ruleTableId: tableId,
        createdSource: 1,
      });
      onSubmit(success);
    }
  };

  return (
    // 模态框背景遮罩层
    <Mask visible={visible}>
      {/* 模态框主体 */}
      <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl transition-all duration-300 transform scale-100">
        {/* 头部：标题和关闭按钮，模仿模版风格 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">新增审核规则</h2>
        </div>

        {/* 内容区域：表单元素 */}
        <div className="p-6 space-y-6">
          {/* 风险等级 Radio Group */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">风险等级</label>
            <div className="flex space-x-6">
              {RISK_LEVELS.map((level) => (
                <label key={level.value} className="flex items-center cursor-pointer">
                  <Radio
                    name="riskLevel"
                    value={level.value}
                    checked={riskLevel === level.value}
                    onChange={(e) => setRiskLevel(e.target.value)}
                  />
                  <span className="ml-2 text-gray-700 text-base">{level.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 规则名称输入框 */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="ruleName" className="text-sm font-medium text-gray-700">
              规则名称
            </label>
            <input
              id="ruleName"
              type="text"
              value={ruleName}
              onChange={(e) => setRuleName(e.target.value)}
              placeholder="请输入"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 placeholder-gray-400"
            />
          </div>

          {/* 规则内容输入框 (Textarea) */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="ruleContent" className="text-sm font-medium text-gray-700">
              规则内容
            </label>
            <textarea
              id="ruleContent"
              rows={5}
              value={ruleDescription}
              onChange={(e) => setRuleDescription(e.target.value)}
              placeholder="请输入"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 placeholder-gray-400 resize-y"
            />
          </div>
        </div>

        {/* 底部：操作按钮，右对齐，采用模版颜色和圆角 */}
        <div className="flex justify-end p-6 bg-gray-50 border-t border-gray-100 rounded-b-xl space-x-3">
          {/* 取消按钮：边框样式 */}
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition duration-150"
          >
            取消
          </button>

          {/* 确定按钮：主色调填充 */}
          <button
            type="button"
            onClick={handleConfirm}
            className="px-6 py-2 text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150"
          >
            确定
          </button>
        </div>
      </div>
    </Mask>
  );
};

export default AddRuleModal;
