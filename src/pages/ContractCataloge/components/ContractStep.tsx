import { CircleCheck } from 'lucide-react';
import { useMemo } from 'react';

const ContractStep = ({ step }: { step: number }) => {
  const steps = ['起草中', '审核中', '签订中', '履约中', '已完成'];

  const stepsInfo = useMemo(
    () =>
      steps.map((i, k) => ({
        name: i,
        done: k <= step,
      })),
    [step],
  );

  return (
    <div className="relative flex justify-between">
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10 -translate-y-1/2"></div>
      {stepsInfo.map((i, k) => (
        <div key={k} className="flex flex-col items-center px-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-2 transition-all text-white ${
              i.done ? 'bg-indigo-600' : ''
            }`}
          >
            {i.done ? (
              <CircleCheck className="w-[16px] h-[16px]" />
            ) : (
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-2 transition-all bg-slate-200 text-slate-400">
                {k + 1}
              </div>
            )}
          </div>
          <span className="text-xs font-medium text-slate-500">{i.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ContractStep;
