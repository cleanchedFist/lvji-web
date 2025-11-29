// 双向映射配置
const bidirectionalMappings = {
  reviewStance: {
    forward: { 甲方: 0, 乙方: 1 },
    reverse: { 0: '甲方', 1: '乙方' },
  },
  scale: {
    forward: { 强势: 0, 弱势: 2, 中立: 1 },
    reverse: { 0: '强势', 2: '弱势', 1: '中立' },
  },
};

// 正向转换函数
export function transformToValue(dataKey: any, mappings: any = bidirectionalMappings) {
  const result: any = {};

  Object.keys(dataKey).forEach((key) => {
    const value = dataKey[key];

    if (mappings[key] && mappings[key].forward && mappings[key].forward[value] !== undefined) {
      result[key] = mappings[key].forward[value];
    } else {
      result[key] = value;
    }
  });

  return result;
}

// 反向转换函数
export function transformToKey(dataValue: any, mappings: any = bidirectionalMappings) {
  const result: any = {};

  Object.keys(dataValue).forEach((key) => {
    const value = dataValue[key];

    if (mappings[key] && mappings[key].reverse && mappings[key].reverse[value] !== undefined) {
      result[key] = mappings[key].reverse[value];
    } else {
      result[key] = value;
    }
  });

  return result;
}
