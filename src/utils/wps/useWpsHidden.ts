import { useEffect, useRef, useState } from 'react';

export default function useWpsHidden() {
  const [showWps, setShowWps] = useState(true);
  // 使用 useRef 来持久化 timer ID
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startAutoHide = () => {
    // 在开启新定时器前，确保旧的已经被清除
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const start = +new Date();

    timerRef.current = setTimeout(() => {
      setShowWps(false);
    }, 20 * 60 * 1000);
  };

  const resetAutoHide = () => {
    setShowWps(true);
    // 直接调用 startAutoHide，内部会自动处理清理逻辑
    startAutoHide();
  };

  useEffect(() => {
    startAutoHide();

    // 清理函数
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []); // 注意：添加了空数组，表示仅在挂载时运行一次

  return {
    showWps,
    resetAutoHide,
  };
}
