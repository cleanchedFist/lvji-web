import { removeStrategy, strategyList } from '@/services/ant-design-pro/api';
import { history, useRequest } from '@umijs/max';
import { message } from 'antd';
import { useMemo, useState } from 'react';
import SearchRow from './SearchRow';
import StrategyCard from './StrategyCard';

const handleAddStrategy = () => {
  history.push(`/clm/config/strategy-add`);
};

const handleRemoveStrategy = async (id: string) => {
  const hide = message.loading('正在删除');
  if (!id) return true;
  try {
    await removeStrategy(id);
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
  history.push(`/clm/config/strategy-edit/${id}`);
};

const StrategyPanel = () => {
  const [filterKeyword, setFilterKeyword] = useState('');
  const { data, refresh: refreshStrategy } = useRequest(strategyList);
  const filterDatas = useMemo(() => {
    return data?.records.filter((item) => item.name.includes(filterKeyword)) ?? [];
  }, [data, filterKeyword]);

  const handleSearch = (value: string) => {
    setFilterKeyword(value);
  };

  const handleDelStrategy = async (id: string) => {
    const success = await handleRemoveStrategy(id);
    if (success) {
      refreshStrategy();
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <SearchRow
        placeholder="输入策略名称搜索..."
        onChange={handleSearch}
        btnText="新增策略"
        onAdd={handleAddStrategy}
      ></SearchRow>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {filterDatas.map((i) => (
          <StrategyCard
            key={i.id}
            {...i}
            onDelete={handleDelStrategy}
            onSet={handleSet}
          ></StrategyCard>
        ))}
      </div>
    </div>
  );
};

export default StrategyPanel;
