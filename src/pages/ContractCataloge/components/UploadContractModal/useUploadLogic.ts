import { getLawyerList, getSupportModels } from '@/services/ant-design-pro/api';
import { UploadFile, message } from 'antd';
import { useState } from 'react';
import { UploadFeature, handleUploadDir, handleUploadVersion, updateMajorVersion } from './utils';

enum UploadType {
  dir = 1, // 上传类型为合同目录
  version = 2, // 上传类型为合同版本
}

export type UploadExtraProps = {
  uploadType: UploadType;
  dirId?: number;
  latestVersion?: string;
};
/** * ----------------------------------------------------------------
 * 逻辑层：useUploadLogic
 * ----------------------------------------------------------------
 */
const useUploadLogic = (catalogePageContext: any) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [uploading, setUploading] = useState(false);
  const [uploadType, setUploadType] = useState<UploadType>(UploadType.dir);
  const [dirId, setDirId] = useState<number>();
  const [features, setFeatures] = useState<UploadFeature[]>([]);

  // fileds 展示参数
  const [modelOptions, setModelOptions] = useState([]);
  const [lawyerOptions, setLawyerOptions] = useState([]);

  // fileds
  const [nextVersion, setNextVersion] = useState('1.0.0');
  const [model, setModel] = useState<string>('deepseek-v3.2');
  const [lawyerId, setLawyerId] = useState<number>();
  const [shouldParse, setShouldParse] = useState<boolean>(false);
  const [requirement, setRequirement] = useState<string>('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [side, setSide] = useState<'party_a' | 'party_b'>('party_a');

  const handleOpen = async (
    _features: UploadFeature[],
    { uploadType: ut, dirId: _dirId, latestVersion }: UploadExtraProps,
  ) => {
    const hasFeature = (f: UploadFeature) => _features.includes(f);

    /**
     * 核心逻辑：数据完全获取之后才展示 modal
     */
    const fetchTasks: Promise<any>[] = [];
    // 1. 获取模型列表任务
    if (hasFeature('model')) {
      const fetchModels = getSupportModels().then((res) => {
        const { data: list = [] } = res;
        const options = list.map((item: string) => ({ label: item, value: item }));
        setModelOptions(options);
        if (options.length > 0) setModel(options[0].value);
      });
      fetchTasks.push(fetchModels);
    }

    // 2. 获取律师列表任务
    if (hasFeature('lawyer')) {
      const fetchLawyers = getLawyerList().then((res) => {
        const { data: list = [] } = res;
        const options = list.map((item: { username: string; userId: number }) => ({
          label: item.username,
          value: item.userId,
        }));
        setLawyerOptions(options);
        if (options.length > 0) setLawyerId(options[0].value);
      });
      fetchTasks.push(fetchLawyers);
    }

    try {
      if (fetchTasks.length > 0) {
        await Promise.all(fetchTasks);
      }

      setUploadType(ut);
      setDirId(_dirId);
      setFileList([]);
      setRequirement('');
      setShouldParse(false);
      setSide('party_a'); // 重置立场为甲方
      setFeatures(_features);
      setNextVersion(latestVersion ? updateMajorVersion(latestVersion) : '1.0.0');

      setVisible(true);
    } catch (error) {
      message.error('加载配置数据失败，请重试');
    }
  };

  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.warning('请选择要上传的文件');
      return;
    }
    setUploading(true);
    const fileds = {
      fileList,
      model,
      nextVersion,
      shouldParse,
      requirement,
      lawyerId,
      side,
      dirId: uploadType === UploadType.version ? dirId : undefined,
    };
    const uploadFn = uploadType === UploadType.dir ? handleUploadDir : handleUploadVersion;

    const result = await uploadFn(fileds, features);

    if (result === true) {
      setFileList([]);
      setVisible(false);
      catalogePageContext.reloadList();
    }

    setUploading(false);
    // // 实际开发中根据 uploadType 调用 uploadContract 或 uploadVersion
    // setTimeout(() => {
    //   setUploading(false);
    //   message.success('上传成功');
    //   setVisible(false);
    //   catalogePageContext?.reloadList?.();
    // }, 1500);
  };

  const hasFeature = (feature: UploadFeature) => features.includes(feature);

  return {
    state: {
      visible,
      uploading,
      uploadType,
      fileList,
      model,
      nextVersion,
      shouldParse,
      requirement,
      lawyerId,
      side,
      lawyerOptions,
      modelOptions,
    },
    actions: {
      setVisible,
      setFileList,
      setModel,
      setShouldParse,
      setRequirement,
      setLawyerId,
      setSide,
      handleOpen,
      handleUpload,
      hasFeature,
    },
  };
};

export default useUploadLogic;
