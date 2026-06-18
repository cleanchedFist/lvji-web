import { readNotice } from '@/services/ant-design-pro/api';
import useUpdateNotice from '@/utils/notice/useUpdateNotice';
const NoticeDetailCard = ({ notice, onBack }: { notice: API.NoticeItem; onBack: () => void }) => {
  const { updateNoticy } = useUpdateNotice();
  const handleMarkAsRead = async (id: string) => {
    await readNotice(id);
    await updateNoticy();
    onBack();
  };
  return (
    <div className="animate-fadeIn p-6">
      <h4 className="text-base font-extrabold text-slate-900 leading-snug mb-1">{notice.title}</h4>
      {/* 详情页头部标头 */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[12px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider bg-indigo-100 text-indigo-700">
          系统动态
        </span>
        <span className="text-[12px] text-slate-400 font-medium">{notice.createTime}</span>
      </div>

      {/* 说明卡片 */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-1">
        <span className="text-[12px] text-indigo-500 font-bold tracking-wide uppercase">
          通知内容
        </span>
        <p className="text-md text-slate-600 leading-relaxed font-medium">{notice.content}</p>
      </div>

      {/* 详情动作操作栏 */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => {
            handleMarkAsRead(notice.id);
          }}
          className="px-4 py-2.5 text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all"
        >
          标记已读并返回
        </button>
      </div>
    </div>
  );
};
export default NoticeDetailCard;
