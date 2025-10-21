import {
  removeBigRule,
  removeStrategy,
  scenarioAdd,
  scenarioList,
  strategyList,
} from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Link, useRequest, useSearchParams } from '@umijs/max';
import { Button, Card, Input, List, Segmented, Typography, message } from 'antd';
import React, { useMemo, useState } from 'react';
import AddForm, { FormValueType } from './components/AddForm';

const { Text } = Typography;

const tabs = [
  {
    label: '审查策略',
    value: 0,
  },
  {
    label: '规则配置',
    value: 1,
  },
];

const handleAdd = async (fields: FormValueType) => {
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

const handleRemoveStrategy = async (row: API.StrategyItem) => {
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    await removeStrategy(row.id);
    hide();
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const handleRemoveRule = async (row: API.ScenarioItem) => {
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    await removeBigRule(row.id);
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
  const [tab, setTab] = useState(0);
  const [ruleKey, setRuleKey] = useState('');
  const [strategyKey, setStrategyKey] = useState('');
  const { data, refresh: refreshStrategy } = useRequest(strategyList);
  const { data: rules, refresh } = useRequest(scenarioList);
  const [searchParams] = useSearchParams();
  const tabId = searchParams.get('tab');

  const [scenarioModalOpen, setScenarioModalOpen] = useState(false);

  function addScenarioOpen() {
    setScenarioModalOpen(true);
  }

  function addScenarioCancel() {
    setScenarioModalOpen(false);
  }
  async function addScenarioConfirm(value: FormValueType) {
    const success = await handleAdd(value);
    if (success) {
      setScenarioModalOpen(false);
      refresh();
    }
  }

  const filterRules = useMemo(() => {
    return (
      rules?.records
        .filter((item) => item.name.includes(ruleKey))
        .sort((a, b) => b.createdSource - a.createdSource) ?? []
    );
  }, [rules, ruleKey]);

  const filterStrategies = useMemo(() => {
    return data?.records.filter((item) => item.name.includes(strategyKey)) ?? [];
  }, [data, strategyKey]);

  async function handleDelStrategy(row: API.StrategyItem) {
    const success = await handleRemoveStrategy(row);
    if (success) {
      refreshStrategy();
    }
  }

  async function handleDelRule(row: API.ScenarioItem) {
    const success = await handleRemoveRule(row);
    if (success) {
      refresh();
    }
  }

  return (
    <PageContainer>
      <Text type="secondary">合同配置可以配置专属的自定义审核规则</Text>
      <div className="mt-4">
        <Segmented options={tabs} onChange={setTab} defaultValue={tabId ? +tabId : tabs[0].value} />
      </div>
      {tab === 0 && (
        <>
          <div className="mt-4 flex items-center justify-between">
            <Input
              value={ruleKey}
              onChange={(e) => setStrategyKey(e.target.value)}
              className="w-[300px]"
              placeholder="输入策略名称搜索..."
            />
            <Button icon={<PlusOutlined />} iconPosition="start">
              <Link to="/clm/config/strategy-add">新增策略</Link>
            </Button>
          </div>
          <div className="mt-4">
            <List
              grid={{ gutter: 16, column: 3 }}
              dataSource={filterStrategies}
              renderItem={(item) => (
                <List.Item>
                  <Card title={item.name}>
                    <div className="h-10 text-sm line-clamp-2 overflow-hidden">
                      {item.description}
                    </div>
                    <div className="mt-2 flex justify-end gap-2">
                      <Button danger onClick={() => handleDelStrategy(item)}>
                        删除策略
                      </Button>

                      <Button>
                        <Link to={`/clm/config/strategy-edit/${item.id}`}>配置策略</Link>
                      </Button>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </div>
        </>
      )}
      {tab === 1 && (
        <>
          <div className="mt-4 flex items-center justify-between">
            <Input
              value={ruleKey}
              onChange={(e) => setRuleKey(e.target.value)}
              className="w-[300px]"
              placeholder="输入规则集名称搜索..."
            />
            <Button icon={<PlusOutlined />} iconPosition="start" onClick={addScenarioOpen}>
              新增规则集
            </Button>
          </div>
          <div className="mt-4">
            <List
              grid={{ gutter: 16, column: 3 }}
              dataSource={filterRules}
              renderItem={(item) => (
                <List.Item>
                  <Card title={item.name}>
                    <div className="flex justify-end gap-2">
                      {item.createdSource !== 0 && (
                        <Button danger onClick={() => handleDelRule(item)}>
                          删除规则
                        </Button>
                      )}

                      <Button disabled={item.createdSource === 0}>
                        <Link to={`/clm/config/rule-edit/${item.id}`}>配置规则</Link>
                      </Button>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </div>
        </>
      )}
      <AddForm
        onSubmit={addScenarioConfirm}
        onCancel={addScenarioCancel}
        visible={scenarioModalOpen}
      />
    </PageContainer>
  );
};

export default TableList;
