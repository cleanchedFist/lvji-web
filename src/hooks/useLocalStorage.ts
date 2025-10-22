import { useCallback, useState } from 'react';

// 基础版本的localStorage Hook
function useLocalStorage(key: string, initialValue?: string) {
  // 从localStorage读取初始值
  const getStoredValue = useCallback(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState(getStoredValue);

  // 更新状态和localStorage
  const setValue = useCallback(
    (value: string) => {
      try {
        // 允许值是一个函数，类似于useState
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue],
  );

  // 清除指定key的数据
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return { value: storedValue, setValue, removeValue };
}

export default useLocalStorage;
