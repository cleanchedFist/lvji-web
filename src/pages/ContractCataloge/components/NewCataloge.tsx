import { CloudUploadOutlined } from '@ant-design/icons';
import { Files } from 'lucide-react';
import React, { useContext } from 'react';
import { CatalogePageContext } from '../utils/context';

const NewCataloge: React.FC = () => {
  const catalogePageContext = useContext(CatalogePageContext);
  const baseCardClasses = 'p-6 rounded-xl shadow-lg transition-all duration-300';
  return (
    <div
      className={`${baseCardClasses} bg-indigo-700 text-white  relative overflow-hidden flex flex-col justify-between shadow-lg shadow-indigo-200`}
    >
      {/* 装饰图形 - 位于底层，保证文字在上方 */}
      <Files className="lucide lucide-files absolute right-[-20px] bottom-[-20px] text-indigo-500 opacity-50 w-48 h-48" />

      <div className="relative z-10 space-y-4">
        <h2 className="text-2xl font-bold">合同管理中心</h2>
        <p className="text-sm leading-relaxed text-indigo-200 w-4/5">
          上传您的合同，在这里完善合同的基本信息。合同文件有更新可以替换合同附件。
        </p>
      </div>

      {/* 按钮 */}
      <div className="relative z-10 mt-6">
        <button
          type="button"
          onClick={() => catalogePageContext.onUploadDirBtnClick()}
          className="flex items-center space-x-2 px-6 py-2 bg-white text-indigo-700 rounded-lg shadow-md hover:bg-gray-100 transition duration-150"
        >
          <CloudUploadOutlined className="w-5 h-5" />
          <span className="font-medium">上传合同</span>
        </button>
      </div>
    </div>
  );
};

export default NewCataloge;
