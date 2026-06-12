import { useModel } from '@umijs/max';
import Mask from '../Mask';
import NoticeCard from './NoticeCard';

const ForceNoticeModal = () => {
  const forceNotices = useModel('@@initialState', (model) =>
    model.initialState?.notices?.filter((i) => i.type === 'notification'),
  );

  return (
    <Mask visible={Boolean(forceNotices?.length)}>
      <NoticeCard notices={forceNotices || []} />
    </Mask>
  );
};

export default ForceNoticeModal;
