import './pagination.css';
import ProtableCustomRender from './ProtableCustomRender';
import ProtablePagination from './ProtablePagination';
import ProtableSearchForm from './ProtableSearchForm';
import columns from './tableColumn';

const ProtableConfig = {
  columns,
  pagination: {
    showSizeChanger: false,
    showTotal: () => null,
    rootClassName: 'justify-center custom-pagination',
    itemRender: (current: any, type: string, originalElement: React.ReactNode) => {
      return <ProtablePagination current={current} type={type} originalElement={originalElement} />;
    },
  },
  tableRender: (props: any, dom: JSX.Element) => {
    return <ProtableCustomRender dom={dom} />;
  },
  searchFormRender: (props: any, defaultDom: JSX.Element) => {
    return <ProtableSearchForm defaultDom={defaultDom} />;
  },
};

export default ProtableConfig;
