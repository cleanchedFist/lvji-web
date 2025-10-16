import { addRule, removeRule, ruleList, updateRule } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useParams, useRequest } from '@umijs/max';
import { Button, Input, Table, Tag, message } from 'antd';
import React, { useMemo, useState } from 'react';
import AddForm from './components/AddFrom';
import ExpandableCell from './components/ExpandableCell';
import UpdateForm from './components/UpdateForm';

const handleRemove = async (row: API.RuleTypeItem) => {
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    await removeRule(row.id);
    hide();
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const handleUpdate = async (fields: Record<string, any>) => {
  const hide = message.loading('更新中');
  try {
    await updateRule(fields);
    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败，请重试');
    return false;
  }
};

const handleAdd = async (fields: Record<string, any>) => {
  const hide = message.loading('新增中');
  try {
    await addRule(fields);
    hide();
    message.success('新增成功');
    return true;
  } catch (error) {
    hide();
    message.error('新增失败，请重试');
    return false;
  }
};

const TableList: React.FC = () => {
  const params = useParams();
  const { data: rules, refresh } = useRequest(ruleList, {
    defaultParams: [params.id!],
  });

  const [updateModalOpen, handleUpdateModalOpen] = useState(false);
  const [addModalOpen, handleAddModalOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [keywords, setKeywords] = useState('');

  const filteredRuleList = useMemo(() => {
    return rules?.rulesDetailRecords.filter((item) => item.name?.includes(keywords));
  }, [keywords, rules]);

  async function handleDel(row: API.RuleListItem) {
    const success = await handleRemove(row);
    if (success) {
      refresh();
    }
  }

  function showUpdate(row: API.RuleListItem) {
    handleUpdateModalOpen(true);
    setCurrentRow(row);
  }

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      render(value: string) {
        return <div className="min-w-8">{value}</div>;
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      render(value: string) {
        return <ExpandableCell text={value}></ExpandableCell>;
      },
    },
    {
      title: '创建来源',
      dataIndex: 'createdSource',
      width: 100,
      render(value) {
        if (value === 0) {
          return <span>系统创建</span>;
        }
        if (value === 1) {
          return <span>用户自定义</span>;
        }
      },
    },
    {
      title: '风险等级',
      dataIndex: 'riskLevel',
      render(value) {
        if (value === 0) {
          return <Tag color="green">低风险</Tag>;
        }
        if (value === 1) {
          return <Tag color="orange">中风险</Tag>;
        }
        return <Tag color="red">高风险</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => [
        <Button
          key="update"
          size="small"
          color="primary"
          variant="link"
          onClick={() => showUpdate(record)}
        >
          修改
        </Button>,
        <Button
          key="view"
          size="small"
          color="primary"
          variant="link"
          onClick={() => handleDel(record)}
        >
          删除
        </Button>,
      ],
    },
  ];

  function updateCancel() {
    handleUpdateModalOpen(false);
    setCurrentRow(undefined);
  }

  async function updateConfirm(value: API.RuleListItem) {
    const success = await handleUpdate({
      ruleDetailId: value.id,
      ruleTableId: params.id,
      name: value.name,
      description: value.description,
      riskLevel: value.riskLevel,
    });
    if (success) {
      handleUpdateModalOpen(false);
      setCurrentRow(undefined);
      refresh();
    }
  }

  function showAdd() {
    handleAddModalOpen(true);
  }

  function addCancel() {
    handleAddModalOpen(false);
  }

  async function addConfirm(value: API.RuleListItem) {
    const success = await handleAdd({
      ruleTableId: params.id,
      name: value.name,
      description: value.description,
      riskLevel: value.riskLevel,
      createdSource: 1,
    });
    if (success) {
      handleAddModalOpen(false);
      refresh();
    }
  }

  return (
    <PageContainer>
      <div className="mt-4 flex items-center justify-between">
        <Input
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="w-[300px]"
          placeholder="输入规则名称搜索..."
        />
        <Button icon={<PlusOutlined />} iconPosition="start" onClick={showAdd}>
          新增规则
        </Button>
      </div>
      <div className="mt-4">
        <Table columns={columns} dataSource={filteredRuleList} pagination={false} />
      </div>
      <UpdateForm
        onSubmit={updateConfirm}
        onCancel={updateCancel}
        visible={updateModalOpen}
        values={currentRow || {}}
      />
      <AddForm onSubmit={addConfirm} onCancel={addCancel} visible={addModalOpen} values={{}} />
    </PageContainer>
  );
};

export default TableList;
