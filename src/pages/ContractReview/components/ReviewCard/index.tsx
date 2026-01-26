import RiskLevel, { RiskLevelType } from '@/components/RiskLevel';
import { updateAdvice } from '@/services/ant-design-pro/api';
import { useWebOffice } from '@/utils/wps/context';
import { message } from 'antd';
import { Check, ChevronDown, ChevronUp, Edit2, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import AddLabel from './AddLabel';
import ExpandableText from './ExpandableText';
import ReviewBasisCard, { ReviewBasisItem } from './ReviewBasisCard';
import ReviseEditModal from './ReviseEditModal';

export type BaseReviewData = {
  accept: number;
  compareContent: string;
  evidenceContent: string;
  evidenceSummary: string;
  evidenceType: string;
  id: number;
  isAdd: number;
  modify: string;
  originalContent: string;
  reviewId: number;
  reviewSummary: string;
  reviewType: string;
  revisedContent: string;
};

type ReviewCardProps = BaseReviewData & {
  /** 审核的依据列表 (包含标签、标题和描述) */
  riskLevel: number;
  basis: ReviewBasisItem[];
};

const ReviewCard = ({
  index,
  data = {} as ReviewCardProps,
}: {
  index: number;
  data: ReviewCardProps;
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const [revisedText, setRevisedText] = useState(data.revisedContent);
  const [compareContent, setCompareContent] = useState(data.compareContent);
  const { accept, locate, reject } = useWebOffice();
  const [revised, setRevised] = useState<boolean>(false);
  const [editVisible, setEditVisible] = useState<boolean>(false);

  useEffect(() => {
    setRevised(data.accept === 0 ? false : true);
  }, [data.accept]);

  function handleWpsRevise(runAccept: boolean, onEnd: any) {
    if (runAccept) {
      accept(data.originalContent, revisedText, data.id, onEnd);
    } else {
      reject(data.id, onEnd);
    }
  }

  function UpdateReviseState(chunkId: number, accept: boolean) {
    updateAdvice({
      chunkId: chunkId,
      accept: accept ? 1 : 0,
    })
      .then((res) => {
        if (res.success) {
          setRevised(accept);
        } else {
          handleWpsRevise(!accept, () =>
            message.error(`${accept ? '接受' : '撤销'}修订失败，请重试`),
          );
        }
      })
      .catch(() => {
        handleWpsRevise(!accept, () =>
          message.error(`${accept ? '接受' : '撤销'}修订失败，请重试`),
        );
      });
  }

  function handleRevise() {
    // revised 当前是需要接受修订状态，因此，执行accept 以及设置为
    handleWpsRevise(!revised, () => UpdateReviseState(data.id, !revised));
  }

  function handleEditRevise() {
    setEditVisible(true);
  }

  const hideModal = () => {
    setEditVisible(false);
  };

  const handleReviseSubmit = (data: { revisedContent: string; compareContent: string }) => {
    setRevisedText(data.revisedContent);
    setCompareContent(data.compareContent);
    setEditVisible(false);
  };

  return (
    <div className="[&_.red-txt]:text-red-600 [&_.green-txt]:text-blue-400 [&_.green-txt]:line-through bg-white p-5 rounded-xl shadow-md border border-gray-100 mb-5 ">
      {/* 标题和展开/收起 */}
      <div className="flex flex-start items-start">
        <h3 className="text-sm font-bold text-gray-800 leading-snug shrink">
          {`${index + 1}. ${data.reviewSummary}`}
        </h3>
        <RiskLevel type={data.riskLevel as RiskLevelType} />
        <AddLabel isAdd={data.isAdd} />
        {/* 模仿原图中的小图标 */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 ml-auto hover:text-indigo-600 transition-colors p-1 rounded-full"
          aria-expanded={isExpanded}
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>
      {isExpanded && (
        <>
          <div className="space-y-3 mt-4 mb-4 text-sm">
            <div className="text-gray-700 leading-relaxed">
              <ExpandableText text={data.originalContent} />
            </div>

            <div className="leading-relaxed bg-indigo-50 text-gray-700 p-2 rounded-lg border border-indigo-200">
              <span dangerouslySetInnerHTML={{ __html: compareContent }}></span>
            </div>
          </div>

          <div className="border-b pb-2 mb-4 border-gray-100">
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => locate(revised, data.id, data.originalContent)}
                className="min-w-[20px]"
              >
                <div
                  className={`flex items-center text-xs text-indigo-600 hover:text-indigo-800 font-semibold transition-colors ${
                    data.isAdd === 1 ? 'hidden' : ''
                  }`}
                >
                  <MapPin className="w-3 h-3 mr-1" />
                  定位到原文
                </div>
              </button>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleEditRevise}
                  className="flex items-center text-xs text-gray-600 border border-gray-300 hover:bg-gray-100 font-medium py-1 px-3 rounded-full transition-colors"
                >
                  <Edit2 className="w-3 h-3 mr-1" />
                  修改
                </button>

                <button
                  type="button"
                  onClick={handleRevise}
                  className="flex items-center text-xs bg-indigo-600 text-white hover:bg-indigo-700 font-medium py-1 px-3 rounded-full shadow-md shadow-indigo-300 transition-colors"
                >
                  <Check className="w-3 h-3 mr-1" />
                  {revised ? '撤销修订' : '接受修订'}
                </button>
              </div>
            </div>
          </div>

          <ReviewBasisCard data={data.basis} />
        </>
      )}
      <ReviseEditModal
        onCancel={hideModal}
        onSubmit={handleReviseSubmit}
        id={data.id}
        text={revisedText}
        visible={editVisible}
      />
    </div>
  );
};

export default ReviewCard;
