import { getPayStatus } from '@/services/ant-design-pro/api';
import { useEffect, useRef, useState } from 'react';

function usePaymentPolling(orderNo: string, onUpdate: (status: string) => void) {
  const [status, setStatus] = useState('PENDING');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopPolling = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  useEffect(() => {
    // 如果没有单号，不启动轮询
    if (!orderNo) return;

    const poll = async () => {
      try {
        const { data } = await getPayStatus(orderNo);

        setStatus(data.status);
        onUpdate?.(data.status); // 触发外部回调
        if (data.status !== 'PENDING') {
          return; // 终态，停止递归
        }

        // pendding 状态继续沦陷
        timerRef.current = setTimeout(poll, 3000);
      } catch (err) {
        timerRef.current = setTimeout(poll, 5000); // 容错处理
      }
    };

    poll();

    // 关键：组件卸载或 orderNo 变化时清除定时器，防止内存泄漏
    return stopPolling;
  }, [orderNo]); // 依赖项：单号变了重新启动

  return { status };
}

export default usePaymentPolling;
