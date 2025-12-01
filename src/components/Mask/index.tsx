import { useEffect } from 'react';

const Mask = ({ children, visible }: { children: React.ReactNode; visible: boolean }) => {
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [visible]);
  return (
    <div
      className={`${
        visible ? '' : 'hidden'
      } fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4`}
    >
      {children}
    </div>
  );
};

export default Mask;
