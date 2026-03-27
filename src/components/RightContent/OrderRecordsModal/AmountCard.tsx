import PayModal, { PayModalHandle } from '@/components/PayModal';
import { useModel } from '@umijs/max';
import { Lock, Wallet } from 'lucide-react';
import { useRef } from 'react';

const AmountCard = () => {
  const { initialState } = useModel('@@initialState');

  const { availableBalance, frozenBalance } = initialState?.balance || {};
  const payModalRef = useRef<PayModalHandle>(null);

  return (
    <>
      {' '}
      <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-100 mb-6 relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />

        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
          {/* 可用余额 */}
          <div className="flex-1 flex items-center gap-4 w-full">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
              <Wallet size={24} />
            </div>
            <div>
              <p className="text-indigo-100 text-[10px] uppercase tracking-widest font-bold">
                当前可用余额
              </p>
              <p className="text-2xl font-bold font-mono">￥{availableBalance}</p>
            </div>
          </div>

          {/* 竖向分割线 */}
          <div className="hidden sm:block w-px h-10 bg-indigo-400/50" />
          <div className="block sm:hidden w-full h-px bg-indigo-400/50" />

          {/* 冻结金额 */}
          <div className="flex-1 flex items-center gap-4 w-full">
            <div className="p-3 bg-black/10 rounded-2xl backdrop-blur-sm">
              <Lock size={20} className="text-indigo-200" />
            </div>
            <div>
              <p className="text-indigo-200 text-[10px] uppercase tracking-widest font-bold">
                冻结中金额
              </p>
              <p className="text-xl font-bold font-mono text-indigo-50">￥{frozenBalance}</p>
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
