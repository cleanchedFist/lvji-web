import PageContainer from '@/components/PageContainer';
import { getResultList } from '@/services/ant-design-pro/api';
import { ProTable } from '@ant-design/pro-components';
import React from 'react';
import ProtableConfig from './utils/ProtableConfig';

const TableList: React.FC = () => {
  return (
    <PageContainer>
      <ProTable<API.AnalysisListItem, API.PageParams>
        rowKey="reviewId"
        toolbar={{ settings: undefined }}
        request={async (params) => {
          const res = await getResultList(params);
          return {
            data: res.data?.records ?? [],
            total: res.data?.total ?? 0,
          };
        }}
        {...ProtableConfig}
      />
    </PageContainer>
  );
};

export default TableList;
