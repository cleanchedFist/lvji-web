import { parseContract, uploadContract, uploadVersion } from '@/services/ant-design-pro/api';
import { UploadFile, message } from 'antd';
export function updateMajorVersion(version: string) {
  const parts = version.split('.');
  // 将第一位转换为数字加 1，后面两位直接归零
  return `${parseInt(parts[0]) + 1}.0.0`;
}

type FieldsValueType = {
  fileList: UploadFile[];
  model?: string;
  nextVersion?: string;
  shouldParse?: boolean;
  requirement?: string;
  lawyerId?: number;
  side?: string;
  dirId?: number;
};

export type UploadFeature = 'model' | 'version' | 'lawyer' | 'requirement' | 'parse' | 'side';

/**
 * 定义输出结构的类型
 */
interface FormattedResult {
  model?: string;
  versionId?: string;
  reviewerId?: number;
  requirement?: string;
  party?: string;
}

function formatFieldsValue(fields: FieldsValueType, features: UploadFeature[]): FormattedResult {
  // 建立 feature 与 结果 key 及 来源 key 的映射关系
  // [结果Key, 来源Key]
  const map: Partial<Record<UploadFeature, [string, keyof FieldsValueType]>> = {
    model: ['model', 'model'],
    version: ['versionId', 'nextVersion'],
    lawyer: ['reviewerId', 'lawyerId'],
    requirement: ['demand', 'requirement'],
    side: ['chooseParty', 'side'],
  };

  return features.reduce((acc, feature) => {
    const config = map[feature];
    if (config) {
      const [targetKey, sourceKey] = config;
      // 只有当源数据存在时才赋值，避免 undefined 覆盖
      if (fields[sourceKey] !== undefined) {
        (acc as any)[targetKey] = fields[sourceKey];
      }
    }
    return acc;
  }, {} as FormattedResult);
}

export async function handleUploadDir(fields: FieldsValueType, features: UploadFeature[]) {
  const fileRequest = fields.fileList.map((item) => {
    const params = { ...formatFieldsValue(fields, features), versionId: '1.0.0' };
    return uploadContract(item, params);
  });
  try {
    // 2. 使用 await 等待所有请求完成
    await Promise.all(fileRequest);
    message.success('上传成功');
    return true; // 成功返回 true
  } catch (error) {
    // 失败处理逻辑
    console.error(error);
    message.error('上传失败，请重试');

    return false; // 失败返回 false
  }
}

export async function handleUploadVersion(fields: FieldsValueType, features: UploadFeature[]) {
  const params = { ...formatFieldsValue(fields, features), dirId: fields.dirId };
  const file = fields.fileList[0];

  try {
    const response = await uploadVersion(file, params);
    if (fields.shouldParse && fields.dirId) {
      await parseContract(fields.dirId, response.data); // 这里的data只返回了文件id
    }
    message.success('上传成功');
    return response.success;
  } catch (e) {
    message.error('上传失败，请重试');
    return false;
  }
}

export const radioStyles = [
  // 1. 选中状态样式
  '[&_.ant-radio-button-wrapper-checked]:!font-semibold',
  '[&_.ant-radio-button-wrapper-checked]:!text-white',
  '[&_.ant-radio-button-wrapper-checked]:!bg-indigo-600',
  '[&_.ant-radio-button-wrapper-checked]:!border-indigo-600',

  // 2. 选中状态下的 Hover
  '[&_.ant-radio-button-wrapper-checked:hover]:!bg-indigo-700',
  '[&_.ant-radio-button-wrapper-checked:hover]:!border-indigo-700',
  '[&_.ant-radio-button-wrapper-checked:hover]:!text-white',

  // 3. 非选中状态下的 Hover
  '[&_.ant-radio-button-wrapper:not(.ant-radio-button-wrapper-checked):hover]:!text-indigo-600',

  // 4. 修复 Antd 内部的分割线颜色冲突
  '[&_.ant-radio-button-wrapper-checked]:before:!bg-indigo-600',
].join(' ');
