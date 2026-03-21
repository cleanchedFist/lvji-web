import CustomCheckbox from '@/components/Checkbox';
import { UploadIcon } from '@/components/Icon';
import { ConfigProvider, Input, Radio, Select, Typography, Upload, UploadProps } from 'antd';
import ConfigItem from './ConfigItem';
import { radioStyles } from './utils';

const { TextArea } = Input;
const { Text } = Typography;

interface OptionType {
  label: string;
  value: string;
}

export enum UploadType {
  dir = 1,
  version = 2,
}

type onChange = (val: string) => void;

// type onNativeChange = (e: React.ChangeEvent<HTMLSelectElement>) => void;

export const VersionField = ({ nextVersion }: { nextVersion: string }) => {
  return (
    <ConfigItem label="版本号">
      <Text strong>{nextVersion}</Text>
    </ConfigItem>
  );
};

export const SideField = ({
  side,
  onChange,
}: {
  side: string;
  onChange: (val: '甲方' | '乙方') => void;
}) => {
  return (
    <ConfigItem label="我的立场">
      <ConfigProvider
        theme={{
          token: {
            // 设置主色调为 Indigo 600
            colorPrimary: '#4f46e5',
          },
          components: {
            Radio: {
              // 定制 Radio Button 专属样式
              buttonBg: '#ffffff',
              buttonCheckedBg: '#4f46e5', // 选中背景
              buttonColor: 'rgba(0, 0, 0, 0.88)', // 默认文字颜色
            },
          },
        }}
      >
        <Radio.Group
          value={side}
          onChange={(e) => onChange(e.target.value as '甲方' | '乙方')}
          buttonStyle="solid"
          className={radioStyles}
        >
          <Radio.Button value="甲方">甲方</Radio.Button>
          <Radio.Button value="乙方">乙方</Radio.Button>
        </Radio.Group>
      </ConfigProvider>
    </ConfigItem>
  );
};

export const ModelField = ({
  model,
  onChange,
  modelOptions,
}: {
  model: string;
  onChange: onChange;
  modelOptions: OptionType[];
}) => {
  return (
    <ConfigItem label="审查模型">
      <Select className="w-full" value={model} onChange={onChange} options={modelOptions} />
    </ConfigItem>
  );
};

export const LawyerField = ({
  lawyerId,
  lawyerOptions,
  onChange,
}: {
  lawyerId?: number;
  lawyerOptions: OptionType[];
  onChange: (val: number) => void;
}) => {
  return (
    <ConfigItem label="指派律师">
      <Select
        className="w-full"
        placeholder="请选择审核律师"
        value={lawyerId}
        onChange={onChange}
        options={lawyerOptions}
      />
    </ConfigItem>
  );
};

export const ParseField = ({
  shouldParse,
  onChange,
}: {
  shouldParse: boolean;
  onChange: (val: boolean) => void;
}) => {
  return (
    <ConfigItem label="是否解析">
      <CustomCheckbox
        checked={shouldParse}
        onChange={(e) => onChange(e.target.checked)}
      ></CustomCheckbox>
    </ConfigItem>
  );
};

export const RequirementField = ({
  requirement,
  onChange,
}: {
  requirement: string;
  onChange: onChange;
}) => {
  return (
    <div>
      <Text type="secondary" className="block mb-2 text-xs">
        背景说明：
      </Text>
      <TextArea
        rootClassName="hover:border-indigo-600 focus:border-indigo-600"
        placeholder="请输入对此合同的具体需求..."
        rows={3}
        value={requirement}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export const UploadField = ({
  uploadDraggerProps,
  uploadType,
}: {
  uploadDraggerProps: UploadProps;
  uploadType: number;
}) => {
  return (
    <Upload.Dragger {...uploadDraggerProps}>
      <div className="ant-upload-drag-icon flex flex-col items-center justify-center">
        <UploadIcon className="text-indigo-600 mb-4" />
      </div>
      <p className="text-base font-medium text-zinc-500">
        {`在这里拖拽${uploadType === UploadType.dir ? '多个' : ''}文件或者点击上传文件`}
      </p>
      <p className="text-zinc-500/70 text-sm">
        {uploadType === UploadType.dir
          ? '你可以上传 10 个文件 (最大 10 MB 每个)'
          : '文件大小不超过 10M'}
      </p>
    </Upload.Dragger>
  );
};
