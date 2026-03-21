import { QRCode } from 'antd';
import { ArrowRight, Check, Clock, Loader2, RefreshCw } from 'lucide-react';
import { useMemo } from 'react';
/**
 * payState 字段说明
 * 信息展示待确认阶段：reviewing
 * 生成二维码：generating
 * 订单创建完成，等待扫码，支付中：created
 * 支付成功：success
 * 支付码过期/超时：expired
 * * 订单取消：cancelled
 */

type OrderReviewingProps = {
  orderAmount: number;
  baseAmount?: number;
  handleCreateOrder: () => void;
};

type OrderCreatedProps = {
  qrCodeUrl: string;
  paymentMethod: string;
  orderAmount: number;
};
export const OrderReviewing = ({
  orderAmount,
  baseAmount,
  handleCreateOrder,
}: OrderReviewingProps) => {
  const payDisabled = useMemo(() => {
    return !orderAmount || !!(orderAmount && baseAmount && +orderAmount < +baseAmount);
  }, [orderAmount, baseAmount]);

  return (
    <div className="flex flex-col items-center text-center gap-4 animate-in fade-in zoom-in-95 duration-200">
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
          待支付金额
        </span>
        <p className="text-2xl font-black text-gray-900">¥{orderAmount || 0}</p>
      </div>
      <button
        type="button"
        onClick={handleCreateOrder}
        disabled={payDisabled}
        className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all transform active:scale-95 ${
          payDisabled
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700'
        }`}
      >
        立即支付 {!!(orderAmount && baseAmount && +orderAmount < +baseAmount)}
        <ArrowRight size={16} />
      </button>
      <p className="text-[10px] text-gray-400">点击按钮将生成专属支付二维码</p>
    </div>
  );
};

export const OrderGenerating = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Loader2 className="animate-spin text-indigo-600" size={32} />
      <p className="text-xs text-gray-500 animate-pulse">正在获取支付二维码...</p>
    </div>
  );
};
export const OrderCreated = ({ qrCodeUrl, paymentMethod, orderAmount }: OrderCreatedProps) => {
  return (
    <div className="flex flex-col items-center animate-in fade-in duration-300">
      <div
        className={`bg-white p-2 rounded-xl shadow-xl  ${
          paymentMethod === 'WECHAT'
            ? 'shadow-[0_0_20px_rgba(22,163,74,0.5)]'
            : 'shadow-[0_0_20px_rgba(37,99,235,0.5)]'
        }`}
      >
        <QRCode
          bordered={false}
          color={paymentMethod === 'WECHAT' ? '#16a34a' : '#2563eb'}
          value={qrCodeUrl}
        />
      </div>
      <p className="text-[14px] text-gray-400 mt-2.5 mb-1">
        请使用{paymentMethod === 'WECHAT' ? '微信' : '支付宝'}扫码支付
      </p>
      <p className="text-lg font-black text-gray-900 mb-2">¥{orderAmount || 0}</p>
    </div>
  );
};
export const PaySuccess = () => {
  return (
    <div className="flex flex-col items-center gap-2 animate-in zoom-in-90 duration-300">
      <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
        <Check size={24} />
      </div>
      <p className="text-base font-bold text-green-600">充值成功！</p>
    </div>
  );
};

export const PayExpired = ({ handleCreateOrder }: { handleCreateOrder: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-50/50 rounded-[2rem] border border-gray-100 animate-in zoom-in-95 duration-300">
      <div className="w-16 h-16 bg-red-50 text-red-400 rounded-full flex items-center justify-center mb-3 shadow-inner">
        <Clock size={32} strokeWidth={2.5} />
      </div>
      <h4 className="text-sm font-bold text-gray-900 mb-1">订单已超时</h4>
      <p className="text-[10px] text-gray-700 mb-4 px-4">二维码已失效，请重新获取以继续支付</p>
      <button
        type="button"
        onClick={handleCreateOrder}
        className="flex items-center gap-2 px-6 py-2 bg-white border border-red-100 text-red-500 rounded-xl text-xs font-bold shadow-sm hover:bg-red-50 transition-all active:scale-95"
      >
        <RefreshCw size={14} />
        重新获取二维码
      </button>
    </div>
  );
};
