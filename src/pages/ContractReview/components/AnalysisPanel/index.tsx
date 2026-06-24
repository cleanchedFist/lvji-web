import { useMemo } from 'react';
import ClauseCard from './ClauseCard';
import DealNodesCard from './DealNodesCard';
import ObjectCard from './ObjectCard';
import PurposeCard from './PurposeCard';
import ViolateCard from './ViolateCard';

type ReviewAnalysisKey =
  | 'objectRule'
  | 'purposeRule'
  | 'violateRule'
  | 'dealNodesRule'
  | 'clauseRule';

export type ReviewAnalysisData = Record<ReviewAnalysisKey, any>;

// 合同标的

const formatFn = (data: string, key: string, defaultData: any) => {
  try {
    if (typeof data === 'string') {
      return JSON.parse(data)[key];
    } else {
      return data[key];
    }
  } catch (error) {
    return defaultData;
  }
};

const ReviewPanel = ({ data }: { data: ReviewAnalysisData }) => {
  // 合同标的
  const object = useMemo(() => {
    return formatFn(data?.objectRule, 'mdContent', '');
  }, [data]);

  // 交易流程
  const dealNodes = useMemo(() => {
    return formatFn(data?.dealNodesRule, 'dealNodes', []);
  }, [data]);

  // 合同目的
  const purpose = useMemo(() => {
    return formatFn(data?.purposeRule, 'objectives', []);
  }, [data]);

  // 违约责任
  const violate = useMemo(() => {
    return formatFn(data?.violateRule, 'contractParties', []);
  }, [data]);

  const clause = useMemo(() => {
    return formatFn(data?.clauseRule, 'contractClauses', []);
  }, [data]);

  return (
    <div className="w-full flex-1 flex-col  overflow-y-auto">
      <ObjectCard data={object} />
      <DealNodesCard data={dealNodes} />
      <ViolateCard data={violate} />
      <PurposeCard data={purpose} />
      <ClauseCard data={clause} />
    </div>
  );
};
export default ReviewPanel;
