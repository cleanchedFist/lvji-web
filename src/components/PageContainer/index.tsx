import { AvatarDropdown, AvatarName } from '@/components';
import { PageContainer, PageContainerProps } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';

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
export default function ({ children, header = {}, ...props }: PageContainerProps) {
  const { initialState } = useModel('@@initialState');
  return (
    <PageContainer
      header={{
        ...header,
        style: { background: '#fff', margin: '0 0 30px 0', ...(header?.style || {}) },
        extra: initialState?.isUserRole ? <Avatar /> : <></>,
      }}
      {...props}
    >
      {children}
    </PageContainer>
  );
}
