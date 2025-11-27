import { Column } from '@ant-design/plots';

// 模拟图表所需的数据，根据图片中的柱高进行近似

const UploadStatisticsChart = ({ data = [] }) => {
  // 图表的配置项
  const config = {
    data,
    xField: '日期',
    yField: '数量',
    // 设置柱子的颜色为图中所示的蓝色
    color: '#4186F0',
    // 隐藏图例，因为只有一类数据
    legend: false,
    style: {
      // 圆角样式
      radiusTopLeft: 4,
      radiusTopRight: 4,
      maxWidth: 20,
    },

    // Y 轴配置：匹配刻度和网格线样式
    yAxis: {
      min: 0,
      max: 32, // 匹配图中的最大值
      tickCount: 5, // 0, 8, 16, 24, 32 共 5 个刻度
      // 配置网格线为虚线
      grid: {
        line: {
          style: {
            stroke: '#d9d9d9',
            lineWidth: 1,
            lineDash: [4, 4], // 虚线样式
          },
        },
      },
      // 隐藏 Y 轴的轴线
      line: null,
      label: {
        // 格式化 Y 轴标签，确保显示整数
        formatter: (v: string) => `${v}`,
      },
    },

    // X 轴配置
    xAxis: {
      // 隐藏 X 轴的轴线
      line: null,
      // 隐藏 X 轴的刻度线
      tickLine: null,
    },

    // 柱子样式：设置顶部圆角
    columnStyle: {
      radius: [4, 4, 0, 0],
    },

    // 额外的图表交互配置（可选）
    interactions: [{ type: 'active-region' }],

    // 调整图表边距，使内容居中，并为标题留出空间
    padding: [40, 20, 40, 20], // Top, Right, Bottom, Left
    autoFit: true,
    height: 300,
  };

  return <Column {...config} />;
};

export default UploadStatisticsChart;
