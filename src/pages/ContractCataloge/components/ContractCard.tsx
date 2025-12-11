import { removeContract } from '@/services/ant-design-pro/api';
import { contractDownload } from '@/utils/contractHandle';
import { deleteModalConfig } from '@/utils/modalConfig';
import { history } from '@umijs/max';
import { message, Modal } from 'antd';
import { FileText } from 'lucide-react';
import formatTime from '../utils/formatTime';

const ContractCard = ({
  contract,
  isCurrent,
  updateList,
}: {
  contract: API.ContractVersionItem;
  isCurrent: boolean;
  updateList: (id?: number) => Promise<void>;
}) => {
  const handleViewContract = (data: API.ContractVersionItem) => {
    if (data.reviewId) {
      history.push(`/clm/reviews/result/${data.reviewId}`, { name: data.name });
    } else {
      history.push(`/clm/reviews/file/${data.id}`);
    }
  };

  const handleDownloadContract = (data: API.ContractVersionItem) => {
    const contractName = data.name;
    contractDownload({ contractName, reviewId: data.reviewId });
  };

  const handleDeleteContract = (id: number) => {
    removeContract(`${id}`)
      .then(() => {
        updateList();
      })
      .catch(() => {
        message.error('删除失败，请重试');
      });
  };

  const handleDeleteClick = (data: API.ContractVersionItem) => {
    Modal.confirm({
      title: '确认删除合同目录?',
      content: '删除后目录下的所有合同将不能再恢复数据.',
      ...deleteModalConfig,
      async onOk() {
        await handleDeleteContract(data.id);
      },
    });
  };

  const handleReviewContract = (id: number) => {
    history.push(`/clm/reviews/step/${id}`);
  };

  return (
    <div
      className={`${
        isCurrent ? 'border-indigo-300' : 'border-slate-200'
      } bg-white border  rounded-xl p-4 mt-[4px] flex items-center justify-between hover:border-indigo-300 transition-colors cursor-pointer group`}
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
          <FileText className="w-[20px] h-[20px]" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">v{contract.version || '1.0.0'}</span>
            {isCurrent ? (
              <span className="text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                Current
              </span>
            ) : null}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{formatTime(contract.createTimeStamp)}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => handleViewContract(contract)}
          className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded"
        >
          查看
        </button>
        <button
          type="button"
          onClick={() => {
            handleDownloadContract(contract);
          }}
          className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded"
        >
          下载
        </button>
        <button
          type="button"
          onClick={() => {
            handleReviewContract(contract.id);
          }}
          className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded shadow-sm"
        >
          智能审查
        </button>
        <button
          type="button"
          onClick={() => {
            handleDeleteClick(contract);
          }}
          className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded"
        >
          删除
        </button>
      </div>
    </div>
  );
};

export default ContractCard;
