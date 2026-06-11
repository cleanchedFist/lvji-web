import { useModel } from '@umijs/max';
import { useMemo } from 'react';
import Mask from '../Mask';
import NoticeCard from './NoticeCard';

const ForceNoticeModal = () => {
  const { initialState } = useModel('@@initialState');

  const forceNotices = useMemo(() => {
    return initialState?.notices?.filter((i) => i.type === 'notification') || [];
  }, [initialState?.notices]);

  return (
    <Mask visible={Boolean(forceNotices?.length)}>
      <NoticeCard notices={forceNotices} />
    </Mask>
  );
};

export default ForceNoticeModal;
