import CustomCheckbox from '@/components/Checkbox';
import { UploadIcon } from '@/components/Icon';
import { ModalButtonConfig } from '@/utils/modalConfig';
import {
  ConfigProvider,
  Input,
  Modal,
  Radio,
  Select,
  Typography,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd';
import { forwardRef, useContext, useImperativeHandle } from 'react';
import { CatalogePageContext } from '../../utils/context';
import ConfigItem from './ConfigItem';
import useUploadLogic, { UploadExtraProps } from './useUploadLogic'; //逻辑层：useUploadLogic
import { UploadFeature, radioStyles } from './utils';

const { TextArea } = Input;
const { Text } = Typography;

/** * ----------------------------------------------------------------
 * 展现层：UploadContractModal
 * ----------------------------------------------------------------
 */
export interface UploadContractModalRef {
  openModal: (features: UploadFeature[], extraPoprs: UploadExtraProps) => void;
}

export enum UploadType {
  dir = 1,
  version = 2,
}

const UploadContractModal = forwardRef<UploadContractModalRef>((props, ref) => {
  const catalogePageContext = useContext(CatalogePageContext);

  const { state, actions } = useUploadLogic(catalogePageContext);
  const { hasFeature } = actions;

  // 对外暴露 API
  useImperativeHandle(ref, () => ({
    openModal: actions.handleOpen,
  }));

  const uploadDraggerProps: UploadProps = {
    // 阻止默认的上传行为（不发送 post 请求到 action 地址）
    beforeUpload: () => false,

    // 统一由 onChange 处理列表展示
    onChange: ({ file, fileList }) => {
      if (state.uploadType === UploadType.dir) {
        actions.setFileList(fileList);
      } else {
        const { status } = file;
        if (status === 'removed') {
          actions.setFileList([]);
        } else {
          const _file = file.originFileObj ? file : { originFileObj: file, name: file.name };
          actions.setFileList([_file as UploadFile]);
        }
      }
    },
    fileList: state.fileList,
    multiple: state.uploadType === UploadType.dir,
    style: {
      border: '2px dashed rgb(129, 140, 248)',
      borderRadius: '8px',
      background: 'transparent',
    },
    className: 'bg-indigo-50 hover:bg-indigo-100 block',
  };

  return (
    <Modal
      title="上传合同"
      open={state.visible}
      width={600}
      onOk={actions.handleUpload}
      okButtonProps={{ ...ModalButtonConfig.okButtonProps, loading: state.uploading }}
      cancelButtonProps={ModalButtonConfig.cancelButtonProps}
      onCancel={() => actions.setVisible(false)}
      okText="确定"
      cancelText="取消"
      destroyOnHidden={true}
    >
      <div className="flex flex-col gap-y-4 py-2">
        {/* 配置区块：解耦出的配置项 */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex flex-col gap-4">
          {hasFeature('version') && (
            <ConfigItem label="版本号">
              <Text strong>{state.nextVersion}</Text>
            </ConfigItem>
          )}
          {hasFeature('side') && (
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
                  value={state.side}
                  onChange={(e) => actions.setSide(e.target.value)}
                  buttonStyle="solid"
                  className={radioStyles}
                >
                  <Radio.Button value="甲方">甲方</Radio.Button>
                  <Radio.Button value="乙方">乙方</Radio.Button>
                </Radio.Group>
              </ConfigProvider>
            </ConfigItem>
          )}
          {hasFeature('model') && (
            <ConfigItem label="审查模型">
              <Select
                className="w-full"
                value={state.model}
                onChange={actions.setModel}
                options={state.modelOptions}
              />
            </ConfigItem>
          )}

          {hasFeature('lawyer') && (
            <ConfigItem label="指派律师">
              <Select
                className="w-full"
                placeholder="请选择审核律师"
                value={state.lawyerId}
                onChange={actions.setLawyerId}
                options={state.lawyerOptions}
              />
            </ConfigItem>
          )}
          {hasFeature('parse') && (
            <ConfigItem label="是否解析">
              <CustomCheckbox
                checked={state.shouldParse}
                onChange={(e) => actions.setShouldParse(e.target.checked)}
              ></CustomCheckbox>
            </ConfigItem>
          )}
        </div>

        {/* 需求说明 */}
        {hasFeature('requirement') && (
          <div>
            <Text type="secondary" className="block mb-2 text-xs">
              背景说明：
            </Text>
            <TextArea
              rootClassName="hover:border-indigo-600 focus:border-indigo-600"
              placeholder="请输入对此合同的具体需求..."
              rows={3}
              value={state.requirement}
              onChange={(e) => actions.setRequirement(e.target.value)}
            />
          </div>
        )}

        {/* 上传区域 */}
        <Upload.Dragger {...uploadDraggerProps}>
          <div className="ant-upload-drag-icon flex flex-col items-center justify-center">
            <UploadIcon className="text-indigo-600 mb-4" />
          </div>
          <p className="text-base font-medium text-zinc-500">
            {`在这里拖拽${state.uploadType === UploadType.dir ? '多个' : ''}文件或者点击上传文件`}
          </p>
          <p className="text-zinc-500/70 text-sm">
            {state.uploadType === UploadType.dir
              ? '你可以上传 10 个文件 (最大 10 MB 每个)'
              : '文件大小不超过 10M'}
          </p>
        </Upload.Dragger>
      </div>
    </Modal>
  );
});

export default UploadContractModal;
