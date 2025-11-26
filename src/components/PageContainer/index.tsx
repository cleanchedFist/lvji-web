import { PageContainer, PageContainerProps } from '@ant-design/pro-components';
export default function ({ children, header = {}, ...props }: PageContainerProps) {
  return (
    <PageContainer
      header={{
        ...header,
        style: { background: '#fff', margin: '0 0 30px 0', ...(header?.style || {}) },
      }}
      {...props}
    >
      {children}
    </PageContainer>
  );
}
