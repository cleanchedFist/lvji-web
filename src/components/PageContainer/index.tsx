import { PageContainer, PageContainerProps } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import UserInfo from './UserInfo';
const Title = () => {
  const backHome = () => {
    history.push('/');
  };
  return (
    <span onClick={backHome} style={{ cursor: 'pointer', userSelect: 'none' }}>
      合同 AI
    </span>
  );
};
export default function ({ children, header = {}, ...props }: PageContainerProps) {
  const { initialState } = useModel('@@initialState');
  return (
    <PageContainer
      header={{
        ...header,
        style: { background: '#fff', margin: '0 0 30px 0', ...(header?.style || {}) },
        extra: initialState?.isUserRole ? <UserInfo /> : <></>,
      }}
      title={<Title />}
      {...props}
    >
      {children}
    </PageContainer>
  );
}
