import { useEffect, useRef } from 'react';

let openMaskCount = 0;

const Mask = ({ children, visible }: { children: React.ReactNode; visible: boolean }) => {
  const isLockedByThisInstance = useRef<boolean>(false);
  useEffect(() => {
    if (visible && !isLockedByThisInstance.current) {
      openMaskCount++;
      isLockedByThisInstance.current = true;
      if (openMaskCount === 1) {
        document.body.style.overflow = 'hidden';
      }
    } else if (!visible && isLockedByThisInstance.current) {
      openMaskCount--;
      isLockedByThisInstance.current = false; // 释放标记
      if (openMaskCount === 0) {
        document.body.style.overflow = '';
      }
    }
  }, [visible]);

  useEffect(() => {
    return () => {
      // 这里执行销毁时的操作
      document.body.style.overflow = '';
    };
  }, []);
  return (
    <div
      className={`${
        visible ? '' : 'hidden'
      } fixed 222 !m-0 inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-4`}
    >
      {children}
    </div>
  );
};

export default Mask;
