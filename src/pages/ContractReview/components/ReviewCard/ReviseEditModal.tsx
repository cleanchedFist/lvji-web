import Mask from '@/components/Mask';
import { updateAdvice } from '@/services/ant-design-pro/api';
import { LoadingOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { useState } from 'react';

type ReviseEditModalProps = {
  onSubmit: (data: { revisedContent: string; compareContent: string }) => void;
  onCancel: () => void;
  visible: boolean;
  text: string;
  id: number;
};

// 主应用组件，包含重新设计的新增规则集模态框
const ReviseEditModal = ({ onSubmit, onCancel, id, visible, text }: ReviseEditModalProps) => {
  const [value, setValue] = useState(text || '');
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setValue(text);
    onCancel();
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      const result = await updateAdvice({
        chunkId: id,
        revisedContent: value,
      });
      onSubmit({ revisedContent: value, compareContent: result.data.compareContent });
      setLoading(false);
    } catch (error) {
      message.error('修改失败，请重试');
      setLoading(false);
    }
  };

  return (
    // 模态框背景遮罩层
    <Mask visible={visible}>
      {/* 模态框主体 */}
      <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl transition-all duration-300 transform scale-100">
        {/* 头部：标题和关闭按钮，模仿模版风格 */}
        <div className="flex items-center justify-between p-6">
          <h2 className="text-xl font-semibold text-gray-800">修改建议</h2>
        </div>

        <div className="px-6 space-y-6">
          <textarea
            id="ruleContent"
            rows={5}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="请输入"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 placeholder-gray-400 resize-y"
          />
        </div>

        {/* 底部：操作按钮，右对齐，采用模版颜色和圆角 */}
        <div className="flex justify-end px-6 py-4 rounded-b-xl space-x-3">
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
            {loading && <LoadingOutlined className="mr-2" />}
            确定
          </button>
        </div>
      </div>
    </Mask>
  );
};

export default ReviseEditModal;
