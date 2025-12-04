import AnalysisBaseCard from './AnalysisBaseCard';
import Collapse from './Collapse';
type DealNodesCardData = {
  firstParty: string[];
  nodeName: string;
  secondParty: string[];
};

const DealNodesCard = ({ data }: { data: DealNodesCardData[] }) => {
  return (
    <AnalysisBaseCard title="交易流程">
      {data.map((i, k) => (
        <div key={k} className="mt-2">
          <Collapse className="text-base items-center font-bold" title={i.nodeName}>
            <div className="ml-6 mt-4">
              <Collapse className="text-sm font-bold" title="甲方">
                <ul>
                  {i.firstParty?.map((i, k) => (
                    <li key={k} className="list-disc ml-6  mt-2">
                      {i}
                    </li>
                  ))}
                </ul>
              </Collapse>
              <div className="mt-4">
                <Collapse className="text-sm font-bold" title="乙方">
                  <ul>
                    {i.secondParty?.map((i, k) => (
                      <li key={k} className="list-disc ml-6 mt-2">
                        {i}
                      </li>
                    ))}
                  </ul>
                </Collapse>
              </div>
            </div>
          </Collapse>
        </div>
      ))}
    </AnalysisBaseCard>
  );
};
export default DealNodesCard;
