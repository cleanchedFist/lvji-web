import { addRule, getResultList, removeReview, updateRule } from '@/services/ant-design-pro/api';
import { contractDownload } from '@/utils/contractHandle';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, Link, useIntl } from '@umijs/max';
import { Button, Drawer, Modal, message } from 'antd';
import React, { useRef, useState } from 'react';
import Detail from './components/Detail';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

const handleRemove = async (row: API.AnalysisListItem) => {
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    await removeReview(row.reviewId);
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
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.AnalysisListItem>();
  //   const [selectedRowsState, setSelectedRows] = useState<API.AnalysisListItem[]>([]);

  const [detail] = useState<API.AnalysisListItem>();

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  //   async function handleDetail(row: API.AnalysisListItem) {
  //     setShowDetail(true);
  //     try {
  //       const result = await analysisDetail(row.id);
  //       setDetail(result);
  //     } catch (error) {
  //       message.error('查看失败，请重试');
  //       setShowDetail(false);
  //     }
  //   }

  function handleDel(row: API.AnalysisListItem) {
    Modal.confirm({
      title: '确认删除审查结果?',
      content: '删除后将不能再恢复数据.',
      async onOk() {
        const success = await handleRemove(row);
        if (success) {
          actionRef.current?.reload();
        }
      },
    });
  }

  function handleExport(row: API.AnalysisListItem) {
    contractDownload(row);
  }

  const columns: ProColumns<API.AnalysisListItem>[] = [
    {
      title: '合同标题',
      dataIndex: 'contractName',
      render: (dom) => {
        return <span className="font-medium">{dom}</span>;
      },
      search: false,
    },
    {
      title: '文件名称',
      dataIndex: 'fileName',
    },
    {
      title: '分析主体',
      dataIndex: 'contractParty',
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      search: false,
      valueEnum: {
        1: {
          text: '进行中',
          status: 'Processing',
        },
        0: {
          text: '成功',
          status: 'Success',
        },
        2: {
          text: '失败',
          status: 'Error',
        },
      },
    },
    {
      title: '审查时间',
      dataIndex: 'createTimeStamp',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Button key="view" size="small" color="primary" variant="link">
          <Link to={`/clm/contract/view/${record.reviewId}`} state={{ name: record.contractName }}>
            查看
          </Link>
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
        record.status === '2' && (
          <Button key="check" size="small" color="primary" variant="link">
            <Link to={`/clm/contract/step/${record.fileId}`}>重新审查</Link>
          </Button>
        ),
        <Button
          key="export"
          size="small"
          color="primary"
          variant="link"
          onClick={() => handleExport(record)}
        >
          导出报告
        </Button>,
      ],
    },
  ];

  return (
    <PageContainer>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow sm:col-span-2">
          <div className="flex flex-col space-y-1.5 p-6 pb-3">
            <h3 className="font-semibold leading-none tracking-tight">合同分析</h3>
            <p className="text-sm leading-relaxed">
              在这里查看您的合同分析审查结果,可查看分析结果、合同评分、导出审查报告.
            </p>
          </div>
        </div>
        {/* <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="flex flex-col space-y-1.5 p-6 pb-2">
            <p className="text-sm text-muted-foreground">已分析合同</p>
            <h3 className="font-semibold tracking-tight text-4xl">0份</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-xs text-muted-foreground">共节省时间3小时</div>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="flex flex-col space-y-1.5 p-6 pb-2">
            <p className="text-sm text-muted-foreground">正在分析</p>
            <h3 className="font-semibold tracking-tight text-4xl">0份</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-xs text-muted-foreground">预计时间0分钟</div>
          </div>
        </div> */}
      </div>
      <div className="mt-4">
        <ProTable<API.AnalysisListItem, API.PageParams>
          headerTitle="审查结果列表"
          actionRef={actionRef}
          rowKey="key"
          toolbar={{ settings: undefined }}
          request={async (...args) => {
            const res = await getResultList(...args);
            return {
              data: res.data?.records ?? [],
              total: res.data?.total ?? 0,
            };
          }}
          columns={columns}
        />
      </div>

      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newRule',
          defaultMessage: 'New rule',
        })}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.RuleListItem);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="Rule name is required"
                />
              ),
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalOpen={updateModalOpen}
        values={currentRow || {}}
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
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {detail && <Detail data={detail} />}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
