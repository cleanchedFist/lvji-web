import React, { useContext, useMemo } from 'react';
import * as handler from './WPSHandler';

// 1. 定义 SDK 基础状态
interface OfficeContextState {
  instance: any | null;
  isInitialized: boolean;
  error: string | null;
  initializeSDK: () => void;
  fileName: string;
  isAppReady: boolean;
}

// 2. 定义 Hook 返回的完整接口（状态 + 操作方法）
export interface WebOfficeHookResult extends OfficeContextState {
  locate: (revised: boolean, id: number, text: string) => Promise<void>;
  accept: (text: string, revisedText: string, id: number, onEnd: () => void) => Promise<void>;
  reject: (id: number, onEnd: () => void) => Promise<void>;
  linkToReviewCard: (id: number, text: string) => Promise<void>;
}

// 3. 创建 Context，给定完整的初始值
export const WebOfficeContext = React.createContext<OfficeContextState>({
  instance: null,
  isInitialized: false,
  error: null,
  initializeSDK: () => {},
  fileName: '',
  isAppReady: false,
});

/**
 * 自定义 Hook: useWebOffice
 * 整合了 Context 状态和 WPS 相关处理方法
 */
export const useWebOffice = (): WebOfficeHookResult => {
  const context = useContext(WebOfficeContext);

  if (!context) {
    throw new Error('useWebOffice must be used within a WebOfficeProvider');
  }

  // 使用 useMemo 避免每次渲染都生成新的对象引用
  return useMemo(() => {
    // 创建一个高阶处理函数，用于自动注入 app 并进行校验
    const wrapHandler = (fn: Function) => {
      return (...args: any[]) => {
        const app = context?.instance?.Application;
        if (!app) {
          console.error(`${fn.name} [WebOffice] 操作失败：SDK 尚未初始化或 Application 不可用`);
          return Promise.reject('SDK not initialized');
        }
        // 自动将 app 作为第一个参数注入
        return fn(app, ...args);
      };
    };

    const wrappedHandlers = Object.keys(handler).reduce((acc, key) => {
      // 将 key 断言为 handler 的合法键名
      const k = key as keyof typeof handler;
      const originalMethod = handler[k];

      if (typeof originalMethod === 'function') {
        acc[k] = wrapHandler(originalMethod);
      }
      return acc;
    }, {} as any);

    return {
      ...context,
      ...wrappedHandlers,
    };
  }, [context?.instance?.Application, context]);
};
