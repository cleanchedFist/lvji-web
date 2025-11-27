import { Line } from '@ant-design/plots';

const AuditTrendChart = ({ data = [] }) => {
  const config = {
    data,
    xField: '日期',
    yField: '数量',
    shapeField: 'smooth',
    autoFit: true,
    area: {
      style: {
        fill: 'l(270) 0:#ffffff 0.5:rgba(91, 143, 249, 0.3) 1:rgba(91, 143, 249, 1)',
      },
    },
    style: {
      lineWidth: 2,
    },
    axis: {
      x: {
        labelAutoRotate: false,
        labelAutoHide: false,
      },
    },
  };

  return <Line {...config}></Line>;
};

export default AuditTrendChart;
