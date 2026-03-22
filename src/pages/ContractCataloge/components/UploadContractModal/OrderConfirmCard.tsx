import PayModal, { PayModalHandle } from '@/components/PayModal';
import { AlertCircle, CheckCircle2, PlusCircle, Wallet } from 'lucide-react';
import { useRef } from 'react';
import { useModel } from 'umi';

type OrderConfirmCardProps = {
  totalPrice: number | string;
  fileName: string;
  wordCount: number;
};
const OrderConfirmCard = ({ totalPrice, fileName, wordCount }: OrderConfirmCardProps) => {
  const payModalRef = useRef<PayModalHandle>(null);
  const { initialState } = useModel('@@initialState');
  const { balance } = initialState || {};
  const isBalanceEnough = +(balance?.availableBalance || '') >= +totalPrice;
  const remainingBalance = +(balance?.totalBalance || '') - +totalPrice;
  const handleRecharge = () => payModalRef.current?.show();
  return (
    <>
      <div
        className={`border rounded-2xl p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-400 ${
          isBalanceEnough ? 'bg-indigo-50/50 border-indigo-100' : 'bg-red-50/50 border-red-100'
        }`}
      >
        <div className="flex items-center justify-between mb-5">
          <div
            className={`flex items-center gap-2 font-semibold ${
              isBalanceEnough ? 'text-indigo-700' : 'text-red-700'
            }`}
          >
            <Wallet size={18} />
            <span className="text-sm">账户余额结算</span>
          </div>
          {!isBalanceEnough && (
            <button
              type="button"
              onClick={handleRecharge}
              className="flex items-center gap-1 text-[11px] bg-red-600 text-white px-3 py-1 rounded-full font-medium hover:bg-red-700 transition-colors shadow-sm"
            >
              <PlusCircle size={12} /> 立即充值
            </button>
          )}
          {isBalanceEnough && (
            <div className="text-[10px] bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-md font-medium">
              自动扣款模式
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">当前可用余额</span>
            <span
              className={`font-medium font-mono ${
                isBalanceEnough ? 'text-gray-700' : 'text-red-600'
              }`}
            >
              ￥{(+(balance?.availableBalance || '')).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">
              本次服务费({fileName} - {wordCount}字)
            </span>
            <span className="shrink-0 text-gray-700 font-medium font-mono ml-8">
              - ￥{(+totalPrice).toFixed(2)}
            </span>
          </div>

          <div
            className={`mt-4 pt-4 border-t flex justify-between items-baseline ${
              isBalanceEnough ? 'border-indigo-100' : 'border-red-100'
            }`}
          >
            <div className="space-y-1">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">结算后剩余余额</p>
              <p
                className={`text-lg font-bold font-mono ${
                  isBalanceEnough ? 'text-gray-800' : 'text-red-500'
                }`}
              >
                ￥{remainingBalance.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p
                className={`text-[10px] uppercase tracking-wider font-bold ${
                  isBalanceEnough ? 'text-indigo-400' : 'text-red-400'
                }`}
              >
                应付总计
              </p>
              <p
                className={`text-3xl font-bold font-mono leading-none ${
                  isBalanceEnough ? 'text-indigo-600' : 'text-red-600'
                }`}
              >
                ￥{(+totalPrice).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {!isBalanceEnough && (
          <div className="mt-5 flex items-start gap-2 p-3 bg-white/60 rounded-xl border border-red-100 text-[11px] text-red-600">
            <AlertCircle size={14} className="shrink-0 text-red-500" />
            <p>您的余额不足以支付本次服务费，请充值后继续提交。</p>
          </div>
        )}

        {isBalanceEnough && (
          <div className="mt-5 flex items-center gap-2 p-3 bg-white/60 rounded-xl border border-indigo-50 text-[14px]">
            <CheckCircle2 size={14} className="shrink-0 text-emerald-500" />
            <p>律师处理完成后将从余额中自动划扣。提交订单后无法撤销。</p>
          </div>
        )}
      </div>
      <PayModal baseAmount={+totalPrice} ref={payModalRef} />
    </>
  );
};

export default OrderConfirmCard;
