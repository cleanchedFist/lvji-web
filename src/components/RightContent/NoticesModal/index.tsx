import { useModel } from '@umijs/max';
import { ArrowLeft, Bell, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import Mask from '../../Mask';
import NoticeDetailCard from './NoticeDetailCard';
import NoticeList from './NoticeList';

const NoticesModal = ({ visible, onCancel }: { visible: boolean; onCancel: () => void }) => {
  const [activeNotice, setActiveNotice] = useState<API.NoticeItem | null>(null);
  const notices = useModel('@@initialState', (model) => model.initialState?.notices);

  const unreadCount = useMemo(() => {
    return notices?.filter((i) => !i.isRead)?.length || 0;
  }, [notices]);

  return (
    <Mask visible={visible}>
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[82vh] flex flex-col overflow-hidden border border-slate-100 relative z-10 transform scale-100 transition-all duration-300">
        {/* 彩色顶部色条指示 */}
        <div className="h-[8px] rounded-t-3xl w-full bg-gradient-to-r from-indigo-500 to-indigo-600 flex-shrink-0" />
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          {activeNotice ? (
            /* 详情态返回栏 */
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setActiveNotice(null)}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors"
                title="返回列表"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h3 className="font-extrabold text-slate-800 text-xl">通知详情解析</h3>
                <p className="text-[14px] text-slate-400 mt-0.5">返回上一层列表</p>
              </div>
            </div>
          ) : (
            /* 列表态头部 */
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl relative">
                <Bell className="w-4.5 h-4.5" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full"></span>
                )}
              </div>
              <div>
                <h3 className="font-extrabold text-slate-800 text-xl">通知中心</h3>
                <p className="text-[14px] text-slate-400 mt-0.5">未读消息 {unreadCount} 条</p>
              </div>
            </div>
          )}

          {/* 右上角关闭 */}
          <button
            type="button"
            onClick={() => {
              onCancel();
              setActiveNotice(null);
            }}
            className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {!activeNotice && (
          <NoticeList
            unreadCount={unreadCount}
            notices={notices || []}
            handleSelect={setActiveNotice}
          />
        )}
        {activeNotice && (
          <NoticeDetailCard notice={activeNotice} onBack={() => setActiveNotice(null)} />
        )}
      </div>
    </Mask>
  );
};
export default NoticesModal;
