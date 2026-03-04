import { FileText, Guard } from '@/components/Icon';
import NormalBtn from '@/components/NormalBtn';
import { deleteContractDir, setReviewDown } from '@/services/ant-design-pro/api';
import { Contract_Type } from '@/utils/const';
import { clientFileDownload, contractDownload } from '@/utils/contractHandle';
import { deleteModalConfig } from '@/utils/modalConfig';
import { history } from '@umijs/max';
import { Modal, message } from 'antd';
import { Download, Trash2 } from 'lucide-react';
import { useContext, useMemo } from 'react';
import { ActionContext, CatalogePageContext } from '../utils/context';
import { formatTime } from '../utils/formatTime';
import { reviewStageText, reviewStageTheme } from '../utils/reviewStageText';
import CatalogeCardBtn from './CatalogeCardBtn';
/**
 * 合同卡片组件
 * @param {{ contract: Contract }} props
 */

const handleReview = (data: API.CatalogeCardProps) => {
  history.push(`/clm/reviews/step/${data.latestFileId}`);
};

const CatalogeCard = ({ contract }: { contract: API.CatalogeCardProps }) => {
  const actionContext = useContext(ActionContext);
  const catalogePageContext = useContext(CatalogePageContext);
  const { listType } = catalogePageContext;
  const handleViewContract = (data: API.CatalogeCardProps) => {
    if (data.reviewId && listType !== Contract_Type.ClientUpload) {
      history.push(`/clm/reviews/result/${data.reviewId}`, { name: data.name });
    } else {
      history.push(`/clm/reviews/file/${data.latestFileId}`);
    }
  };

  const handleDownload = (data: API.CatalogeCardProps) => {
    const contractName = data.name;
    if (listType === Contract_Type.ClientUpload || !data.reviewId) {
      clientFileDownload({ contractName, fileId: data.latestFileId });
    } else {
      contractDownload({ contractName, reviewId: data.reviewId });
    }
  };

  const downloadReviewVersion = (data: API.CatalogeCardProps) => {
    const contractName = data.name;
    contractDownload({ contractName, reviewId: data.reviewId });
  };

  const handleDelete = (id: number) => {
    deleteContractDir(`${id}`)
      .then(() => {
        catalogePageContext.reloadList();
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

  const handleReviewDone = (id: number) => {
    const hide = message.loading('正在更新');
    setReviewDown(id)
      .then(() => {
        catalogePageContext.reloadList();
      })
      .catch(() => {
        message.error('状态更新失败，请重试');
      })
      .finally(() => {
        hide();
      });
  };

  const tagPrefix = useMemo(() => {
    if (contract.stage === 0 && contract.version !== '1.0.0') {
      return '新版本';
    }
    return '';
  }, [contract.stage, contract.version]);
  return (
    <div className="bg-white hover:shadow-md rounded-xl w-full border border-gray-100">
      {/* 头部区域：标题、元数据和操作按钮 */}
      <div className="pt-6 pb-1 px-8">
        <div className="flex justify-between items-start mb-4">
          {/* 左侧：图标、标题和元数据 */}
          <div className="flex items-start gap-3">
            <div className="w-[36px] h-[36px] flex items-center justify-center  bg-blue-50 text-blue-600 rounded-[8px] shrink-0">
              <FileText />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                {contract.name}
                {[Contract_Type.ClientUpload, Contract_Type.ClientAssigned].includes(listType) && (
                  <span
                    className={`ml-2 p-1.5 text-sm font-medium rounded-lg ${reviewStageTheme(
                      contract.stage,
                    )}`}
                  >
                    {`${tagPrefix}${reviewStageText(contract.stage)}`}
                  </span>
                )}
              </h3>

              <div className="flex items-center gap-3 mt-1 text-sm text-slate-400">
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
              <Download className="w-[20px] h-[20px]" />
            </button>
            {/* 删除图标 */}
            <button
              type="button"
              onClick={() => handleDeleteClick(contract)}
              className="p-2 hover:text-gray-400 rounded-full transition duration-150"
              aria-label="Delete"
            >
              <Trash2 className="w-[20px] h-[20px]" />
            </button>
            {/* 上传新版本按钮 */}
            <NormalBtn
              onClick={() =>
                catalogePageContext.onUploadDVersionBtnClick(contract.id, contract.version)
              }
            >
              上传新版本
            </NormalBtn>
            {/* 开始审查之后才允许点击 */}
            {/* 设置审查完成 */}
            {listType === Contract_Type.ClientAssigned && (
              <NormalBtn
                disabled={contract.stage === 3}
                onClick={() => handleReviewDone(contract.latestFileId)}
              >
                设置审查完成
              </NormalBtn>
            )}
          </div>
        </div>

        {/* 主内容区域：甲乙双方信息 */}
        <div className="bg-slate-50 rounded-lg p-3 flex flex-wrap gap-y-2 gap-x-8 text-base">
          <div className="flex flex-col">
            <span className="text-sm text-slate-400 mb-0.5">甲方</span>
            <span className="font-medium text-slate-700">{contract.parta || '-'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-slate-400 mb-0.5">乙方</span>
            <span className="font-medium text-slate-700">{contract.partb || '-'}</span>
          </div>
        </div>
      </div>

      {/* 底部导航区域：版本、记录和审查 */}
      <div className="mt-4 flex gap-2 border-t border-slate-100 py-3">
        {listType !== Contract_Type.ClientUpload && (
          <CatalogeCardBtn onClick={() => handleViewContract(contract)}>
            查看最新版本
          </CatalogeCardBtn>
        )}
        <div className="w-px bg-slate-200"></div>
        <CatalogeCardBtn onClick={() => actionContext.versionHandler(contract)}>
          历史版本记录
        </CatalogeCardBtn>
        <div className="w-px bg-slate-200"></div>
        {listType === Contract_Type.ClientUpload && (
          <CatalogeCardBtn
            onClick={() => downloadReviewVersion(contract)}
            disabled={contract.stage !== 2}
          >
            <Guard />
            下载审查版本
          </CatalogeCardBtn>
        )}
        {listType !== Contract_Type.ClientUpload && (
          <CatalogeCardBtn disabled={contract.stage === 2} onClick={() => handleReview(contract)}>
            <Guard />
            智能审查
          </CatalogeCardBtn>
        )}
      </div>
    </div>
  );
};

export default CatalogeCard;
