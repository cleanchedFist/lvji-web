import { message } from 'antd';
import { useEffect, useState } from 'react';
import { ReviewAnalysisData } from '../components/AnalysisPanel';
import { ReviewData } from '../components/ReviewPanel';

const UseWebsockFetch = (id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fileId, setFileId] = useState();
  const [taskQueue, setTaskQueue] = useState([]);
  const [reviewChunkRespDTOList, setReviewChunkRespDTOList] = useState<ReviewData[]>([]);
  const [reviewResultNewRespDTO, setReviewResultNewRespDTO] = useState<ReviewAnalysisData>(
    {} as ReviewAnalysisData,
  );

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    const wsParams = localStorage.getItem('reviewParams');
    if (!token || !wsParams) {
      return;
    }

    const protocol = window.location.protocol;
    const hostName = window.location.hostname;
    const ws = new WebSocket(
      `${
        protocol === 'https:' ? 'wss' : 'ws'
      }://${hostName}/api/llm-service/review-contract/${id}?Authorization=${token.slice(7)}`,
    );
    ws.onopen = function () {
      ws.send(wsParams);
    };
    ws.onmessage = function (evt) {
      const data = JSON.parse(evt.data);
      console.log('onmessage', data);
      // 返回解析结果
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
          ws.close();
        }
        setIsLoading(!data.status);
        setTaskQueue(data.taskQueue);
      }
    };
    ws.onerror = function (e) {
      message.error('ws 接口报错了');
      console.log('ws 接口报错了', e);
    };
    ws.onclose = function () {
      //   message.error('ws 断开了');
      console.log('ws 断开了');
    };
    return () => {
      ws.close();
    };
  }, [id]);

  // 1.4. 返回组件需要使用的值
  return { fileId, isLoading, reviewChunkRespDTOList, reviewResultNewRespDTO, taskQueue };
};

export default UseWebsockFetch;
