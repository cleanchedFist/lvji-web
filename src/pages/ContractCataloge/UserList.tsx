import PageContainer from '@/components/PageContainer';
import { ActionType } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';
import CatalogeList from './components/CatalogeList';
import ContractSummary from './components/ContractSummary';
import ContractVersionList, { ContractVersionListRef } from './components/ContractVersionList';
import UploadContractModal, { UploadContractModalRef } from './components/UploadContractModal';
import { ActionContext, CatalogePageContext } from './utils/context';

const UserList: React.FC = () => {
  const modalRef = useRef<UploadContractModalRef>(null);
  const versionListRef = useRef<ContractVersionListRef>(null);
  const actionRef = useRef<ActionType>();
  const [listType, setListType] = useState(1);
  const ActionsHandler = {
    viewHandler: () => {},
    downloadHandler: () => {},
    versionHandler: (data: API.CatalogeCardProps) => {
      versionListRef.current?.openModal(data);
    },
    reviewHandler: () => {},
    uploadVersionHandler: () => {},
  };

  const CatalogePageContextValue = {
    listType,
    onUploadDirBtnClick: () => {
      modalRef.current?.openModal(1);
    },
    onUploadDVersionBtnClick: (id: number) => {
      modalRef.current?.openModal(2, id);
    },
    reloadList: () => {
      actionRef.current?.reload();
    },
    updateListType: (type: number) => {
      setListType(type);
    },
  };

  return (
    <PageContainer>
      <CatalogePageContext.Provider value={CatalogePageContextValue}>
        <ContractSummary />
        <div className="mt-4">
          <ActionContext.Provider value={ActionsHandler}>
            <CatalogeList ref={actionRef}></CatalogeList>
          </ActionContext.Provider>
        </div>
        <ContractVersionList ref={versionListRef}></ContractVersionList>
        <UploadContractModal ref={modalRef}></UploadContractModal>
      </CatalogePageContext.Provider>
    </PageContainer>
  );
};

export default UserList;
