// components/WebOfficeProvider.jsx
import WebOfficeSDK from '@/utils/web-office-sdk-solution-v1.1.27.es.js';
import { useEffect, useState } from 'react';
import WebOfficeContext from './wps';

const WebOfficeProvider = ({ children, config }) => {
  const [sdkInstance, setSdkInstance] = useState(null);
  const [fileName, setFileName] = useState('');
  const [status, setStatus] = useState({
    isInitialized: false,
    error: null,
  });

  // 初始化SDK的函数
  const initialize = async () => {
    try {
      const instance = await WebOfficeSDK.init(config);
      setSdkInstance(instance);
      setStatus({ isInitialized: true, error: null });
      instance.on('fileOpen', (data: any) => {
        setFileName(data?.fileInfo?.name);
      });
      await instance.ready();

      instance.Application.ActiveDocument.TrackRevisions = true;
      // 添加全局事件监听
      //   instance.on('documentLoaded', () => {
      //     console.log('文档加载完成');
      //   });

      return instance;
    } catch (err) {
      console.error('SDK初始化失败:', err);
      setStatus({ isInitialized: false, error: err.message });
      return null;
    }
  };

  // 组件挂载时初始化
  useEffect(() => {
    if (!status.isInitialized) {
      initialize();
    }

    // 清理函数
    return () => {
      if (sdkInstance) {
        sdkInstance.destroy();
      }
    };
  }, []);

  // Context值
  const contextValue = {
    instance: sdkInstance,
    isInitialized: status.isInitialized,
    error: status.error,
    initializeSDK: initialize,
    fileName,
  };

  return <WebOfficeContext.Provider value={contextValue}>{children}</WebOfficeContext.Provider>;
};

export default WebOfficeProvider;
