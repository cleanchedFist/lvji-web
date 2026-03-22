import { AvatarDropdown, AvatarName } from '@/components';
import useBalance from '@/utils/payment/useBalance';
import { useModel } from '@umijs/max';
import { PlusCircle, Wallet } from 'lucide-react';
import { useEffect, useRef } from 'react';
import PayModal, { PayModalHandle } from '../PayModal';

const Avatar = () => {
  const { initialState } = useModel('@@initialState');
  return (
    <AvatarDropdown>
      <div className="flex cursor-pointer">
        <img
          className="block w-[26px] h-[26px] rounded-full mr-2"
          src={initialState?.currentUser?.avatar}
        />
        <AvatarName></AvatarName>
      </div>
    </AvatarDropdown>
  );
};

const Balance = ({ value }: { value: number }) => {
  const payModalRef = useRef<PayModalHandle>(null);
  return (
    <div className="flex items-center bg-gray-50 rounded-full pl-2 pr-1 py-1 border border-gray-200 hover:border-indigo-200 transition-all group">
      <div className="flex items-center gap-2 px-2">
        <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
          <Wallet size={14} />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-500 font-medium leading-none uppercase tracking-wider">
            当前余额
          </span>
          <div className="flex items-baseline gap-0.5">
            <span className="text-[12px] font-bold text-gray-900">¥</span>
            <span className="text-sm font-black text-gray-900">{value.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* 充值按钮 - 更加醒目且具有交互感 */}
      <button
        type="button"
        className="ml-2 flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm font-semibold shadow-lg shadow-indigo-100 active:scale-95 transition-all"
        onClick={() => {
          payModalRef.current?.show();
        }}
      >
        <PlusCircle size={16} />
        <span>充值</span>
      </button>
      <PayModal ref={payModalRef} />
    </div>
  );
};
// 显示余额和充值入口
const UserInfo = () => {
  const { initialState } = useModel('@@initialState');
  const { updateBalance } = useBalance();
  useEffect(() => {
    updateBalance();
  }, []);
  return (
    <div className="flex items-center space-x-4">
      <Balance value={initialState?.balance?.totalBalance || 0} />
      <div className="flex cursor-pointer">
        <Avatar></Avatar>
      </div>
    </div>
  );
};

export default UserInfo;
