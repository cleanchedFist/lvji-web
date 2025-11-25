import WebOfficeProvider from '@/store/wpsProvider';
import { PageContainer } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import React, { useMemo } from 'react';

// const sdkConfig = {
//   mode: 'sample',
//   officeType: 'w',
//   appId: 'SX20250707WNEWPR',
//   fileId: '326',
//   token: '1',
//   mount: '#wps-container',
// };

// const wsParams = {
//   partyA: 'xxxxx有限责任公司',
//   partyB: 'yyyyy有限公司',
//   scale: '强势',
//   reviewStance: '发包方',
//   contractType: '智能家居设备采购合同',
//   reviewer: 'xkm',
//   strategyId: 27,
//   objectRule: true,
//   purposeRule: true,
//   violateRule: true,
//   clauseRule: true,
//   dealNodes: true,
// };

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
