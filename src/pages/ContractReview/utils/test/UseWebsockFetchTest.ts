import { useEffect, useState } from 'react';
import { ReviewAnalysisData } from '../components/AnalysisPanel';
import { ReviewData } from '../components/ReviewPanel';
import templateJson from './websockReturnDemo.json';

const UseWebsockFetch = (id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fileId, setFileId] = useState();
  const [taskQueue, setTaskQueue] = useState([]);
  const [reviewChunkRespDTOList, setReviewChunkRespDTOList] = useState<ReviewData[]>([]);
  const [reviewResultNewRespDTO, setReviewResultNewRespDTO] = useState<ReviewAnalysisData>(
    {} as ReviewAnalysisData,
  );

  const formatData = (data: any[]) => {
    data.forEach((data: any) => {
      if (data.type) {
        if (data.type === 'file') {
          setFileId(data.fileId);
        } else if (data.type === '合同标的') {
          setReviewResultNewRespDTO((v) => {
            v.objectRule = { mdContent: data.mdContent };
            return v;
          });
        } else if (data.type === '目的审查') {
          //objective：标题 conditions：条件
          setReviewResultNewRespDTO((v) => {
            v.purposeRule = { objectives: data.objectives };
            return v;
          });
        } else if (data.type === '违约责任审查') {
          // contractee contractor : party responsibilities: [{condition, consequence, detail, original}]
          // setWy(data.contractParties);
          setReviewResultNewRespDTO((v) => {
            v.violateRule = { contractParties: data.contractParties };
            return v;
          });
        } else if (data.type === '程序性条款审查') {
          // contractClauses: [{clauseName, original, reviewResult, riskLevel, reviewBasics: [{type, detail, description}]}]
          //   setCx(data.contractClauses);
        } else if (data.type === '交易流程') {
          //nodeName firstParty secondParty
          setReviewResultNewRespDTO((v) => {
            v.dealNodesRule = { dealNodes: data.dealNodes };
            return v;
          });
        }
      }
      // 返回审查结果
      if (data.reviewType) {
        setReviewChunkRespDTOList((v) => v.concat([data]));
      }
      if (data.taskQueue) {
        if (data.status) {
        }
        setIsLoading(!data.status);
        setTaskQueue(data.taskQueue);
      }
    });
  };

  useEffect(() => {
    setFileId(392);

    const firstStep = [templateJson[1]];
    formatData(firstStep);
    setTimeout(() => {
      formatData(templateJson);
    }, 10000000);
  }, [id]);

  // 1.4. 返回组件需要使用的值
  return { fileId, isLoading, reviewChunkRespDTOList, reviewResultNewRespDTO, taskQueue };
};

export default UseWebsockFetch;
