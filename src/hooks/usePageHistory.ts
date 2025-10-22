import { useCallback, useRef } from 'react';

// 自定义 Hook 来跟踪页面历史
function usePageHistory() {
  const historyRef = useRef([window.location.pathname]);

  const trackPageChange = useCallback((newPathname: string) => {
    const history = historyRef.current;
    const previousPath = history[history.length - 1];

    // 只有当路径真正改变时才更新历史
    if (newPathname !== previousPath) {
      historyRef.current = [...history, newPathname];
    }

    return {
      currentPath: newPathname,
      previousPath: previousPath,
      history: historyRef.current,
    };
  }, []);

  return trackPageChange;
}

export default usePageHistory;
