import { getDirList } from '@/services/ant-design-pro/api';
import { ActionType, PageContainer, ProList } from '@ant-design/pro-components';
import { Col, Row } from 'antd';
import React, { useRef } from 'react';
import ContractCardActions from './components/ContractCardActions';
import ContractSummary from './components/ContractSummary';
import ContractVersionList, { ContractVersionListRef } from './components/ContractVersionList';
import UploadContractModal, { UploadContractModalRef } from './components/UploadContractModal';
import { ActionContext, ContractVersionsContext } from './utils/context';
import formatTime from './utils/formatTime';
import pollingList from './utils/pollingList';

const ContractCataloge: React.FC = () => {
  const modalRef = useRef<UploadContractModalRef>(null);
  const versionListRef = useRef<ContractVersionListRef>(null);
  const actionRef = useRef<ActionType>();

  const metas = {
    title: { dataIndex: 'name', search: true, title: '合同目录名称' },
    content: {
      search: false,
      render(_: any, data: API.CatalogeCardProps) {
        return (
          <div style={{ width: '100%' }}>
            <Row style={{ width: '100%' }}>
              <Col span={12}>甲方：{data.parta}</Col>
              <Col span={12}>创建时间：{formatTime(data.createTimeStamp)}</Col>
            </Row>
            <Row style={{ width: '100%', margin: '20px 0 0 0' }}>
              <Col span={12}>乙方：{data.partb}</Col>
            </Row>
          </div>
        );
      },
    },
    extra: {
      search: false,
      render(_: any, data: API.CatalogeCardProps) {
        return <div>最新版本号：v{data.version || '1.0.0'}</div>;
      },
    },
    actions: {
      cardActionProps: 'actions' as const,
      render: ContractCardActions,
    },
  };

  const ActionsHandler = {
    viewHandler: () => {},
    downloadHandler: () => {},
    versionHandler: (data: API.CatalogeCardProps) => {
      versionListRef.current?.openModal(data);
    },
    reviewHandler: () => {},
    uploadVersionHandler: () => {},
  };

  const ContractVersionsHandler = {
    onUploadDirBtnClick: () => {
      modalRef.current?.openModal(1);
    },
    onUploadDVersionBtnClick: (id: number) => {
      modalRef.current?.openModal(2, id);
    },
    reloadList: () => {
      actionRef.current?.reload();
    },
  };

  const pollingHander = pollingList(actionRef);
  return (
    <PageContainer>
      <ContractVersionsContext.Provider value={ContractVersionsHandler}>
        <ContractSummary />
        <div className="mt-4">
          <ActionContext.Provider value={ActionsHandler}>
            <ProList
              actionRef={actionRef}
              rowKey="id"
              pagination={{
                defaultPageSize: 10,
                showSizeChanger: false,
              }}
              search={{ labelWidth: 120 }}
              grid={{ gutter: 16, column: 1 }}
              metas={metas}
              headerTitle="合同目录列表"
              request={async (...args) => {
                const [params] = args;
                const res = await getDirList(params);
                pollingHander.end();
                pollingHander.start(res.data?.records, ...args);
                return {
                  data: res.data?.records ?? [],
                  total: res.data?.total ?? 0,
                };
              }}
            ></ProList>
          </ActionContext.Provider>
        </div>
        <ContractVersionList ref={versionListRef}></ContractVersionList>
        <UploadContractModal ref={modalRef}></UploadContractModal>
      </ContractVersionsContext.Provider>
    </PageContainer>
  );
};

export default ContractCataloge;
