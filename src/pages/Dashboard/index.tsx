import { Files, UnDoFile, WarnFile } from '@/components/Icon';
import PageContainer from '@/components/PageContainer';
import { retrievalAll } from '@/services/ant-design-pro/api';
import { useRequest } from '@umijs/max';
import { Col, Row } from 'antd';
import React from 'react';
import AuditTrendChart from './components/AuditTrendChart';
import DataOverviewCard, { DataOverviewCardProps } from './components/DataOverviewCard';
import TypeDistribution from './components/TypeDistribution';
import UploadStatisticsChart from './components/UploadStatisticsChart';

const Dashboard: React.FC = () => {
  const { data } = useRequest(retrievalAll);

  const list: DataOverviewCardProps[] = [
    {
      name: '合同总数',
      icon: <Files />,
      mainColor: '#4379ee',
      value: `${data?.totalNumber ?? '--'}`,
    },
    {
      name: '未审查合同',
      icon: <UnDoFile />,
      mainColor: '#f59e0b',
      value: `${data?.uncheckedNumber ?? '--'}`,
    },
    {
      icon: <WarnFile />,
      mainColor: '#f43f5e',
      name: '到期合同',
      value: `${data?.expireNumber ?? '--'}`,
    },
  ];
  const lineData = data?.timeGroupByList
    ?.reverse()
    ?.map((item: { date: string; count: string }) => ({
      日期: item.date,
      数量: item.count,
    }));
  const pieData = data?.typeGroupByList?.map((item: { type: string; count: string }) => ({
    类型: item.type,
    数量: item.count,
  }));

  const colData = data?.timeGroupByList
    ?.reverse()
    ?.map((item: { date: string; count: string }) => ({
      日期: item.date,
      数量: item.count,
    }));

  return (
    <PageContainer>
      <Row gutter={16}>
        {list.map((item, index) => (
          <Col key={index} span={8}>
            <DataOverviewCard key={index} data={item}></DataOverviewCard>
          </Col>
        ))}
      </Row>
      <Row>
        <Col span={24}>
          <div className="rounded-xl border bg-white shadow mt-8 p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 pb-3 ">审查趋势分析</h1>
            <AuditTrendChart data={lineData}></AuditTrendChart>
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <div className="rounded-xl border bg-white shadow mt-8 p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 pb-3">上传合同统计</h1>
            <UploadStatisticsChart data={colData}></UploadStatisticsChart>
          </div>
        </Col>
        <Col span={12}>
          <div className="rounded-xl border bg-white shadow mt-8 p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 pb-3">合同类型分布</h1>
            <TypeDistribution data={pieData}></TypeDistribution>
          </div>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Dashboard;
