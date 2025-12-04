import AnalysisBaseCard from './AnalysisBaseCard';

type responsibilitie = {
  condition: string;
  consequence: string;
  detail: string;
  original: string;
};

type ViolateItemData = {
  party: string;
  responsibilities: responsibilitie[];
};
type ViolateCardData = {
  contractee: ViolateItemData;
  contractor: ViolateItemData;
};

const LiRender = ({ i, k }: { i: responsibilitie; k: number }) => {
  const hasData = i.condition && i.consequence && i.detail && i.original;
  if (!hasData) return null;
  return (
    <li>
      <div key={k} className="mt-4 text-sm pl-4">
        <div className="font-bold relative">
          <span className="w-1 h-1 rounded-[2px] bg-black absolute left-[-10px] top-[10px]"></span>
          {i.condition}
        </div>
        <div className="pl-3 border-l-2 border-[#ff7d00] text-[#86909c] mt-2">{i.consequence}</div>
        <div className="text-[#4e5969] mt-2">{i.detail}</div>
      </div>
    </li>
  );
};

const ViolateItem = ({ data }: { data: ViolateItemData }) => {
  // title
  return (
    <div>
      <div className="text-base items-center font-bold">{data.party}</div>
      <ul>
        {data.responsibilities.map((i, k) => (
          <LiRender key={k} i={i} k={k}></LiRender>
        ))}
      </ul>
    </div>
  );
};

const ViolateCard = ({ data }: { data: ViolateCardData }) => {
  return (
    <AnalysisBaseCard title="交易流程">
      {data ? (
        <>
          <ViolateItem data={data.contractee}></ViolateItem>
          <ViolateItem data={data.contractor}></ViolateItem>
        </>
      ) : (
        '无内容'
      )}
    </AnalysisBaseCard>
  );
};
export default ViolateCard;
