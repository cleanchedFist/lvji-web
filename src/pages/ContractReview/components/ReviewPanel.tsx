import { useMemo, useState } from 'react';
import ReviewCard, { BaseReviewData } from './ReviewCard/index';
import ReviewPanelTab from './ReviewPanelTab';

export type ReviewData = BaseReviewData & {
  riskLevel: string;
};

type ReviewPanelProps = {
  data: ReviewData[];
  fileType: string;
};

const formReviewPanelData = (list: ReviewData[]) => {
  return list
    .filter((item) => item.originalContent && item.revisedContent)
    .map((item) => {
      return {
        ...item,
        riskLevel: ['低风险', '中风险', '高风险'].indexOf(item.riskLevel),
        basis: [
          {
            tag: item.evidenceType,
            title: item.evidenceSummary,
            desc: item.evidenceContent,
          },
        ],
      };
    });
};

const filterFn = (type: string) => {
  switch (type) {
    case '高风险':
      return (i: ReviewData) => i.riskLevel === '高风险';
    case '中风险':
      return (i: ReviewData) => i.riskLevel === '中风险';
    case '低风险':
      return (i: ReviewData) => i.riskLevel === '低风险';
    case '文字符号':
      return (i: ReviewData) => i.reviewType === '文字符号';
    default:
      return (i: ReviewData) => i;
  }
};

const ReviewPanel = ({ fileType, data }: ReviewPanelProps) => {
  const [activeTab, setActiveTab] = useState('全部');
  const reviewItemsData = useMemo(() => {
    if (activeTab === '全部') {
      return formReviewPanelData(data);
    } else {
      return formReviewPanelData(data.filter(filterFn(activeTab)));
    }
  }, [activeTab, data]);

  return (
    <div className="w-full h-full flex flex-col bg-white border-l border-gray-100 rounded-2xl p-6">
      {/* 审查项分类 Tabs */}
      <ReviewPanelTab activeTab={activeTab} onTabChange={setActiveTab}></ReviewPanelTab>

      {/* 审查结果列表 */}
      <div className="flex-1 overflow-y-auto -mr-4 pr-4">
        {' '}
        {/* 负边距和填充用于自定义滚动条区域 */}
        {reviewItemsData.map((item, index) => (
          <ReviewCard allowRevise={fileType !== 'f'} key={item.id} index={index} data={item} />
        ))}
        <div className="text-center text-gray-400 text-sm py-4">--- 审查项已加载完毕 ---</div>
      </div>
    </div>
  );
};
export default ReviewPanel;
