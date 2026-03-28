import { getOrderList } from '@/services/ant-design-pro/api';
import useBalance from '@/utils/payment/useBalance';
import { useRequest } from '@umijs/max';
import { ArrowDownLeft, ArrowUpRight, ChevronRight, Clock, Loader2, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Mask from '../../Mask';
import AmountCard from './AmountCard';
import Pagination from './Pagination';

type OrderRecordsModalProps = {
  visible: boolean;
  onCancel: () => void;
};

type OrderItem = {
  afterBalance: number;
  amount: number;
  beforeBalance: number;
  createTime: number;
  id: number;
  note: '扫码支付充值到账';
  orderNo: string;
  txnType: string;
};

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 space-y-4">
      <Loader2 size={32} className="animate-spin text-indigo-500" />
      <p className="text-sm text-gray-400 font-medium">数据加载中...</p>
    </div>
  );
};

const OrderRecordsModal = ({ visible, onCancel }: OrderRecordsModalProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [orderList, setOrderList] = useState<OrderItem[]>([]);
  const [fullCount, setFullCount] = useState(0);
  const { updateBalance } = useBalance();

  const { run } = useRequest(getOrderList, {
    // 当接口请求成功时触发
    onSuccess: (data) => {
      if (data?.current) {
        setCurrentPage(data.current);
        setOrderList(data.records);
        setFullCount(data.total);
      }
      // 如果 setIsLoading 是为了手动控制 loading，这里可以关闭
      setIsLoading(false);
    },
  });

  const totalPages = useMemo(() => {
    return Math.ceil(fullCount / pageSize);
  }, [fullCount, pageSize]);

  // 模拟异步加载
  useEffect(() => {
    setIsLoading(true);
    run({ current: currentPage, size: pageSize });
  }, [currentPage]);

  const handleCancel = () => {
    onCancel();
    setCurrentPage(1);
    setIsLoading(false);
    setOrderList([]);
    setFullCount(0);
  };

  useEffect(() => {
    if (visible) {
      setIsLoading(true);
      updateBalance();
      run({ current: currentPage, size: pageSize });
    }
  }, [visible]);

  return (
    <Mask visible={visible}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col h-[750px]">
        {/* 头部区域 - 简化设计 */}
        <div className="p-6 border-b border-gray-100 bg-white shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800 tracking-tight">资金变动明细</h2>
              <p className="text-[12px] text-gray-600 mt-1">查看收支记录及余额变动详情</p>
            </div>
            <button
              type="button"
              onClick={handleCancel}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* 列表区域 */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50 relative">
          <AmountCard />

          <div className="flex justify-between items-center px-1">
            <p className="text-[12px] font-bold text-gray-600 uppercase tracking-widest">
              记录列表 ({fullCount})
            </p>
            {isLoading && (
              <div className="flex items-center gap-2 text-indigo-500 text-[10px] font-bold uppercase tracking-widest">
                <Loader2 size={12} className="animate-spin" /> 数据加载中
              </div>
            )}
          </div>

          {isLoading ? (
            <Loading />
          ) : (
            orderList.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-100 p-4 rounded-2xl hover:shadow-md hover:border-indigo-100 transition-all animate-in fade-in duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-xl ${
                        item.amount > 0
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-rose-50 text-rose-600'
                      }`}
                    >
                      {item.amount > 0 ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-800">{item.note}</h3>
                      <p className="text-[13px] text-gray-600 font-mono mt-0.5 tracking-tight">
                        单号: {item.orderNo}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-bold font-mono ${
                        item.amount > 0 ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {item.amount > 0 ? `+${item.amount.toFixed(2)}` : `${item.amount.toFixed(2)}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 leading-none">变更前</span>
                      <span className="text-sm font-mono text-gray-500">
                        ￥{item.beforeBalance.toFixed(2)}
                      </span>
                    </div>
                    <ChevronRight size={12} className="text-gray-200" />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 leading-none">变更后</span>
                      <span className="text-sm font-mono font-bold text-gray-700">
                        ￥{item.afterBalance.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <Clock size={12} />
                    <span className="text-[12px] font-medium">{formatDate(item.createTime)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 分页区域 */}
        <Pagination {...{ currentPage, totalPages, onPageChange: setCurrentPage, isLoading }} />
      </div>
    </Mask>
  );
};

export default OrderRecordsModal;
