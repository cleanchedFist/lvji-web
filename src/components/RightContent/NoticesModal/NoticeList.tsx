import { deleteAllNotice, readAllNotice } from '@/services/ant-design-pro/api';
import useUpdateNotice from '@/utils/notice/useUpdateNotice';
import { Check, Inbox, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import NoticeListCard from './NoticeListCard';

const NoticeList = ({
  unreadCount,
  notices,
  handleSelect,
}: {
  unreadCount: number;
  notices: API.NoticeItem[];
  handleSelect: (notice: API.NoticeItem) => void;
}) => {
  const tabs = [
    { id: 'all', label: '全部', filter: (i: API.NoticeItem) => i },
    { id: 'unread', label: '未读', filter: (i: API.NoticeItem) => !i.isRead },
    // { id: 'system', label: '系统', filter: (i: API.NoticeItem) => i.type === 'notification' },
  ];

  const [filterCategory, setFilterCategory] = useState(tabs[0].id);
  const { updateNoticy } = useUpdateNotice();

  const filterNotices = useMemo(() => {
    const currentTab = tabs.filter((i) => i.id === filterCategory)[0];
    return notices.filter(currentTab.filter);
  }, [notices, filterCategory]);

  const handleMarkAllRead = () => {
    readAllNotice();
    updateNoticy();
  };
  const handleClearRead = () => {
    // 获取所有已读的id
    const ids = filterNotices.filter((i) => i.isRead === 1).map((i) => i.id);
    deleteAllNotice(ids);
    updateNoticy();
  };

  return (
    <div className="bg-white p-4 border-b border-slate-100 space-y-3 min-h-0 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between pb-0.5">
        <div className="flex items-center gap-1.5 overflow-x-auto  scrollbar-none">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              className={`px-3 py-1 rounded-full text-[12px] font-semibold transition-all shrink-0 ${
                filterCategory === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-slate-500 border border-slate-200/80 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={handleMarkAllRead}
            disabled={unreadCount === 0}
            className="px-2.5 py-1.5 text-[12px] font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 disabled:opacity-40 rounded-md transition-all flex items-center gap-1"
            title="一键全部已读"
          >
            <Check className="w-4 h-4" />
            一键已读
          </button>
          <button
            type="button"
            onClick={handleClearRead}
            className="px-2.5 py-1.5 text-[12px] font-bold text-slate-500 hover:text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-md transition-all flex items-center gap-1"
            title="清空已读通知"
          >
            <Trash2 className="w-4 h-4" />
            清空已读通知
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 bg-slate-50/30 gap-4 no-scrollbar">
        {filterNotices.length === 0 && (
          <div className="py-8 text-center">
            <div className="rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
              <Inbox className="w-16 h-16" />
            </div>
            <h4 className="text-lg font-bold text-slate-600">无符合条件的通知</h4>
            <p className="text-sm text-slate-400 mt-1">没有找到相关的通知或未读动态</p>
          </div>
        )}

        {filterNotices.length > 0 &&
          filterNotices.map((i) => (
            <NoticeListCard key={i.id} notice={i} handleSelect={handleSelect} />
          ))}
      </div>
    </div>
  );
};
export default NoticeList;
