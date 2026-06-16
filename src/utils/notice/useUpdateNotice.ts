import { getNotices } from '@/services/ant-design-pro/api';
import { useModel } from '@umijs/max';
import { flushSync } from 'react-dom';

const useUserMenu = () => {
  const { setInitialState } = useModel('@@initialState');
  const updateNoticy = async () => {
    const noticesRes = await getNotices();
    if (noticesRes.data) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          notices: noticesRes?.data?.records || [],
        }));
      });
    }
  };

  return { updateNoticy };
};

export default useUserMenu;
