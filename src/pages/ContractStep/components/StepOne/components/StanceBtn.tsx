type StanceBtnProps = {
  onClick: (value: string) => void;
  label: string;
  value: string;
  active: boolean;
};

const wrapClassNames = 'p-4 border rounded-lg hover:border-indigo-200 transition duration-1500';
const activeClassNames = 'border-indigo-200 bg-indigo-50';
const unActiveClassNames = 'border-gray-200 bg-white';
const StanceBtn = ({ label, value, active, onClick }: StanceBtnProps) => {
  return (
    <div
      className={`${wrapClassNames} ${active ? activeClassNames : unActiveClassNames}`}
      onClick={() => onClick(label)}
    >
      <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">{label}</h3>
      <p className="text-lg font-medium text-gray-800">{value || '-'}</p>
    </div>
  );
};

export default StanceBtn;
