import { contractView } from '@/services/ant-design-pro/api';
import { useEffect, useState } from 'react';
import { ReviewAnalysisData } from '../components/AnalysisPanel';
import { LoadingTask } from '../components/ReviewLodaing';
import { ReviewData } from '../components/ReviewPanel';

const defaultTaskQueue: LoadingTask[] = [
  {
    name: '合同结构分析',
    taskList: [
      { status: true, message: '识别合同中的所有条款' },
      { status: true, message: '分析条款性质' },
      { status: false, message: '查找数据库中的合同分类特征' },
    ],
  },
  {
    name: '合同结构分析',
    taskList: [
      { status: true, message: '识别合同中的所有条款' },
      { status: true, message: '分析条款性质' },
      { status: false, message: '查找数据库中的合同分类特征' },
    ],
  },
  {
    name: '合同结构分析',
    taskList: [
      { status: true, message: '识别合同中的所有条款' },
      { status: true, message: '分析条款性质' },
      { status: false, message: '查找数据库中的合同分类特征' },
    ],
  },
];

const useRequestFetch = (id: string) => {
  const [isLoading] = useState(false);
  const [fileId, setFileId] = useState();
  const [taskQueue] = useState<LoadingTask[]>(defaultTaskQueue);
  const [reviewChunkRespDTOList, setReviewChunkRespDTOList] = useState<ReviewData[]>([]);
  const [reviewResultNewRespDTO, setReviewResultNewRespDTO] = useState<ReviewAnalysisData>(
    {} as ReviewAnalysisData,
  );

  useEffect(() => {
    contractView(id).then(({ data }) => {
      setFileId(data.fileId);
      setReviewChunkRespDTOList(data.reviewChunkRespDTOList);
      setReviewResultNewRespDTO(data.reviewResultNewRespDTO);
    });
  }, [id]);

  // 1.4. 返回组件需要使用的值
  return { fileId, isLoading, reviewChunkRespDTOList, reviewResultNewRespDTO, taskQueue };
};

export default useRequestFetch;
