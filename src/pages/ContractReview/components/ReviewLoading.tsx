import { CheckCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export type LoadingTask = {
  name: string;
  taskList: {
    status: string;
    message: string;
  }[];
};

const ReviewLoading = ({ taskQueue }: { taskQueue: LoadingTask[] }) => {
  return (
    <div className="w-full flex-1 flex-col  overflow-y-auto bg-white p-4 rounded-xl shadow-md">
      <div className="flex items-center gap-3 p-3 rounded-lg bg-indigo-100 text-indigo-600 from-[#4F46E5] to-[#E0E7FF]">
        <Spin className="[&_.ant-spin-dot-item]:bg-indigo-800" size="small" />
        <span>
          系统正在对合同进行深度审查，因合同内容复杂度存在差异，审查预计耗时 5-10 分钟，敬请耐心等候
        </span>
      </div>
      <div>
        {taskQueue.map((item, index) => {
          return (
            <div key={index} className="mb-5">
              <div className="mt-2 font-bold">{item.name}</div>
              <div className="flex flex-col gap-2 mt-2">
                {item.taskList.map((child, idx) => (
                  <div className="flex items-center gap-2" key={idx}>
                    {child.status === 'pending' && (
                      <SyncOutlined spin style={{ color: '#86909c' }} />
                    )}
                    {child.status === 'finished' && (
                      <CheckCircleOutlined style={{ color: '#4f46e5' }} />
                    )}

                    {child.status !== 'waiting' && <span>{child.message}</span>}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewLoading;
