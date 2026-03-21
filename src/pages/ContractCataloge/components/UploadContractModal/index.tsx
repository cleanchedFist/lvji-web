import { ModalButtonConfig } from '@/utils/modalConfig';
import { useModel } from '@umijs/max';
import { Modal, UploadFile, UploadProps } from 'antd';
import { forwardRef, useContext, useImperativeHandle, useMemo } from 'react';
import { CatalogePageContext } from '../../utils/context';
import {
  LawyerField,
  ModelField,
  ParseField,
  RequirementField,
  SideField,
  UploadField,
  UploadType,
  VersionField,
} from './FieldBox';
import OrderConfirmCard from './OrderConfirmCard';
import useUploadLogic, { UploadExtraProps } from './useUploadLogic'; //逻辑层：useUploadLogic
import { UploadFeature } from './utils';

const { okButtonProps, cancelButtonProps, okButtonDisabledProps } = ModalButtonConfig;

/** * ----------------------------------------------------------------
 * 展现层：UploadContractModal
 * ----------------------------------------------------------------
 */
export interface UploadContractModalRef {
  openModal: (features: UploadFeature[], extraPoprs: UploadExtraProps) => void;
}

const UploadContractModal = forwardRef<UploadContractModalRef>((props, ref) => {
  const catalogePageContext = useContext(CatalogePageContext);
  const { initialState } = useModel('@@initialState');

  const { state, actions, btnHandler } = useUploadLogic(catalogePageContext);
  const { hasFeature } = actions;

  const okBtnDisabled = useMemo(() => {
    // 用户账户，存在价格，
    return !!(
      state.orderPrice &&
      state.step === 2 &&
      +(initialState?.balance || 0) < +state.orderPrice
    );
  }, [initialState?.balance, state.orderPrice, state.step]);

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
      okButtonProps={{
        ...(okBtnDisabled ? okButtonDisabledProps : okButtonProps),
        loading: state.uploading,
        disabled: okBtnDisabled,
      }}
      cancelButtonProps={cancelButtonProps}
      destroyOnHidden={true}
      {...btnHandler}
    >
      <div className="flex flex-col gap-y-4 py-2">
        <div className="relative">
          {/* 配置区块：解耦出的配置项 */}
          <div className="relative; bg-gray-50 p-4 rounded-lg border border-gray-100 flex flex-col gap-4">
            {hasFeature('version') && <VersionField nextVersion={state.nextVersion} />}
            {hasFeature('side') && <SideField side={state.side} onChange={actions.setSide} />}

            {hasFeature('model') && (
              <ModelField
                model={state.model}
                onChange={actions.setModel}
                modelOptions={state.modelOptions}
              />
            )}
            {hasFeature('lawyer') && (
              <LawyerField
                lawyerId={state.lawyerId}
                lawyerOptions={state.lawyerOptions}
                onChange={actions.setLawyerId}
              />
            )}
            {hasFeature('parse') && (
              <ParseField shouldParse={state.shouldParse} onChange={actions.setShouldParse} />
            )}
          </div>

          {/* 需求说明 */}
          {hasFeature('requirement') && (
            <RequirementField requirement={state.requirement} onChange={actions.setRequirement} />
          )}
          {state.step === 2 && <div className="absolute inset-0 bg-white/50 z-50"></div>}
        </div>
        {/* 上传区域 */}
        {state.step === 1 && (
          <UploadField {...{ uploadDraggerProps, uploadType: state.uploadType }} />
        )}
        {state.step === 2 && (
          <OrderConfirmCard
            totalPrice={state.orderPrice}
            fileName={state.orderFileName}
            wordCount={state.contractWordCount}
          />
        )}
      </div>
    </Modal>
  );
});

export default UploadContractModal;
