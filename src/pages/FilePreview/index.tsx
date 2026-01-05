import WebOfficeProvider from '@/utils/wps/wpsProvider';
import { PageContainer } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import React, { useMemo } from 'react';

const ContractView: React.FC = () => {
  const params = useParams();

  const sdkConfig = useMemo(() => {
    const token = window.localStorage.getItem('token');
    return {
      mode: 'sample',
      officeType: 'w',
      appId: 'AK20250915UQIAZX',
      fileId: params.id,
      token: token,
      mount: '#wps-container',
    };
  }, [params.id]);

  return (
    <div className="[&_.ant-pro-page-container-children-container]:pr-0">
      <PageContainer>
        {sdkConfig && (
          <WebOfficeProvider config={sdkConfig}>
            <div className="flex">
              <div id="wps-container" className="flex-1 border bg-white h-screen w-full"></div>
            </div>
          </WebOfficeProvider>
        )}
      </PageContainer>
    </div>
  );
};

export default ContractView;
