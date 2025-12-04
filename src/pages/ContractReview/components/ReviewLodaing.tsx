import { CheckCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export type LoadingTask = {
  name: string;
  taskList: {
    status: boolean;
    message: string;
  }[];
};

const ReviewLodaing = ({ taskQueue }: { taskQueue: LoadingTask[] }) => {
  return (
    <div className="w-full flex-1 flex-col  overflow-y-auto bg-white p-4 rounded-xl shadow-md">
      <div className="flex items-center gap-3 p-3 rounded-lg bg-indigo-100 text-indigo-600 from-[#4F46E5] to-[#E0E7FF]">
        <Spin className="[&_.ant-spin-dot-item]:bg-indigo-800" size="small" />
        <span>审核中，若关闭页面会以短信方式通知审查完成。</span>
      </div>
      <div>
        {taskQueue.map((item, index) => {
          return (
            <div key={index} className="mb-5">
              <div className="mt-2 font-bold">{item.name}</div>
              <div className="flex flex-col gap-2 mt-2">
                {item.taskList.map((child, idx) => (
                  <div className="flex items-center gap-2" key={idx}>
                    {!child.status ? (
                      <SyncOutlined spin style={{ color: '#86909c' }} />
                    ) : (
                      <CheckCircleOutlined style={{ color: '#4f46e5' }} />
                    )}
                    <span>{child.message}</span>
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

export default ReviewLodaing;
