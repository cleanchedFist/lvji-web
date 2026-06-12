import { formatTime } from '@/utils/formatTime';
const NoticeListCard = ({
  notice,
  handleSelect,
}: {
  notice: API.NoticeItem;
  handleSelect: (notice: API.NoticeItem) => void;
}) => {
  const handleMarkAsRead = (id: string) => {
    console.log(id);
  };
  const handleDeletenotice = (id: string) => {
    console.log(id);
  };

  return (
    <div
      key={notice.id}
      onClick={() => {
        console.log(333);
        handleSelect(notice); // 进入详情
        if (!notice.read) {
          handleMarkAsRead(notice.id);
        }
      }}
      className={`p-4 rounded-2xl border transition-all cursor-pointer relative group mb-2 ${
        notice.read
          ? 'bg-white border-slate-100 hover:border-slate-200/80 hover:shadow-xs'
          : 'bg-indigo-50/20 border-indigo-100 hover:border-indigo-200 hover:shadow-xs shadow-xs'
      }`}
    >
      {/* 未读状态指示灯 */}
      {!notice.read && (
        <span className="absolute top-4 left-2.5 w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
      )}

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider bg-indigo-100 text-indigo-700">
            系统
          </span>
          <span className="text-[12px] text-slate-400 font-medium">
            {formatTime(notice.createTimeStamp)}
          </span>
        </div>

        <h4
          className={`text-md font-bold text-slate-800 leading-snug line-clamp-1 group-hover:text-indigo-600 transition-colors ${
            !notice.read ? 'text-slate-900 font-extrabold' : ''
          }`}
        >
          {notice.title}
        </h4>

        <p className="text-[12px] text-slate-500 leading-relaxed line-clamp-2">{notice.content}</p>

        {/* 动作处理面板 */}
        <div className="pt-2 border-t border-slate-100/50 flex justify-end items-center text-[12px]">
          {/* <span className="text-slate-400 font-medium flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    {notice.details?.contractName || '系统服务'}
                </span> */}
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            {!notice.read && (
              <button
                type="button"
                onClick={() => handleMarkAsRead(notice.id)}
                className="text-indigo-600 hover:text-indigo-700 font-bold transition-colors"
              >
                标记已读
              </button>
            )}
            <button
              type="button"
              onClick={() => handleDeletenotice(notice.id)}
              className="text-slate-400 hover:text-rose-600 font-bold transition-colors"
            >
              删除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeListCard;
