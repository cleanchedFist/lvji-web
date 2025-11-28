import { retrievalCount } from '@/services/ant-design-pro/api';
import { ClockCircleOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/max';
import { Col, Row } from 'antd';
import React from 'react';
import NewCataloge from './NewCataloge';
import StatCard from './StatCard';

const TableList: React.FC = () => {
  // 请求通信数据
  const { data: summaryData } = useRequest(retrievalCount);

  return (
    <Row gutter={30}>
      <Col span={12}>
        <NewCataloge />
      </Col>
      <Col span={6}>
        <StatCard
          icon={ClockCircleOutlined}
          count={summaryData?.weekExpireCount}
          label="本周合同审核到期"
          colorClass="text-indigo-400"
        />
      </Col>
      <Col span={6}>
        <StatCard
          icon={ClockCircleOutlined}
          count={summaryData?.monthExpireCount}
          label="本月合同审核到期"
          colorClass="text-indigo-400"
        />
      </Col>
    </Row>
  );
};

export default TableList;
