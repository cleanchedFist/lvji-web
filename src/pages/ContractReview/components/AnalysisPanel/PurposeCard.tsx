import AnalysisBaseCard from './AnalysisBaseCard';
import Collapse from './Collapse';
type PurposeCardData = {
  conditions: string[];
  objective: string;
};

const PurposeCard = ({ data }: { data: PurposeCardData[] }) => {
  return (
    <AnalysisBaseCard title="交易流程">
      {data?.map((i, k) => (
        <div key={k} className="mt-2">
          <Collapse className="text-base items-center font-bold" title={i?.objective || ''}>
            <ul>
              {i?.conditions?.map((i, k) => (
                <li key={k} className="list-disc ml-6  mt-2">
                  {i}
                </li>
              ))}
            </ul>
          </Collapse>
        </div>
      ))}
    </AnalysisBaseCard>
  );
};
export default PurposeCard;
