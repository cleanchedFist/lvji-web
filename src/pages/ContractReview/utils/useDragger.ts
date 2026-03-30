import { useCallback, useEffect, useState } from 'react';

const useDragger = (containerRef: any) => {
  const [leftWidth, setLeftWidth] = useState(60);
  const [isDragging, setIsDragging] = useState(false);

  const startDragging = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const stopDragging = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onDrag = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;

      // 限制范围，防止某一侧完全消失 (20% - 80%)
      if (newLeftWidth > 20 && newLeftWidth < 80) {
        setLeftWidth(newLeftWidth);
      }
    },
    [isDragging],
  );

  useEffect(() => {
    if (isDragging) {
      console.log(1);
      window.addEventListener('mousemove', onDrag);
      window.addEventListener('mouseup', stopDragging);
    } else {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', stopDragging);
    }
    return () => {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', stopDragging);
    };
  }, [isDragging, onDrag, stopDragging]);
  return {
    leftWidth,
    isDragging,
    startDragging,
  };
};

export default useDragger;
