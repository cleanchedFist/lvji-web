import AddRuleSetModal from '@/components/AddRuleSetModal';
import { removeBigRule, scenarioList } from '@/services/ant-design-pro/api';
import { history, useRequest } from '@umijs/max';
import { message } from 'antd';
import { useMemo, useState } from 'react';
import RuleCard from './RuleCard';
import SearchRow from './SearchRow';

const handleRemoveRule = async (id: string) => {
  const hide = message.loading('正在删除');
  if (!id) return true;
  try {
    await removeBigRule(id);
    hide();
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const handleSet = (id: string) => {
  history.push(`/clm/config/rule-edit/${id}`);
};

const RulePanel = () => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [filterKeyword, setFilterKeyword] = useState('');
  const { data, refresh: refreshRules } = useRequest(scenarioList);
  const filterDatas = useMemo(() => {
    return (
      data?.records
        .filter((item) => item.name.includes(filterKeyword))
        .sort((a, b) => b.createdSource - a.createdSource) ?? []
    );
  }, [data, filterKeyword]);

  const handleSearch = (value: string) => {
    setFilterKeyword(value);
  };

  const handleAddRule = () => {
    setAddModalVisible(true);
  };

  const handleDeleteRule = async (id: string) => {
    const success = await handleRemoveRule(id);
    if (success) {
      refreshRules();
    }
  };

  const handleAddCancel = () => {
    setAddModalVisible(false);
  };

  const handleAddConfirm = async (success: boolean) => {
    if (success) {
      setAddModalVisible(false);
      refreshRules();
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <SearchRow
        placeholder="输入规则集名称搜索..."
        onChange={handleSearch}
        btnText="新增规则集"
        onAdd={handleAddRule}
      ></SearchRow>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filterDatas.map((i) => (
          <RuleCard key={i.id} {...i} onDelete={handleDeleteRule} onSet={handleSet}></RuleCard>
        ))}
      </div>
      <AddRuleSetModal
        onSubmit={handleAddConfirm}
        onCancel={handleAddCancel}
        visible={addModalVisible}
      ></AddRuleSetModal>
    </div>
  );
};

export default RulePanel;
