import { removeContract, setReviewDown } from '@/services/ant-design-pro/api';
import { Contract_Type } from '@/utils/const';
import { clientFileDownload, contractDownload } from '@/utils/contractHandle';
import { deleteModalConfig } from '@/utils/modalConfig';
import { history } from '@umijs/max';
import { message, Modal } from 'antd';
import { FileText } from 'lucide-react';
import { useContext } from 'react';
import { CatalogePageContext } from '../utils/context';
import formatTime from '../utils/formatTime';
import { reviewStageText, reviewStageTheme } from '../utils/reviewStageText';
import CatalogeCardBtn from './ContractCardBtn';

const ContractCard = ({
  contract,
  isCurrent,
  updateList,
  isLastOne,
}: {
  contract: API.ContractVersionItem;
  isCurrent: boolean;
  isLastOne: boolean;
  updateList: (id?: number) => Promise<void>;
}) => {
  const { listType } = useContext(CatalogePageContext);
  const handleViewContract = (data: API.ContractVersionItem) => {
    if (data.reviewId && listType !== Contract_Type.ClientUpload) {
      history.push(`/clm/reviews/result/${data.reviewId}`, { name: data.name });
    } else {
      history.push(`/clm/reviews/file/${data.id}`);
    }
  };

  const handleDownloadContract = (data: API.ContractVersionItem) => {
    const contractName = data.name;
    if (listType === Contract_Type.ClientUpload) {
      clientFileDownload({ fileId: data.id, contractName });
    } else {
      contractDownload({ contractName, reviewId: data.reviewId });
    }
  };

  const downloadReviewVersion = (data: API.ContractVersionItem) => {
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

  const handleReviewDone = async (id: number) => {
    const hide = message.loading('正在更新');
    setReviewDown(id)
      .then(() => {
        updateList();
      })
      .catch(() => {
        message.error('设置失败，请重试');
      })
      .finally(() => {
        hide();
      });
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
            {[Contract_Type.ClientUpload, Contract_Type.ClientAssigned].includes(listType) && (
              <span className={`text-xs px-1.5 py-0.5 rounded ${reviewStageTheme(contract.stage)}`}>
                {reviewStageText(contract.stage)}
              </span>
            )}
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
        {listType !== Contract_Type.ClientUpload && (
          <CatalogeCardBtn onClick={() => handleViewContract(contract)}>查看</CatalogeCardBtn>
        )}
        <CatalogeCardBtn onClick={() => handleDownloadContract(contract)}>下载</CatalogeCardBtn>

        {listType !== Contract_Type.ClientUpload && (
          <CatalogeCardBtn
            type="primary"
            disabled={contract.stage === 2}
            onClick={() => {
              handleReviewContract(contract.id);
            }}
          >
            智能审查
          </CatalogeCardBtn>
        )}
        {listType === Contract_Type.ClientUpload && (
          <CatalogeCardBtn
            type="primary"
            disabled={contract.stage !== 2}
            onClick={() => {
              downloadReviewVersion(contract);
            }}
          >
            下载审查版本
          </CatalogeCardBtn>
        )}

        {listType === Contract_Type.ClientAssigned && (
          <CatalogeCardBtn
            type="primary"
            disabled={contract.stage === 2}
            onClick={() => {
              handleReviewDone(contract.id);
            }}
          >
            设置审查完成
          </CatalogeCardBtn>
        )}

        <CatalogeCardBtn
          disabled={isLastOne}
          onClick={() => {
            handleDeleteClick(contract);
          }}
        >
          删除
        </CatalogeCardBtn>
      </div>
    </div>
  );
};

export default ContractCard;
