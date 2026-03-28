import PayModal, { PayModalHandle } from '@/components/PayModal';
import { useModel } from '@umijs/max';
import { Wallet } from 'lucide-react';
import { useRef } from 'react';

const AmountCard = () => {
  const { initialState } = useModel('@@initialState');

  const { availableBalance, frozenBalance, totalBalance } = initialState?.balance || {};
  const payModalRef = useRef<PayModalHandle>(null);

  return (
    <>
      <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-100 mb-6 relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />

        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
          {/* 左侧：总余额 (核心突出) */}
          <div className="flex items-center gap-4 flex-1">
            <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-md">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-indigo-100 text-sm mb-1 opacity-80">账户总余额</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-medium">¥</span>
                <span className="text-4xl font-bold tracking-tight">{totalBalance}</span>
              </div>
            </div>
          </div>

          {/* 中间：分隔线 */}
          <div className="w-px h-12 bg-white/50"></div>

          {/* 中间/右侧数据区域：可用与冻结 */}
          <div className="flex flex-1 justify-around md:justify-start md:gap-6 w-full md:w-auto">
            {/* 可用余额 */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <p className="text-indigo-100 text-xs">可用余额</p>
              </div>
              <p className="text-2xl font-semibold">¥ {availableBalance}</p>
            </div>

            {/* 冻结金额 */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                <p className="text-indigo-100 text-xs">冻结中金额</p>
              </div>
              <p className="text-2xl font-semibold opacity-90">¥ {frozenBalance}</p>
            </div>
          </div>

          <button
            type="button"
            className="w-full sm:w-auto bg-white text-indigo-600 px-6 py-2.5 rounded-2xl text-xs font-bold hover:bg-indigo-50 transition-all active:scale-95 shadow-lg shadow-black/5 shrink-0"
            onClick={() => payModalRef.current?.show?.()}
          >
            立即充值
          </button>
        </div>
      </div>
      <PayModal ref={payModalRef} />
    </>
  );
};
export default AmountCard;
