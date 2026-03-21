import { PageContainer, PageContainerProps } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import UserInfo from './UserInfo';

export default function ({ children, header = {}, ...props }: PageContainerProps) {
  const { initialState } = useModel('@@initialState');
  return (
    <PageContainer
      header={{
        ...header,
        style: { background: '#fff', margin: '0 0 30px 0', ...(header?.style || {}) },
        extra: initialState?.isUserRole ? <UserInfo /> : <></>,
      }}
      {...props}
    >
      {children}
    </PageContainer>
  );
}
