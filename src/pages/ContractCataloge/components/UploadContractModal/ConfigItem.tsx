import { Typography } from 'antd';
const { Text } = Typography;
/** * 辅助小型组件：用于样式统一
 */
const ConfigItem = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex items-center">
    <Text type="secondary" className="w-20 flex-shrink-0 text-xs">
      {label}：
    </Text>
    <div className="flex-1">{children}</div>
  </div>
);

export default ConfigItem;
