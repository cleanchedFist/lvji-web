import PageContainer from '@/components/PageContainer';
import WebOfficeProvider from '@/utils/wps/wpsProvider';
import { useParams, useSearchParams } from '@umijs/max';
import { Col, Row } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import AnalysisPanel from './components/AnalysisPanel';
import ReviewLoading from './components/ReviewLoading';
import ReviewPanel from './components/ReviewPanel';
import SiderMenu from './components/SiderMenu';
import UseRequestFetch from './utils/UseRequestFetch';
import UseWebsockFetch from './utils/UseWebsockFetch';

const ContractView: React.FC = () => {
  const [mode, setMode] = useState(0);
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const isNewReview = searchParams.get('loading') === '1';

  const { fileId, isLoading, reviewChunkRespDTOList, reviewResultNewRespDTO, taskQueue } =
    isNewReview ? UseWebsockFetch(params.id!) : UseRequestFetch(params.id!);

  useEffect(() => {
    if (!isLoading && isNewReview) {
      setSearchParams({});
    }
  }, [isLoading]);

  const sdkConfig = useMemo(() => {
    const token = window.localStorage.getItem('token');
    if (!fileId || !token) {
      return null;
    }
    return {
      mode: 'sample',
      officeType: 'w',
      appId: 'AK20250915UQIAZX',
      fileId: fileId,
      token: token,
      mount: '#wps-container',
    };
  }, [fileId]);

  return (
    <div className="[&_.ant-pro-page-container-children-container]:pr-0">
      <PageContainer>
        {sdkConfig && (
          <WebOfficeProvider config={sdkConfig}>
            <Row gutter={10} className="!m-0">
              <Col span={15}>
                <div id="wps-container" className="border bg-white h-[calc(100vh-102px)]"></div>
              </Col>
              <Col span={8} className="h-[calc(100vh-102px)] flex overflow-hidden">
                {!isLoading && mode === 0 && <ReviewPanel data={reviewChunkRespDTOList} />}
                {!isLoading && mode === 1 && <AnalysisPanel data={reviewResultNewRespDTO} />}
                {isLoading && <ReviewLoading taskQueue={taskQueue} />}
              </Col>
              <Col span={1}>
                {/* 预留右侧操作栏 */}
                <SiderMenu onChangeMode={(v: number) => setMode(v)} />
              </Col>
            </Row>
          </WebOfficeProvider>
        )}
      </PageContainer>
    </div>
  );
};

export default ContractView;
