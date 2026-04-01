import Mask from '@/components/Mask';
import { AlertCircle, ShieldCheck, X } from 'lucide-react';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { CancelBtn, OkBtn } from './FooterBtn';

export type ClientConfirmModalHandler = {
  openModal: () => void;
};

const ClientConfirmModal = forwardRef(
  ({ onConfirm, uploading }: { onConfirm: () => void; uploading: boolean }, ref) => {
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
      openModal: () => {
        setVisible(true);
      },
    }));

    return (
      <Mask visible={visible}>
        {/* 弹窗主体 */}
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
          {/* 头部 */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2 text-amber-500">
              <AlertCircle size={20} />
              <span className="font-semibold text-gray-800">提交确认</span>
            </div>
            <button
              type="button"
              onClick={() => setVisible(false)}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* 内容区 */}
          <div className="p-6 space-y-4">
            <p className="text-gray-600 text-sm leading-relaxed">
              {/* 您即将提交 <span className="font-medium text-gray-900">《{contractInfo.name}》</span> 进行律师审核。系统将立即扣除服务费： */}
            </p>

            {/* <div className="bg-indigo-50/50 rounded-xl p-4 flex justify-between items-end border border-indigo-100">
                    <div>
                        <p className="text-xs text-indigo-500 mb-1 font-medium">应付总计</p>
                        <p className="text-3xl font-bold text-indigo-600 italic">¥ {contractInfo.amount}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-400">服务类型</p>
                        <p className="text-sm text-gray-700 font-medium text-nowrap">律师专业审核</p>
                    </div>
                </div> */}

            {/* 重要提示卡片 */}
            <div className="bg-red-50 rounded-lg p-3 border border-red-100 flex gap-3">
              <div className="bg-red-100 p-1.5 h-fit rounded-full text-red-600">
                <ShieldCheck size={16} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-red-700">重要须知 (不可退费说明)</h4>
                <p className="text-xs text-red-600/80 leading-relaxed mt-1">
                  由于法律咨询服务的即时性和数字化特性，一旦订单提交并进入律师处理流程，
                  <span className="font-bold underline">对应的服务费用将无法退回</span>
                  。请确保您的上传资料及需求说明无误。
                </p>
              </div>
            </div>
          </div>

          {/* 底部按钮 */}
          <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
            <CancelBtn disabled={uploading} text="返回修改" onClick={() => setVisible(false)} />
            <OkBtn
              loading={uploading}
              disabled={uploading}
              text="我已知晓，确认提交"
              onClick={onConfirm}
            />
          </div>
        </div>
      </Mask>
    );
  },
);

export default ClientConfirmModal;
