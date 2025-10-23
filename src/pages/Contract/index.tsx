import {
  contract,
  contractDetail,
  removeContract,
  retrievalCount,
  updateContract,
  uploadContract,
} from '@/services/ant-design-pro/api';
import { Radar } from '@ant-design/charts';
import { InboxOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Link, useRequest } from '@umijs/max';
import { Button, Drawer, Modal, Upload, UploadFile, UploadProps, message } from 'antd';
import React, { useRef, useState } from 'react';
import Detail from './components/Detail';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';

const { Dragger } = Upload;

const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('更新中');
  try {
    await updateContract(fields);
    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败，请重试');
    return false;
  }
};

const handleRemove = async (row: API.ContractListItem) => {
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    await removeContract(row.id);
    hide();
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC = () => {
  const { data } = useRequest(retrievalCount);
  const [uploadModalVisible, setUploadModalVisible] = useState<boolean>(false);

  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [detail, setDetail] = useState<{ data: API.ContractListItem }>();

  // 创建轮询对象
  function pollingTable() {
    let timer: any = null;
    async function pollingTableasync(changingIds: string[], ...args: any[]) {
      try {
        const response = await contract(...args);
        const newIds = response.data?.records?.filter((i) => i.status === 1).map((i) => i.id) || [];

        // 重新刷新 队尾id一致且数量减少
        // 队尾id不一致且数量不变或增加
        // 原始数组里有数组[]
        // 减少
        // 队尾id变了，就数组里的数据是不存在于新数据
        let needLoop = false;
        if (changingIds[0] === newIds[0]) {
          needLoop = !!(changingIds.length === newIds.length);
        } else {
          // 判断 旧id 不存在于 新id中
          // 有一个改变中的id不存在于新的id集合中，说明更新完成
          // 更新完成后，结束loop
          const hasDone = changingIds?.filter((i) => !newIds.includes(i));
          needLoop = !hasDone.length;
        }

        if (needLoop) {
          timer = setTimeout(() => {
            pollingTableasync(newIds, ...args);
          }, 1000);
        } else {
          // eslint-disable-next-line
          timer && clearTimeout(timer);
          actionRef.current?.reload();
        }
      } catch (error) {
        console.error('长轮询错误:', error);
        // eslint-disable-next-line
        timer && clearTimeout(timer);
      }
    }

    function stopPollingTable() {
      // eslint-disable-next-line
      timer && clearTimeout(timer);
    }
    function startPollingTable(records?: API.ContractListItem[], ...args: any[]) {
      const changingIds = records?.filter((i) => i.status === 1).map((i) => i.id) || [];
      if (changingIds.length > 0) {
        pollingTableasync(changingIds, ...args);
      }
    }
    return { start: startPollingTable, end: stopPollingTable };
  }

  function handleDel(row: API.ContractListItem) {
    Modal.confirm({
      title: '确认删除合同?',
      content: '删除合同后将不能再恢复数据.',
      async onOk() {
        const success = await handleRemove(row);
        if (success) {
          actionRef.current?.reload();
        }
      },
    });
  }

  async function handleDetail(row: API.ContractListItem) {
    setShowDetail(true);
    try {
      const result = await contractDetail(row.id);
      setDetail(result);
    } catch (error) {
      message.error('查看失败，请重试');
      setShowDetail(false);
    }
  }

  function showUpdate() {
    handleUpdateModalOpen(true);
  }

  async function updateConfirm(value: API.ContractListItem) {
    const success = await handleUpdate(value);
    if (success) {
      handleUpdateModalOpen(false);
      setDetail(undefined);
      setShowDetail(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
    }
  }

  function updateCancel() {
    handleUpdateModalOpen(false);
    if (!showDetail) {
      setDetail(undefined);
    }
  }

  const columns: ProColumns<API.ContractListItem>[] = [
    {
      title: '合同标题',
      dataIndex: 'title',
      render: (dom) => {
        return <span className="font-medium">{dom}</span>;
      },
    },
    {
      title: '合同阶段',
      dataIndex: 'stage',
      search: false,
    },
    {
      title: '解析状态',
      dataIndex: 'status',
      hideInForm: true,
      search: false,
      valueEnum: {
        1: {
          text: '进行中',
          status: 'Processing',
        },
        2: {
          text: '成功',
          status: 'Success',
        },
        3: {
          text: '失败',
          status: 'Error',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTimeStamp',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Button
          key="view"
          size="small"
          color="primary"
          variant="link"
          onClick={() => handleDetail(record)}
        >
          查看
        </Button>,
        <Button
          key="del"
          size="small"
          color="danger"
          variant="link"
          onClick={() => handleDel(record)}
        >
          删除
        </Button>,
        <Button key="check" size="small" color="primary" variant="link">
          <Link to={`/clm/contract/step/${record.id}`}>智能审查</Link>
        </Button>,
      ],
    },
  ];

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const uploadProps: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    onChange(files) {
      setFileList([...files.fileList]);
    },
    fileList,
  };

  const handleUpload = () => {
    setUploading(true);
    const fileRequest = fileList.map((item) => uploadContract(item as unknown as File));
    Promise.all(fileRequest)
      .then(() => {
        setFileList([]);
        message.success('上传成功');
        setUploadModalVisible(false);
      })
      .catch(() => {
        message.error('上传失败，请重试');
      })
      .finally(() => {
        actionRef.current?.reload();
        setUploading(false);
      });
  };
  const pollingHander = pollingTable();
  return (
    <PageContainer>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow sm:col-span-2">
          <div className="flex flex-col space-y-1.5 p-6 pb-3">
            <h3 className="font-semibold leading-none tracking-tight">合同管理</h3>
            <p className="text-sm text-balance max-w-lg leading-relaxed">
              上传您的合同,在这里完善合同的基本信息.合同文件有更新可以替换合同附件.
            </p>
          </div>
          <div className="flex items-center p-6 pt-0">
            <Button
              type="primary"
              onClick={() => {
                setUploadModalVisible(true);
              }}
            >
              上传合同
            </Button>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="flex flex-col space-y-1.5 p-6 pb-2">
            <p className="text-sm text-muted-foreground">本周</p>
            <h3 className="font-semibold tracking-tight text-4xl">{data?.weekExpireCount}个</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-xs text-muted-foreground">合同审核到期</div>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="flex flex-col space-y-1.5 p-6 pb-2">
            <p className="text-sm text-muted-foreground">本月</p>
            <h3 className="font-semibold tracking-tight text-4xl">{data?.monthExpireCount}个</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-xs text-muted-foreground">合同审核到期</div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <ProTable<API.ContractListItem, API.PageParams>
          headerTitle="合同列表"
          actionRef={actionRef}
          rowKey="key"
          search={{
            labelWidth: 120,
          }}
          toolbar={{ settings: undefined }}
          request={async (...args) => {
            const res = await contract(...args);
            pollingHander.end();
            pollingHander.start(res.data?.records, ...args);
            return {
              data: res.data?.records ?? [],
              total: res.data?.total ?? 0,
            };
          }}
          columns={columns}
        />
      </div>

      <Modal
        title="上传合同"
        width={600}
        open={uploadModalVisible}
        onOk={handleUpload}
        okButtonProps={{ loading: uploading }}
        onCancel={() => setUploadModalVisible(false)}
      >
        <div className="py-4">
          <Dragger {...uploadProps} multiple>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="text-base font-medium text-[#71717a]">
              在这里拖拽多个文件或者点击上传文件
            </p>
            <p className="text-[#71717a]/75 text-sm">你可以上传 10 个文件 (最大 10 MB 每个)</p>
          </Dragger>
        </div>
      </Modal>
      <UpdateForm
        onSubmit={updateConfirm}
        onCancel={updateCancel}
        visible={updateModalOpen}
        values={detail?.data || {}}
      />

      <Drawer
        width={400}
        styles={{
          body: {
            padding: '0',
          },
        }}
        open={showDetail}
        onClose={() => {
          setShowDetail(false);
          setDetail(undefined);
        }}
        closable={false}
      >
        {detail && <Detail data={detail.data} showUpdate={showUpdate} />}
      </Drawer>
      <Radar />
    </PageContainer>
  );
};

export default TableList;
