import React, { useContext } from 'react';

const WebOfficeContext = React.createContext({
  instance: null, // SDK实例
  isInitialized: false, // 初始化状态
  error: null, // 错误信息
  initializeSDK: () => {}, // 初始化函数
  fileName: '', // 文件名称
});

export const useWebOffice = () => {
  const context = useContext(WebOfficeContext);

  if (context === undefined) {
    throw new Error('useWebOffice 必须在 WebOfficeProvider 内使用');
  }

  return context;
};

export default WebOfficeContext;
