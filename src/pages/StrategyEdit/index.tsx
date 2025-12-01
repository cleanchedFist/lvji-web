import PageContainer from '@/components/PageContainer';
import { useLocation, useNavigate, useParams } from '@umijs/max';
import React, { useCallback, useEffect, useState } from 'react';
import StrategyForm, { FormData, SubmitFormData } from './components/StrategyForm';
import getPageType from './utils/getPageType';
import strategyEditHandleMap from './utils/strategyEditHandleMap';

const StrategyEdit: React.FC = () => {
  const navigate = useNavigate();
  const pageType = getPageType(useLocation());
  const [formData, setFormData] = useState<FormData>({});

  // 获取初始化数据
  const params = useParams();

  const { initFn, updateStrategy, title } = strategyEditHandleMap[pageType];
  useEffect(() => {
    initFn(params.id).then(({ data }: { data: FormData }) => {
      setFormData(data);
    });
  }, []);

  const back = useCallback(() => {
    navigate(-1);
  }, []);

  const handleUpdateStrategy = (data: SubmitFormData) => {
    updateStrategy(data, params.id);
  };

  return (
    <PageContainer header={{ title: null }}>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-1">{title}</h2>
        <p className="text-slate-400 text-sm mb-8">审核策略由一组审核规则构成。</p>
        <StrategyForm data={formData} onCancel={back} onConfirm={handleUpdateStrategy} />
      </div>
    </PageContainer>
  );
};

export default StrategyEdit;
