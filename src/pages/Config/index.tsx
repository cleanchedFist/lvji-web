import PageContainer from '@/components/PageContainer';
import { useSearchParams } from '@umijs/max';
import React, { useState } from 'react';
import Segmented from './components/Segmented';

import RulePanel from './components/RulePanel';
import StrategyPanel from './components/StrategyPanel';

const tabOptions = [
  { label: '审查策略', value: 0 },
  { label: '规则配置', value: 1 },
];

const ContractConfig: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tabInParams = searchParams.get('tab');
  const [currentTab, setCurrentTab] = useState(tabInParams ? +tabInParams : 0);

  return (
    <PageContainer>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-lg font-bold text-slate-800 mb-2">合同配置</h2>
        <p className="text-slate-500 text-sm mb-6">合同配置可以配置专属的自定义审核规则。</p>
        <Segmented
          options={tabOptions}
          onChange={setCurrentTab}
          defaultValue={currentTab}
        ></Segmented>
        {currentTab === 0 && <StrategyPanel></StrategyPanel>}
        {currentTab === 1 && <RulePanel></RulePanel>}
      </div>
    </PageContainer>
  );
};

export default ContractConfig;
