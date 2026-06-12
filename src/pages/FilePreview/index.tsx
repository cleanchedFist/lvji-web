import WpsSkeleton from '@/components/WpsSkeleton';
import { getFileInfo } from '@/services/ant-design-pro/api';
import useWpsHidden from '@/utils/wps/useWpsHidden';
import WebOfficeProvider, { ProviderRef } from '@/utils/wps/wpsProvider';
import { PageContainer } from '@ant-design/pro-components';
import { useParams, useRequest } from '@umijs/max';
import React, { useEffect, useMemo, useRef, useState } from 'react';

const ContractView: React.FC = () => {
  const params = useParams();
  const providerRef = useRef<ProviderRef>();
  const { showWps, resetAutoHide } = useWpsHidden();
  const [reinitialize, setReinitialize] = useState(false);
  const { data: fileInfo } = useRequest(getFileInfo, { defaultParams: [+params.id!] });

  const sdkConfig = useMemo(() => {
    if (fileInfo && params.id) {
      const token = window.localStorage.getItem('token');
      return {
        mode: 'sample',
        officeType: fileInfo.type === 'pdf' ? 'f' : 'w',
        appId: 'AK20250915UQIAZX',
        fileId: params.id,
        token: token,
        mount: '#wps-container',
      };
    }
    return null;
  }, [params.id, fileInfo]);

  useEffect(() => {
    if (reinitialize) {
      providerRef?.current?.initialize();
      setReinitialize(false);
    }
  }, [reinitialize]);

  return (
    <div className="[&_.ant-pro-page-container-children-container]:pr-0">
      <PageContainer>
        {sdkConfig && (
          <WebOfficeProvider ref={providerRef} config={sdkConfig} resetAutoHide={resetAutoHide}>
            <div className="flex h-screen w-full">
              {showWps && (
                <div id="wps-container" className="flex-1 border bg-white h-screen w-full"></div>
              )}
              {!showWps && (
                <WpsSkeleton
                  handleNext={() => {
                    setReinitialize(true);
                    resetAutoHide();
                  }}
                />
              )}
            </div>
          </WebOfficeProvider>
        )}
      </PageContainer>
    </div>
  );
};

export default ContractView;
