import { Radar } from '@ant-design/charts';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Popover, Typography } from 'antd';
import { useMemo } from 'react';

const { Title, Text } = Typography;

const config = {
  xField: 'name',
  yField: 'star',
  area: {
    style: {
      fillOpacity: 0.8,
    },
  },
  scale: {
    x: {
      padding: 0.5,
      align: 0,
    },
    y: {
      nice: true,
    },
  },
  axis: {
    x: {
      title: false,
      grid: true,
    },
    y: {
      label: false,
      title: false,
    },
  },
};

export default function Detail(props: { data: API.AnalysisListItem }) {
  const { data } = props;

  const score = useMemo(() => {
    return data.review_score.map((item) => ({ name: item.type, star: item.score }));
  }, [data.review_score]);

  const radarConfig = useMemo(() => {
    return {
      data: score,
      ...config,
    };
  }, [score]);

  return (
    <div>
      <div className="p-6 bg-[#f4f4f5]">
        <Title level={4}>审查ID：{data.id}</Title>
        <Text>结束时间：{data.finish_time}</Text>
      </div>
      <div className="p-6">
        <div className="border-b border-b-[#e4e4e7] py-4">
          <Title level={5}>审查概要</Title>
          <div className="text-[#71717a] text-sm">{data.review_conclusion}</div>
        </div>

        <div className="py-4">
          <Title level={5} className="flex items-center gap-x-2">
            合同评分
            <Popover content="大模型将会对合同进行不同维度的评分,评分越高越积极,得分范围0~100">
              <QuestionCircleOutlined />
            </Popover>
          </Title>
          <Radar {...radarConfig} />
        </div>
      </div>
    </div>
  );
}
