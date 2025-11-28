import Icon from '@ant-design/icons';

type StatCardProps = {
  icon: any;
  count: string;
  label: string;
  colorClass: string;
};

const StatCard = ({ icon, count, label, colorClass }: StatCardProps) => {
  const baseCardClasses = 'p-6 rounded-xl transition-all duration-300';
  return (
    <div
      className={`${baseCardClasses} bg-white flex flex-col items-center shadow-sm justify-center space-y-3 h-full`}
    >
      <div className={`p-3 rounded-full bg-gray-100 ${colorClass}`}>
        <Icon component={icon} style={{ fontSize: 24 }} className="block text-gray-400" />
      </div>
      <div className="flex text-4xl font-semibold text-gray-900 items-end ">
        {count}
        <span className="text-sm ml-1 align-top text-gray-400 align-bottom">个</span>
      </div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
};

export default StatCard;
