// 修正导入路径：从 @ant-design/charts 切换到 @ant-design/plots，以确保模块正确解析
import { Pie } from '@ant-design/plots';

/**
 * 合同类型分布环形图组件
 * 使用 @ant-design/plots 的 Ring 组件
 */
const App = ({ data = [] }) => {
  // 环形图的配置
  const config = {
    data,
    angleField: '数量',
    colorField: '类型', // 颜色分类字段，即合同类型
    // 自定义颜色，使其更贴近图片中的颜色（蓝、红、紫、绿、橙）
    color: ['#6366F1', '#EC4899', '#9333EA', '#10B981', '#F59E0B'],
    radius: 0.8, // 外圈半径
    innerRadius: 0.6, // 内圈半径，形成环形效果

    // 禁用中心文本/统计信息，使其与图片保持一致
    statistic: {
      title: false,
      content: false,
    },

    // 增加 label 配置，提高可读性，虽然图中没有，但在实际应用中推荐
    label: {
      formatter: () => ``,
      style: {
        fill: '#374151',
        fontSize: 12,
        fontWeight: 'bold',
      },
      // 调整 label 的布局，避免重叠
      layout: [
        { type: 'limit-in-plot' }, // 限制 label 在图表区域内
        { type: 'pie-label-adjust' }, // 自动调整 label 位置
        { type: 'pie-statistic-active' }, // 选中时显示统计信息
      ],
    },

    // 图例配置
    legend: {
      position: 'right', // 将图例放在右侧
      itemMarker: 'circle', // 图例标记为圆形
      itemName: {
        style: {
          fill: '#374151', // 确保图例文字颜色清晰
        },
      },
    },

    // 启用交互，如鼠标悬停高亮
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],

    // 自适应和高度设置
    autoFit: true,
    height: 300,
  };

  return <Pie {...config} />;
};

export default App;
