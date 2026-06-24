import { RightOutlined } from '@ant-design/icons';
import { Box, PencilLine, ShieldCheck } from 'lucide-react';
import AnalysisBaseCard from './AnalysisBaseCard';

// 定义数据接口
interface DealNodesCardData {
  nodeName: string;
  firstParty: string[];
  secondParty: string[];
}

// 模拟图标映射
const getIcon = (index: number) => {
  const icons = [
    <PencilLine key={1} size={18} className="text-blue-500" />,
    <Box key={2} size={18} className="text-indigo-500" />,
    <ShieldCheck key={3} size={18} className="text-purple-500" />,
  ];
  return icons[index % icons.length];
};

const DealNodesCard = ({ data }: { data: DealNodesCardData[] }) => {
  if (!data || !data.length) return <></>;
  return (
    <AnalysisBaseCard title="交易流程">
      <div className="relative ml-4 border-l-2 border-gray-50">
        {data?.map((node, nodeIdx) => (
          <div key={nodeIdx} className="mb-4 ml-[24px] relative">
            {/* 时间轴圆圈图标 */}
            <div className="absolute -left-[42px] -top-[4px] w-[36px] h-[36px] bg-white rounded-full border border-gray-100 shadow-sm flex items-center justify-center">
              {getIcon(nodeIdx)}
            </div>

            {/* 节点标题 */}
            <h3 className="text-lg font-bold text-gray-800 mb-4">{node.nodeName}</h3>

            {/* 甲方与乙方内容区域 */}
            <div className="space-y-4">
              {/* 甲方卡片 */}
              {node.firstParty && (
                <div className="rounded-xl p-4 border border-gray-150">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded">
                      甲方
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {node.firstParty?.map((item, k) => (
                      <li
                        key={k}
                        className="flex items-center gap-2 text-sm text-gray-600 leading-relaxed"
                      >
                        <RightOutlined className="stroke-current stroke-[60px] w-[10px] h-[10px] text-blue-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 乙方卡片 */}
              {node.secondParty && (
                <div className="rounded-xl p-4 border border-gray-150">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-green-100 text-green-600 text-xs font-bold px-2 py-1 rounded">
                      乙方
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {node.secondParty?.map((item, k) => (
                      <li
                        key={k}
                        className="flex items-center gap-2 text-sm text-gray-600 leading-relaxed"
                      >
                        <RightOutlined className="stroke-current stroke-[60px] w-[10px] h-[10px] text-green-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </AnalysisBaseCard>
  );
};

export default DealNodesCard;
