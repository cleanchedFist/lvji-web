import { useModel } from '@umijs/max';
import { Modal, UploadFile, UploadProps } from 'antd';
import { forwardRef, useContext, useImperativeHandle, useMemo, useRef } from 'react';
import { CatalogePageContext } from '../../utils/context';
import ClientConfirmModal, { ClientConfirmModalHandler } from './ClientConfirmModal';
import {
  ModelField,
  ParseField,
  RequirementField,
  SideField,
  UploadField,
  UploadType,
  VersionField,
} from './FieldBox';
import { CancelBtn, OkBtn } from './FooterBtn';
import OrderConfirmCard from './OrderConfirmCard';
import useUploadLogic, { UploadExtraProps } from './useUploadLogic'; //逻辑层：useUploadLogic
import { UploadFeature } from './utils';

/** * ----------------------------------------------------------------
 * 展现层：UploadContractModal
 * ----------------------------------------------------------------
 */
export interface UploadContractModalRef {
  openModal: (features: UploadFeature[], extraPoprs: UploadExtraProps) => void;
}

const UploadContractModal = forwardRef<UploadContractModalRef>((props, ref) => {
  const catalogePageContext = useContext(CatalogePageContext);
  const clientConfirmRef = useRef<ClientConfirmModalHandler>(null);
  const { initialState } = useModel('@@initialState');

  const { state, actions, btnHandler } = useUploadLogic(catalogePageContext, {
    handleClientConfirmOpen: clientConfirmRef?.current?.openModal || (() => ({})),
  });
  const { hasFeature } = actions;

  const okBtnDisabled = useMemo(() => {
    const isTooLong =
      state.step === 2 && state.contractWordCount && state.contractWordCount > 25000;
    const isInsufficient =
      state.step === 2 &&
      state.orderPrice &&
      +(initialState?.balance?.availableBalance || 0) < +state.orderPrice;
    return !!(isTooLong || isInsufficient);
  }, [initialState?.balance, state.orderPrice, state.step, state.contractWordCount]);

  // 对外暴露 API
  useImperativeHandle(ref, () => ({
    openModal: actions.handleOpen,
  }));

  const uploadDraggerProps: UploadProps = {
    // 阻止默认的上传行为（不发送 post 请求到 action 地址）
    beforeUpload: () => false,

    // 统一由 onChange 处理列表展示
    onChange: ({ file, fileList }) => {
      if (state.uploadType === UploadType.dir && !initialState?.isUserRole) {
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
    multiple: state.uploadType === UploadType.dir && !initialState?.isUserRole,
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
      destroyOnHidden={true}
      onCancel={actions.handleClose}
      footer={[
        <CancelBtn
          key="submit"
          disabled={state.uploading}
          text={btnHandler.cancelText}
          onClick={btnHandler.onCancel}
        />,
        <OkBtn
          key="back"
          loading={state.uploading}
          disabled={okBtnDisabled}
          text={btnHandler.okText}
          onClick={btnHandler.onOk}
        />,
      ]}
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
            {/* {hasFeature('lawyer') && (
              <LawyerField
                lawyerId={state.lawyerId}
                lawyerOptions={state.lawyerOptions}
                onChange={actions.setLawyerId}
              />
            )} */}
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
        <ClientConfirmModal
          ref={clientConfirmRef}
          onConfirm={actions.handleUpload}
          uploading={state.uploading}
        />
      </div>
    </Modal>
  );
});

export default UploadContractModal;
