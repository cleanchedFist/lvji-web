import { deleteContractDir } from '@/services/ant-design-pro/api';
import { contractDownload } from '@/utils/contractHandle';
import { history } from '@umijs/max';
import { Button, Modal, message } from 'antd';
import { useContext } from 'react';
import { ActionContext, ContractVersionsContext } from '../utils/context';

const handleDownload = (data: API.CatalogeCardProps) => {
  const contractName = data.name;
  contractDownload({ contractName, reviewId: data.latestFileId });
};

const handleViewContract = (data: API.CatalogeCardProps) => {
  history.push(`/clm/contract/view/${data.reviewId}`);
};

const handleReview = (data: API.CatalogeCardProps) => {
  history.push(`/clm/contract/step/${data.latestFileId}`);
};

export default function ContractCardActions(_: any, data: API.CatalogeCardProps) {
  const actionContext = useContext(ActionContext);
  const contractVersionsContext = useContext(ContractVersionsContext);

  const handleDelete = (id: number) => {
    deleteContractDir(`${id}`)
      .then(() => {
        contractVersionsContext.reloadList();
      })
      .catch(() => {
        message.error('删除失败，请重试');
      });
  };

  const handleDeleteClick = (data: API.CatalogeCardProps) => {
    Modal.confirm({
      title: '确认删除合同目录?',
      content: '删除后目录下的所有合同将不能再恢复数据.',
      async onOk() {
        await handleDelete(data.id);
      },
    });
  };

  return [
    <Button
      key="viewContract"
      disabled={!data.checked}
      style={{ margin: '0 0 0 8px' }}
      onClick={() => handleViewContract(data)}
    >
      查看最新版本
    </Button>,
    <Button key="download" onClick={() => handleDownload(data)}>
      下载最新版本
    </Button>,
    <Button
      key="versionList"
      onClick={() => {
        actionContext.versionHandler(data);
      }}
    >
      历史版本记录
    </Button>,
    <Button
      key="check"
      disabled={data.checked}
      onClick={() => {
        handleReview(data);
      }}
    >
      智能审查
    </Button>,
    <Button
      key="delete"
      onClick={() => {
        handleDeleteClick(data);
      }}
    >
      删除
    </Button>,
    <Button
      key="upload"
      type="primary"
      onClick={() => {
        contractVersionsContext.onUploadDVersionBtnClick(data.id);
      }}
    >
      上传新版本
    </Button>,
  ];
}
