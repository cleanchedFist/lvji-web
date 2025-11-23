import { retrievalCount } from '@/services/ant-design-pro/api';
import { useRequest } from '@umijs/max';
import React from 'react';
import NewCataloge from './NewCataloge';

const TableList: React.FC = () => {
  // 请求通信数据
  const { data: summaryData } = useRequest(retrievalCount);

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
      <NewCataloge />
      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <div className="flex flex-col space-y-1.5 p-6 pb-2">
          <p className="text-sm text-muted-foreground">本周</p>
          <h3 className="font-semibold tracking-tight text-4xl">
            {summaryData?.weekExpireCount}个
          </h3>
        </div>
        <div className="p-6 pt-0">
          <div className="text-xs text-muted-foreground">合同审核到期</div>
        </div>
      </div>
      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <div className="flex flex-col space-y-1.5 p-6 pb-2">
          <p className="text-sm text-muted-foreground">本月</p>
          <h3 className="font-semibold tracking-tight text-4xl">
            {summaryData?.monthExpireCount}个
          </h3>
        </div>
        <div className="p-6 pt-0">
          <div className="text-xs text-muted-foreground">合同审核到期</div>
        </div>
      </div>
    </div>
  );
};

export default TableList;
