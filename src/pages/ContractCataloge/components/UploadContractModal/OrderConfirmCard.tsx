import PayModal, { PayModalHandle } from '@/components/PayModal';
import { AlertCircle, PlusCircle, Wallet } from 'lucide-react';
import { useMemo, useRef } from 'react';
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
  const remainingBalance = +(balance?.availableBalance || '') - +totalPrice;
  const handleRecharge = () => payModalRef.current?.show?.();
  const isTooLong = wordCount > 25000;

  const themeMap = {
    normal: {
      cardBg: 'bg-indigo-50/50',
      cardBorder: 'border-indigo-100',
      titleColor: 'text-indigo-700',
      badgeClass: 'bg-indigo-100 text-indigo-600',
      badgeText: '自动扣款模式',
      balanceColor: 'text-gray-700',
      wordColor: 'text-gray-500',
      serviceColor: 'text-gray-700',
      dividerColor: 'border-indigo-100',
      remainColor: 'text-gray-800',
    },
    insufficient: {
      cardBg: 'bg-red-50/50',
      cardBorder: 'border-red-100',
      titleColor: 'text-red-700',
      badgeClass: 'bg-red-100 text-red-600',
      badgeText: '立即充值',
      balanceColor: 'text-red-600',
      wordColor: 'text-gray-500',
      serviceColor: 'text-gray-700',
      dividerColor: 'border-red-100',
      remainColor: 'text-red-500',
    },
    overlimit: {
      cardBg: 'bg-red-50/50',
      cardBorder: 'border-red-100',
      titleColor: 'text-red-700',
      badgeClass: 'bg-red-100 text-red-600',
      badgeText: '字数超出限制',
      balanceColor: 'text-gray-700',
      wordColor: 'text-red-600',
      serviceColor: 'text-red-600',
      dividerColor: 'border-red-100',
      remainColor: 'text-red-500',
    },
  };

  const theme = useMemo(() => {
    if (isTooLong) {
      return themeMap.overlimit;
    } else if (!isBalanceEnough) {
      return themeMap.insufficient;
    }
    return themeMap.normal;
  }, [isBalanceEnough, isTooLong]);

  return (
    <>
      <div
        className={`border rounded-2xl p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-400 ${theme.cardBg} ${theme.cardBorder}`}
      >
        <div className="flex items-center justify-between mb-5">
          <div className={`flex items-center gap-2 font-semibold ${theme.titleColor}`}>
            <Wallet size={18} />
            <span className="text-sm">账户余额结算</span>
          </div>
          {!isBalanceEnough && !isTooLong && (
            <button
              type="button"
              onClick={handleRecharge}
              className="flex items-center gap-1 text-[11px] bg-red-600 text-white px-3 py-1 rounded-full font-medium hover:bg-red-700 transition-colors shadow-sm"
            >
              <PlusCircle size={12} /> 立即充值
            </button>
          )}
          {(isBalanceEnough || isTooLong) && (
            <div className={`text-[10px] ${theme.badgeClass} px-2 py-0.5 rounded-md font-medium`}>
              {theme.badgeText}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">当前冻结余额</span>
            <span className="font-medium font-mono text-gray-700">
              ￥{(+(balance?.frozenBalance || '')).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">当前可用余额</span>
            <span className={`font-medium font-mono ${theme.balanceColor}`}>
              ￥{(+(balance?.availableBalance || '')).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">
              本次服务费({fileName} - <span className={theme.wordColor}>{wordCount}字</span>)
            </span>
            <span className={`shrink-0 ${theme.serviceColor} font-medium font-mono ml-8`}>
              - {isTooLong ? '暂不可计算' : `￥${(+totalPrice).toFixed(2)}`}
            </span>
          </div>

          <div
            className={`mt-4 pt-4 border-t flex justify-between items-baseline ${theme.dividerColor}`}
          >
            <div className="space-y-1">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">结算后剩余余额</p>
              <p className={`text-lg font-bold font-mono ${theme.remainColor}`}>
                ￥{isTooLong ? '-' : remainingBalance.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className={`text-[10px] uppercase tracking-wider font-bold ${theme.remainColor}`}>
                应付总计
              </p>
              <p className={`text-3xl font-bold font-mono leading-none ${theme.remainColor}`}>
                ￥{isTooLong ? '-' : (+totalPrice).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {(!isBalanceEnough || isTooLong) && (
          <div className="mt-5 flex items-start gap-2 p-3 bg-white/60 rounded-xl border border-red-100 text-[11px] text-red-600">
            <AlertCircle size={14} className="shrink-0 text-red-500" />
            {!isBalanceEnough && <p>您的余额不足以支付本次服务费，请充值后继续提交。</p>}
            {isTooLong && (
              <p>字数已超过 25,000 字上限（当前合同：{wordCount}字）。请缩减内容或分批上传。</p>
            )}
          </div>
        )}
      </div>
      <PayModal defaultAmount={-remainingBalance} ref={payModalRef} />
    </>
  );
};

export default OrderConfirmCard;
