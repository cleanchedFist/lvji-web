import { Download, FileText, Guard, Trash } from '@/components/Icon';
import { deleteContractDir } from '@/services/ant-design-pro/api';
import { contractDownload } from '@/utils/contractHandle';
import { deleteModalConfig } from '@/utils/modalConfig';
import { history } from '@umijs/max';
import { Modal, message } from 'antd';
import { useContext } from 'react';
import { ActionContext, ContractVersionsContext } from '../utils/context';
import formatTime from '../utils/formatTime';
/**
 * 合同卡片组件
 * @param {{ contract: Contract }} props
 */

const buttonClassNames =
  'flex-1 py-1.5 text-xs font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded transition-colors';
const handleDownload = (data: API.CatalogeCardProps) => {
  const contractName = data.name;
  contractDownload({ contractName, reviewId: data.latestFileId });
};

const handleViewContract = (data: API.CatalogeCardProps) => {
  if (data.reviewId) {
    history.push(`/clm/contract/view/${data.reviewId}`, { name: data.name });
  } else {
    history.push(`/cataloge/file/${data.latestFileId}`);
  }
};

const handleReview = (data: API.CatalogeCardProps) => {
  history.push(`/clm/contract/step/${data.latestFileId}`);
};

const CatalogeCard = ({ contract }: { contract: API.CatalogeCardProps }) => {
  const actionContext = useContext(ActionContext);
  const contractVersionsContext = useContext(ContractVersionsContext);

  const handleDelete = (id: number) => {
    deleteContractDir(`${id}`)
      .then(() => {
        contractVersionsContext.reloadList();
      })
      .catch(() => {
        message.error('删除失败，请重试');
      });
  };

  const handleDeleteClick = (data: API.CatalogeCardProps) => {
    Modal.confirm({
      title: '确认删除合同目录?',
      content: '删除后目录下的所有合同将不能再恢复数据.',
      ...deleteModalConfig,
      async onOk() {
        await handleDelete(data.id);
      },
    });
  };

  return (
    <div className="bg-white hover:shadow-md rounded-xl w-full">
      {/* 头部区域：标题、元数据和操作按钮 */}
      <div className="pt-6 pb-1 px-8">
        <div className="flex justify-between items-start mb-4">
          {/* 左侧：图标、标题和元数据 */}
          <div className="flex items-start gap-3">
            <div className="w-[36px] h-[36px] flex items-center justify-center  bg-blue-50 text-blue-600 rounded-[8px] shrink-0">
              <FileText />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 group-hover:text-indigo-600 transition-colors cursor-pointer">
                {contract.name}
              </h3>
              <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                <span>创建时间: {formatTime(contract.createTimeStamp)}</span>
                {/* <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">履约中</span> */}
              </div>
            </div>
          </div>

          {/* 右侧：操作图标和主按钮 */}
          <div className="flex items-center">
            {/* 下载图标 */}
            <button
              type="button"
              onClick={() => handleDownload(contract)}
              className="p-2 hover:text-gray-400 rounded-full transition duration-150"
              aria-label="Download"
            >
              <Download />
            </button>
            {/* 删除图标 */}
            <button
              type="button"
              onClick={() => handleDeleteClick(contract)}
              className="p-2 hover:text-gray-400 rounded-full transition duration-150"
              aria-label="Delete"
            >
              <Trash />
            </button>
            {/* 上传新版本按钮 */}
            <button
              type="button"
              onClick={() => contractVersionsContext.onUploadDVersionBtnClick(contract.id)}
              className="px-3 py-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg text-xs font-semibold transition-colors"
            >
              上传新版本
            </button>
          </div>
        </div>

        {/* 主内容区域：甲乙双方信息 */}
        <div className="bg-slate-50 rounded-lg p-3 flex flex-wrap gap-y-2 gap-x-8 text-sm">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 mb-0.5">甲方</span>
            <span className="font-medium text-slate-700">{contract.parta || '-'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 mb-0.5">乙方</span>
            <span className="font-medium text-slate-700">{contract.partb || '-'}</span>
          </div>
        </div>
      </div>

      {/* 底部导航区域：版本、记录和审查 */}
      <div className="mt-4 flex gap-2 border-t border-slate-100 py-3">
        <button
          type="button"
          onClick={() => handleViewContract(contract)}
          className={buttonClassNames}
        >
          查看最新版本
        </button>
        <div className="w-px bg-slate-200"></div>
        <button
          type="button"
          onClick={() => actionContext.versionHandler(contract)}
          className={buttonClassNames}
        >
          历史版本记录
        </button>
        <div className="w-px bg-slate-200"></div>
        <button
          type="button"
          onClick={() => handleReview(contract)}
          className={`${buttonClassNames} text-indigo-600 hover:bg-indigo-50 flex items-center justify-center gap-1`}
        >
          <Guard />
          智能审查
        </button>
      </div>
    </div>
  );
};

export default CatalogeCard;
