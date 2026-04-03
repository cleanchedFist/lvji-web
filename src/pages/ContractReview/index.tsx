import PageContainer from '@/components/PageContainer';
import WebOfficeProvider from '@/utils/wps/wpsProvider';
import { useParams } from '@umijs/max';
import React, { useMemo, useRef, useState } from 'react';
import AnalysisPanel from './components/AnalysisPanel';
import ReviewLoading from './components/ReviewLoading';
import ReviewPanel from './components/ReviewPanel';
import SiderMenu from './components/SiderMenu';
import UseRequestFetch from './utils/UseRequestFetch';
import useDragger from './utils/useDragger';

const ContractView: React.FC = () => {
  const [mode, setMode] = useState(0);
  const params = useParams();
  const containerRef = useRef(null);
  const { startDragging, isDragging, leftWidth } = useDragger(containerRef);

  const { fileId, isLoading, reviewChunkRespDTOList, reviewResultNewRespDTO, taskQueue } =
    UseRequestFetch(params.id!);

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
            <div
              className="flex-1 flex items-stretch overflow-hidden relative !m-0"
              ref={containerRef}
            >
              {/* 左侧：文档预览区 */}
              <div
                className={`bg-gray-100 overflow-auto flex flex-col items-center pt-8 ${
                  isDragging ? 'pointer-events-none' : ''
                }`}
                style={{ width: `${leftWidth}%` }}
              >
                <div
                  id="wps-container"
                  className="w-full border bg-white h-[calc(100vh-102px)]"
                ></div>
              </div>
              {/* 拖拽把手 (Resizer) */}
              <div
                onMouseDown={startDragging}
                className={`w-1.5  cursor-col-resize flex items-center justify-center transition-colors group z-10 ${
                  isDragging ? 'bg-blue-500' : 'bg-transparent hover:bg-blue-300'
                }`}
              >
                <div
                  className={`w-0.5 rounded-full ${
                    isDragging ? 'bg-white' : 'bg-gray-300 group-hover:bg-blue-400'
                  }`}
                ></div>
              </div>
              {/* 右侧：审查区 */}
              <div className="min-w-[350px] flex-1 flex h-[calc(100vh-102px)] overflow-hidden mr-2">
                {!isLoading && mode === 0 && (
                  <ReviewPanel fileType={sdkConfig.officeType} data={reviewChunkRespDTOList} />
                )}
                {!isLoading && mode === 1 && <AnalysisPanel data={reviewResultNewRespDTO} />}
                {isLoading && <ReviewLoading taskQueue={taskQueue} />}
              </div>
              <div className="ml-auto px-2 bg-white rounded-xl">
                {/* 预留右侧操作栏 */}
                <SiderMenu fileId={fileId} onChangeMode={(v: number) => setMode(v)} />
              </div>
            </div>
          </WebOfficeProvider>
        )}
      </PageContainer>
    </div>
  );
};

export default ContractView;
