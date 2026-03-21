import { AlertCircle, Check, CreditCard, X } from 'lucide-react';
import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';
import Mask from '../Mask';
import PayOrderBox, { PayOrderBoxHandler } from './PayOrderBox';

export interface PayModalHandle {
  show: () => void;
  hide: () => void;
}

type PayModalProps = {
  baseAmount?: number;
};

const PayModal = forwardRef(({ baseAmount }: PayModalProps, ref) => {
  const payOrderBoxRef = useRef<PayOrderBoxHandler>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('WECHAT'); // 'WECHAT' or 'ALIPAY'
  const [selectedAmount, setSelectedAmount] = useState<null | number>(baseAmount || 100);
  const [customAmount, setCustomAmount] = useState<number | string>('');
  const quickAmounts = useMemo(() => {
    if (baseAmount && !isNaN(baseAmount)) {
      const result = [baseAmount];
      const count = 6;
      // 1. 第二项：向上取整到最接近的 10 的倍数
      // Math.ceil(12.5 / 10) * 10 = 20
      let nextFifty = Math.floor(baseAmount / 50) * 50 + 50;
      // 填充剩余的槽位
      while (result.length < count) {
        result.push(nextFifty);
        nextFifty += 50;
      }

      return result;
    }
    // 默认情况
    return [10, 50, 100, 200, 500, 1000];
  }, [baseAmount]);

  const showPriceInfo = useMemo(() => {
    return !!(baseAmount && customAmount && +customAmount < baseAmount);
  }, [baseAmount, customAmount]);

  const hideModal = () => {
    setSelectedAmount(100);
    setPaymentMethod('WECHAT');
    setCustomAmount(0);
    setIsModalOpen(false);
  };

  useImperativeHandle(ref, () => ({
    show() {
      setIsModalOpen(true);
    },
    hide() {
      hideModal();
    },
  }));

  const resetPaymentStatus = () => payOrderBoxRef.current?.resetData();

  return (
    <Mask visible={isModalOpen}>
      {/* 充值弹窗 */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
          <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <CreditCard className="text-indigo-600" size={18} />
              账户充值
            </h3>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-5">
            <div className="flex p-1 bg-gray-100 rounded-xl mb-5">
              <button
                type="button"
                onClick={() => {
                  setPaymentMethod('WECHAT');
                  resetPaymentStatus();
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                  paymentMethod === 'WECHAT'
                    ? 'bg-white text-green-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                微信支付
              </button>
              {/* <button
                        type="button"
                            onClick={() => { setPaymentMethod('alipay'); resetPaymentStatus(); }}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${paymentMethod === 'alipay' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            支付宝
                        </button> */}
            </div>

            <div className="mb-5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2.5">
                选择金额
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {quickAmounts.map((amount) => (
                  <button
                    type="button"
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount('');
                      resetPaymentStatus();
                    }}
                    className={`relative py-3 rounded-xl border-2 transition-all flex flex-col items-center justify-center overflow-hidden ${
                      selectedAmount === amount && !customAmount
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-600'
                        : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200'
                    }`}
                  >
                    <span className="text-sm font-black">¥{amount}</span>
                    {selectedAmount === amount && !customAmount && (
                      <div className="absolute top-0 right-0 bg-indigo-600 text-white p-0.5 rounded-bl-md">
                        <Check size={8} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">
                  ¥
                </span>
                <input
                  type="number"
                  placeholder="自定义充值金额"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                    resetPaymentStatus();
                  }}
                  className="w-full pl-7 pr-4 py-3 bg-gray-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-xl outline-none transition-all font-bold text-base"
                />
              </div>
              {showPriceInfo && (
                <p className="mt-2 text-[10px] text-red-500 font-bold flex items-center gap-1">
                  <AlertCircle size={12} />
                  最低充值金额为 ¥{baseAmount}
                </p>
              )}
            </div>
            {isModalOpen && (
              <PayOrderBox
                ref={payOrderBoxRef}
                baseAmount={baseAmount}
                orderAmount={selectedAmount || +customAmount}
                paymentMethod={paymentMethod}
              />
            )}
          </div>
        </div>
      </div>
    </Mask>
  );
});

export default PayModal;
