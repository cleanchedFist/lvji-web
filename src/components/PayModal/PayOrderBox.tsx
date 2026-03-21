import { recharge } from '@/services/ant-design-pro/api';
import usePaymentPolling from '@/utils/payment/usePaymentPolling';
import { forwardRef, useImperativeHandle, useState } from 'react';

import { message } from 'antd';
import {
  OrderCreated,
  OrderGenerating,
  OrderReviewing,
  PayExpired,
  PaySuccess,
} from './PayStateCard';
type PayOrderProps = {
  orderAmount: number;
  paymentMethod: string;
  baseAmount?: number;
};

export interface PayOrderBoxHandler {
  resetData: () => void;
}

/**
 * payState 字段说明
 * 信息展示待确认阶段：reviewing
 * 生成二维码：generating
 * 订单创建完成，等待扫码，支付中：created
 * 支付成功：success
 * 支付码过期/超时：expired
 * 订单取消：cancelled
 *
 */

const PayOrderBox = forwardRef(({ orderAmount, paymentMethod, baseAmount }: PayOrderProps, ref) => {
  const [qrCodeUrl, setQrCodeUrl] = useState(''); // 二维码链接
  const [payState, setPayState] = useState('reviewing');
  const [orderNo, setOrderNo] = useState('');
  usePaymentPolling(orderNo, (currentStatus) => {
    if (currentStatus === 'PAID') {
      setPayState('success');
    } else if (currentStatus === 'CANCELLED') {
      setPayState('cancelled');
    } else if (currentStatus === 'EXPIRED') {
      console.log(3333, 'expired');
      setPayState('expired');
    }
  });

  useImperativeHandle(ref, () => ({
    resetData() {
      setQrCodeUrl('');
      setPayState('reviewing');
      setOrderNo('');
    },
  }));

  // 支付下单流程 (transactions/native)
  const handleCreateOrder = async () => {
    setPayState('generating');
    try {
      const { data } = await recharge({ amount: orderAmount, paymentMethod });
      setQrCodeUrl(data.paymentParams.codeUrl);
      setOrderNo(data.orderNo);
      setPayState('created');
    } catch (e) {
      message.warning('创建订单失败，请重试');
    }
  };

  // const handleRechargeComplete = () => {
  //     setPayState('success');
  //     setTimeout(() => {
  //         // 通知父组件
  //         onPayStateChange(payState) // success, fail, cancel, expired, created
  //     }, 1500);
  // };

  return (
    <div className="bg-gray-50 rounded-2xl p-5 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 min-h-[190px] transition-all relative overflow-hidden">
      {/* OrderReviewing, OrderGenerating, OrderCreated, PaySuccess, PayFail, PayCancel, PayExpired */}
      {payState === 'reviewing' && (
        <OrderReviewing
          baseAmount={baseAmount}
          orderAmount={orderAmount}
          handleCreateOrder={handleCreateOrder}
        />
      )}
      {payState === 'generating' && <OrderGenerating />}
      {payState === 'created' && (
        <OrderCreated
          qrCodeUrl={qrCodeUrl}
          orderAmount={orderAmount}
          paymentMethod={paymentMethod}
        />
      )}
      {payState === 'success' && <PaySuccess />}
      {payState === 'expired' && <PayExpired handleCreateOrder={handleCreateOrder} />}
    </div>
  );
});
export default PayOrderBox;
