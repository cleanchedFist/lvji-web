import { useModel } from '@umijs/max';
import { Check, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { useMemo, useState } from 'react';

const NoticeCard = ({ notices }: { notices: API.NoticeItem[] }) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [currentNotifIndex, setCurrentNotifIndex] = useState(0);

  const currentNotif = useMemo(() => {
    return { ...notices[currentNotifIndex], checked: true };
  }, [currentNotifIndex, notices]);

  const handleAcknowledge = (id: string) => {
    const current = initialState?.notices?.filter((i) => i.id !== id) || [];
    setInitialState((preInitialState) => ({
      ...preInitialState,
      notices: current,
    }));
  };

  return (
    <div className="w-[800px] relative  z-10 flex flex-col items-center">
      {notices.length > 2 && (
        <div className="absolute w-[90%] h-24 bg-white/40 rounded-2xl shadow-sm border border-white/20 transform -translate-y-8 scale-90 blur-[1px] -z-20" />
      )}
      {notices.length > 1 && (
        <div className="absolute w-[95%] h-24 bg-white/70 rounded-2xl shadow-md border border-white/30 transform -translate-y-4 scale-95 blur-[0.5px] -z-10" />
      )}

      {/* 主卡片 */}
      <div className="w-full bg-white rounded-3xl shadow-2xl border border-indigo-200 overflow-hidden transform transition-all duration-300 scale-100">
        <div className="h-2.5 w-full bg-gradient-to-r from-indigo-500 to-indigo-600" />

        {/* 核心内容区 */}
        <div className="p-8 space-y-6">
          {/* 标题 & 类型徽章 */}
          <div className="flex gap-4 items-start">
            <div className="p-3 rounded-2xl shadow-inner shrink-0 bg-indigo-100 text-indigo-700">
              <Info size={28} />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold tracking-wider px-2 py-0.5 rounded-full uppercase bg-indigo-100 text-indigo-700">
                  系统更新
                </span>
                <span className="text-xs text-slate-400 font-medium">{currentNotif.datetime}</span>
              </div>
              <h3 className="text-lg font-extrabold text-slate-800 leading-snug">
                {currentNotif.title}
              </h3>
            </div>
          </div>

          {/* 具体文本内容 */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
            <p className="text-sm text-slate-600 leading-relaxed font-normal whitespace-pre-line">
              {currentNotif.description}
            </p>
          </div>
        </div>

        {/* 翻页切换与控制区 */}
        <div className="flex items-center justify-between px-8 py-4 border-t border-slate-100">
          {/* 多条通知指示器 */}
          <div className="flex items-center gap-2">
            {notices.length > 1 && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setCurrentNotifIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentNotifIndex === 0}
                  className="p-1 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent rounded-lg text-slate-600 transition"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-xs text-slate-500 font-bold">
                  {currentNotifIndex + 1} / {notices.length}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setCurrentNotifIndex((prev) => Math.min(notices.length - 1, prev + 1))
                  }
                  disabled={currentNotifIndex === notices.length - 1}
                  className="p-1 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent rounded-lg text-slate-600 transition"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
            {notices.length === 1 && (
              <span className="text-xs text-slate-400 font-medium">最后 1 条紧急通知</span>
            )}
          </div>

          {/* 处理确认动作按钮 */}
          <button
            type="button"
            onClick={() => handleAcknowledge(currentNotif.id)}
            className="px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Check size={16} />
            <span>我知道了</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default NoticeCard;
