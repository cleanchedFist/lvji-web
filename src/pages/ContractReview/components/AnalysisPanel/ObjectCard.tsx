import Markdown from 'react-markdown';
import AnalysisBaseCard from './AnalysisBaseCard';
import { components } from './MarkdownStyle';

const ObjectCard = ({ data }: { data: string }) => {
  return (
    <AnalysisBaseCard title="合同标的">
      {data ? <Markdown components={components}>{data}</Markdown> : '合同中未找到'}
    </AnalysisBaseCard>
  );
};

export default ObjectCard;
