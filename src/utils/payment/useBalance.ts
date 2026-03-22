import { queryBalance } from '@/services/ant-design-pro/api';
import { useModel } from 'umi';

export default function useBalance() {
  const { setInitialState } = useModel('@@initialState');
  const updateBalance = async () => {
    try {
      const res = await queryBalance();
      if (![undefined, null].includes(res?.data.balance)) {
        const { frozenBalance, availableBalance, totalBalance } = res.data || {};
        setInitialState((s) => ({
          ...s,
          balance: { frozenBalance, availableBalance, totalBalance },
        }));
      }
    } catch (e) {
      console.error('更新余额失败');
    }
  };

  return {
    updateBalance,
  };
}
