import {
  getContractReviewResult,
  queryFileId,
  queryReviewStatus,
} from '@/services/ant-design-pro/api';
import { useRequest } from '@umijs/max';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ReviewAnalysisData } from '../components/AnalysisPanel';
import { ReviewData } from '../components/ReviewPanel';
import { DEFAULT_TASK_QUEUE, taskStep } from './taskQueue';

const POLL_INTERVAL = 15000; // 15秒

const useRequestFetch = (reviewId: string) => {
  const STORAGE_KEY = `review_process_${reviewId}`;

  const stepTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pollTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const { data: fileId } = useRequest(() => queryFileId(+reviewId));

  const [reviewChunkRespDTOList, setReviewChunkRespDTOList] = useState<ReviewData[]>([]);
  const [reviewResultNewRespDTO, setReviewResultNewRespDTO] = useState<ReviewAnalysisData>(
    {} as ReviewAnalysisData,
  );
  const [reviewStatus, setReviewStatus] = useState();

  // 这里返回的是用于localstorage的数据
  const [currentStep, setCurrentStep] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    return 0;
  });

  // --- 逻辑: 计算 UI 渲染状态 (支持 Finished, Pending, Waiting) ---
  const displayGroups = useMemo(() => {
    return DEFAULT_TASK_QUEUE.map((group, gIdx) => {
      const currentActiveIdx = taskStep[currentStep][gIdx] ?? 0;
      return {
        ...group,
        taskList: group.taskList.map((task, tIdx) => {
          let status = 'waiting'; // 等待中
          if (tIdx < currentActiveIdx) {
            status = 'finished'; // 已完成
          } else if (tIdx === currentActiveIdx) {
            status = 'pending'; // 进行中
          }
          return { ...task, status, label: `${gIdx + 1}-${tIdx + 1}` };
        }),
      };
    });
  }, [currentStep]);

  useEffect(() => {
    if (reviewStatus === 0) {
      getContractReviewResult(reviewId).then(({ data }) => {
        localStorage.removeItem(STORAGE_KEY);
        setReviewChunkRespDTOList(data.reviewChunkRespDTOList);
        setReviewResultNewRespDTO(data.reviewResultNewRespDTO);
      });
    }
  }, [reviewStatus]);

  const runPolling = async () => {
    if (!isLoading) return;

    try {
      console.log('Fetching API status...');
      // 模拟异步请求
      const { data: reviewStatus } = await queryReviewStatus(+reviewId);

      setReviewStatus(reviewStatus);

      if (reviewStatus === 1) {
        setIsLoading(true);
        return;
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      // 无论成功还是失败，只要还在轮询状态，就在请求结束后等待 15s 再执行下一次
      if (isLoading) {
        pollTimerRef.current = setTimeout(runPolling, POLL_INTERVAL);
      }
    }
  };

  useEffect(() => {
    return localStorage.setItem(STORAGE_KEY, currentStep);
  }, [currentStep]);

  useEffect(() => {
    if (!isLoading) {
      if (stepTimerRef.current) clearInterval(stepTimerRef.current);
      if (pollTimerRef.current) clearTimeout(pollTimerRef.current);
      localStorage.setItem(STORAGE_KEY, currentStep);
      return;
    }

    // 开启文案步进：每15秒，所有组同时向下推进一个子任务
    stepTimerRef.current = setInterval(() => {
      setCurrentStep((prev: number) => {
        if (prev === taskStep.length - 1) {
          return prev;
        }
        return prev + 1;
      });
    }, 10000);

    // 开启 API 轮询
    runPolling();

    return () => {
      if (stepTimerRef.current) clearInterval(stepTimerRef.current);
      if (pollTimerRef.current) clearTimeout(pollTimerRef.current);
    };
  }, [isLoading]);

  // 1.4. 返回组件需要使用的值
  return {
    fileId,
    isLoading,
    reviewChunkRespDTOList,
    reviewResultNewRespDTO,
    taskQueue: displayGroups,
    reviewStatus,
  };
};

export default useRequestFetch;
