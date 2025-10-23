import AddRule from '@/components/AddRule';
import AddRuleSet, { RuleSetFormValueType } from '@/components/AddRuleSet';
import { addRule, ruleList, scenarioAdd, scenarioList } from '@/services/ant-design-pro/api';
import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { useControlModel } from '@ant-design/pro-components';
import { useNavigate, useRequest } from '@umijs/max';
import { Button, Drawer, Input, Menu, Space, Table, Tag, message } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import { useEffect, useMemo, useState } from 'react';

export function RuleDrawer(props: { [key: string]: any }) {
  const { selected: initSelected = [], open, onChange, onClose } = props;
  const { data: list, refresh: refreshRuleSet } = useRequest(scenarioList);
  const {
    data: rules,
    run,
    refresh: refreshRule,
  } = useRequest(ruleList, {
    manual: true,
  });

  const [ruleSetAddModalOpen, setRuleSetModalOpen] = useState(false);
  const [ruleModalOpen, setRuleModalOpen] = useState(false);

  const [keywords, setKeywords] = useState('');

  const [selected, setSelected] = useState('');

  const [selectedMap, setSelectedMap] = useState<any>({});

  const ruleColumns = [
    {
      title: '规则名称',
      dataIndex: 'name',
    },
    {
      title: '规则描述',
      dataIndex: 'description',
    },
    {
      title: '规则来源',
      dataIndex: 'createdSource',
      width: 100,
      render(value: any) {
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
      render(value: any) {
        if (value === 0) {
          return <Tag color="green">低风险</Tag>;
        }
        if (value === 1) {
          return <Tag color="orange">中风险</Tag>;
        }
        return <Tag color="red">高风险</Tag>;
      },
    },
  ];

  const filteredRuleList = useMemo(() => {
    return rules?.rulesDetailRecords.filter((item) => item.name?.includes(keywords));
  }, [keywords, rules]);
  function handleSelect(item: MenuInfo) {
    setSelected(item.key);
    run(item.key);
  }
  function confirm() {
    const items = Object.values(selectedMap).flat();
    onChange(items);
    onClose();
  }

  const onSelectChange = (_, newSelectedRows: API.RuleListItem[]) => {
    // 1: 4 5 6 2: 7 8 9
    setSelectedMap((v) => {
      // 这里要把init里面当前tab下的所有都去掉
      return {
        ...v,
        init: v['init'].filter(
          (item: { [key: string]: any }) =>
            !rules?.rulesDetailRecords.find((row) => row.id === item.id),
        ),
        [selected]: newSelectedRows,
      };
    });
  };

  const selectedRowKeys =
    Object.values(selectedMap)
      .flat()
      .map((item) => item.id) ?? [];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    setSelectedMap({ init: initSelected });
  }, [initSelected]);

  // ==新增规则 新增规则集 start==

  const handleAddRuleSet = async (fields: RuleSetFormValueType) => {
    const hide = message.loading('新增中');
    try {
      await scenarioAdd(fields);
      hide();
      message.success('新增成功');
      return true;
    } catch (error) {
      hide();
      message.error('新增失败，请重试');
      return false;
    }
  };
  async function addRuleSetConfirm(value: RuleSetFormValueType) {
    const success = await handleAddRuleSet(value);
    if (success) {
      setRuleSetModalOpen(false);
      refreshRuleSet();
    }
  }

  function addScenarioCancel() {
    setRuleSetModalOpen(false);
  }

  function showRuleSetDrawer() {
    setRuleSetModalOpen(true);
  }

  const showRuleAddBtn = useMemo(() => {
    const selectedRuleSet = list?.records.find((row) => +row.id === +selected);
    return !selectedRuleSet || selectedRuleSet?.createdSource === 0;
  }, [selected]);

  function showRuleDrawer() {
    setRuleModalOpen(true);
  }

  const handleRuleAdd = async (fields: Record<string, any>) => {
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

  async function addRuleConfirm(value: API.RuleListItem) {
    const success = await handleRuleAdd({
      ruleTableId: selected,
      name: value.name,
      description: value.description,
      riskLevel: value.riskLevel,
      createdSource: 1,
    });
    if (success) {
      setRuleModalOpen(false);
      refreshRule();
    }
  }

  function addCancel() {
    setRuleModalOpen(false);
  }
  // ==新增规则 新增规则集 end==

  return (
    <Drawer
      height="80%"
      title="从规则库选择"
      placement="bottom"
      onClose={onClose}
      closable={false}
      open={open}
      destroyOnClose
    >
      <div className="flex flex-1 h-full overflow-hidden">
        <div className="flex flex-col w-64 border-r p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-semibold ">规则库</div>
            <div className="text-xs text-[#1890ff] cursor-pointer" onClick={showRuleSetDrawer}>
              新增规则库
            </div>
          </div>
          <div className="flex flex-col h-full overflow-auto">
            {list && (
              <Menu
                items={list.records.map((item) => ({ key: item.id, label: item.name }))}
                selectedKeys={[selected]}
                onClick={handleSelect}
              />
            )}
          </div>
        </div>
        <div className="flex-1 p-4 h-full overflow-auto">
          <div className="flex justify-between items-top mb-4">
            <div>
              <Input
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-[300px]"
                placeholder="请输入规则名称进行搜索"
              />
              <Button className="ml-4" onClick={confirm}>
                确认({selectedRowKeys.length})
              </Button>
            </div>
            <div
              hidden={showRuleAddBtn}
              className="text-sm text-[#1890ff] cursor-pointer"
              onClick={showRuleDrawer}
            >
              新增规则
            </div>
          </div>
          <Table
            rowKey="id"
            rowSelection={rowSelection}
            columns={ruleColumns}
            dataSource={filteredRuleList}
            pagination={false}
          />
        </div>
      </div>
      <AddRuleSet
        onSubmit={addRuleSetConfirm}
        onCancel={addScenarioCancel}
        visible={ruleSetAddModalOpen}
      />
      <AddRule onSubmit={addRuleConfirm} onCancel={addCancel} visible={ruleModalOpen} values={{}} />
    </Drawer>
  );
}

export function RuleFormItem(props) {
  const [open, setOpen] = useState(false);
  const { value = [], onChange } = useControlModel(props);
  const navigate = useNavigate();
  const columns = [
    {
      title: '序号',
      key: 'index',
      render: (_value, _record, index) => <span>{index + 1}</span>,
    },
    {
      title: '规则名称',
      dataIndex: 'name',
    },
    {
      title: '规则来源',
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
      render: (_, record) => (
        <a onClick={() => onChange(value.filter((item) => item.id !== record.id))}>删除</a>
      ),
    },
  ];

  function show() {
    setOpen(true);
  }

  function close() {
    setOpen(false);
  }

  return (
    <div>
      {!!value.length && <Table columns={columns} dataSource={value} pagination={false} />}
      <Space className="mt-2">
        <Button icon={<PlusOutlined />} onClick={show}>
          添加规则
        </Button>
        <Button icon={<SettingOutlined />} onClick={() => navigate('/clm/config?tab=1')}>
          管理规则库
        </Button>
      </Space>
      <RuleDrawer open={open} onChange={onChange} onClose={close} selected={value} />
    </div>
  );
}
