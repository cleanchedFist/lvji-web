import { getLawyerList, getSupportModels, parseFileOrder } from '@/services/ant-design-pro/api';
import useBalance from '@/utils/payment/useBalance';
import { useModel } from '@umijs/max';
import { UploadFile, message } from 'antd';
import { useMemo, useState } from 'react';
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
const useUploadLogic = (
  catalogePageContext: any,
  { handleClientConfirmOpen }: { handleClientConfirmOpen: () => void },
) => {
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
  const [side, setSide] = useState<'甲方' | '乙方'>('甲方');

  // 用户确认订单信息
  const { initialState } = useModel('@@initialState');
  const [step, setStep] = useState(1); // 1 or 2
  const [contractWordCount, setContractWordCount] = useState(0);
  const [orderFileName, setOrderFileName] = useState('');
  const [orderPrice, setOrderPrice] = useState('');
  const { updateBalance } = useBalance();

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
      setSide('甲方'); // 重置立场为甲方
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
    setUploading(false);

    if (result === true) {
      setFileList([]);
      setVisible(false);
      setStep(1);
      catalogePageContext.reloadList();
    }
  };

  const hasFeature = (feature: UploadFeature) => features.includes(feature);
  const reset = () => {
    setUploading(false);
    setStep(1);
  };

  const handleClose = () => {
    setVisible(false);
    reset();
  };

  const queryOrderInfo = async () => {
    try {
      if (fileList.length === 0) {
        message.warning('请选择要上传的文件');
        throw '未选择文件';
      }
      // 同时发起两个请求，提高效率

      const [fileOrderRes] = await Promise.all([parseFileOrder(fileList[0]), updateBalance()]);

      // 合并结果
      const combinedResult = {
        orderFileName: fileList[0].name,
        contractWordCount: fileOrderRes?.data?.contractWordCount || 0,
        orderPrice: fileOrderRes?.data?.estimatedDeductionAmount || 0,
      };

      return combinedResult;
    } catch (error) {
      message.warning('请求订单信息失败，请重试');
      throw error;
    }
  };

  const btnHandler = useMemo(() => {
    if (initialState?.isUserRole && step === 1 && uploadType === UploadType.dir) {
      // 点击确认信息
      return {
        okText: '确认信息',
        onOk: async () => {
          setUploading(true);

          // 请求余额
          // 请求文件扣费信息
          queryOrderInfo()
            .then((res) => {
              setContractWordCount(res.contractWordCount);
              setOrderFileName(res.orderFileName);
              setOrderPrice(res.orderPrice);
              setStep(2);
            })
            .finally(() => {
              setUploading(false);
            });
        },
        cancelText: '取消',
        onCancel: handleClose,
      };
    } else if (initialState?.isUserRole && step === 2) {
      // 用户上传文件
      return {
        okText: '确认并提交',
        onOk: handleClientConfirmOpen,
        cancelText: '返回修改',
        onCancel: () => setStep(1),
      };
    } else {
      // 律师上传文件
      return {
        okText: '确定',
        onOk: handleUpload,
        cancelText: '取消',
        onCancel: handleClose,
      };
    }
  }, [catalogePageContext.listType, step, fileList]);

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
      step,
      contractWordCount,
      orderFileName,
      orderPrice,
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
      reset,
      handleClose,
    },
    btnHandler,
  };
};

export default useUploadLogic;
