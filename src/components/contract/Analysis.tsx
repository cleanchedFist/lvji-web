import { CaretRightOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Collapse, Skeleton } from 'antd';
import { useMemo } from 'react';
import Markdown from 'react-markdown';

const panelStyle: React.CSSProperties = {
  marginBottom: 24,
  borderWidth: '1px',
  borderRadius: '6px',
  background: '#fff',
};

// 交易流程
function LcItem(props) {
  const { data } = props;
  console.log(3333, data.secondParty);
  const items = useMemo(() => {
    return [
      {
        key: 0,
        label: <div className="text-sm font-bold">甲方</div>,
        children: (
          <ul>
            {data.firstParty?.map((item, index) => (
              <li key={index} className="list-disc ml-6">
                {item}
              </li>
            ))}
          </ul>
        ),
      },
      {
        key: 1,
        label: <div className="text-sm font-bold">乙方</div>,
        children: (
          <ul>
            {data.secondParty?.map((item, index) => (
              <li key={index} className="list-disc ml-6">
                {item}
              </li>
            ))}
          </ul>
        ),
      },
    ];
  }, [data]);

  return (
    <Collapse
      ghost
      defaultActiveKey={[0, 1]}
      bordered={false}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      items={items}
    />
  );
}

function WyItem({ data }) {
  return (
    <div>
      {data?.map((item, key) => {
        return (
          <div key={key} className="mt-4 text-sm pl-4">
            <div className="font-bold relative">
              <span className="w-1 h-1 rounded-[2px] bg-black absolute left-[-10px] top-[10px]"></span>
              {item.condition}
            </div>
            <div className="pl-3 border-l-2 border-[#ff7d00] text-[#86909c] mt-2">
              {item.consequence}
            </div>
            <div className="text-[#4e5969] mt-2">{item.detail}</div>
          </div>
        );
      })}
    </div>
  );
}

export default function (props) {
  const { bd, lc, md, wy } = props;

  const items = useMemo(() => {
    return (
      lc?.map((item, index) => {
        return {
          key: index,
          label: <div className="text-base font-bold">{item.nodeName}</div>,
          children: <LcItem data={item} />,
        };
      }) ?? []
    );
  }, [lc]);
  const defaultKeys = useMemo(() => {
    return lc ? new Array(lc.length).fill(0).map((item, index) => index) : [];
  }, [lc]);

  const mdItems = useMemo(() => {
    return (
      md?.map((item, index) => {
        return {
          key: index,
          label: <div className="text-base font-bold">{item.objective}</div>,
          children: (
            <ul>
              {item.conditions.map((inner, idx) => (
                <li key={idx} className="list-disc ml-6 text-base text-[#4e5969]">
                  {inner}
                </li>
              ))}
            </ul>
          ),
        };
      }) ?? []
    );
  }, [md]);

  const defaultMdKeys = useMemo(() => {
    return md ? new Array(md.length).fill(0).map((item, index) => index) : [];
  }, [md]);

  const wyItems = useMemo(() => {
    if (!wy) {
      return [];
    }
    return [
      {
        key: 0,
        label: <div className="text-base font-bold">{wy.contractee?.party}</div>,
        children: <WyItem data={wy.contractee?.responsibilities} />,
        style: panelStyle,
      },
      {
        key: 1,
        label: <div className="text-base font-bold">{wy.contractor?.party}</div>,
        children: <WyItem data={wy.contractor?.responsibilities} />,
        style: panelStyle,
      },
    ];
  }, [wy]);

  return (
    <div className="[&_.ant-collapse-content-box]:!py-2 [&_.ant-collapse-header]:!py-2">
      <div className="border border-[#c9cdd4] rounded-md bg-white p-4">
        <div className="flex items-center mb-5 h-16 border-b-[#e5e6eb] border-b">
          <div className="text-lg">
            <ThunderboltOutlined />
          </div>
          <div className="text-lg font-bold ml-2">合同标的</div>
        </div>
        <div className="pb-3 markdown-body">
          {bd === null ? '合同中未找到' : bd ? <Markdown>{bd}</Markdown> : <Skeleton />}
        </div>
      </div>
      <div className="border border-[#c9cdd4] rounded-md bg-white p-4 mt-4">
        <div className="flex items-center mb-5 h-16 border-b-[#e5e6eb] border-b">
          <div className="text-lg">
            <ThunderboltOutlined />
          </div>
          <div className="text-lg font-bold ml-2">交易流程</div>
        </div>
        <div className="pb-3">
          {lc === null ? (
            '合同中未找到'
          ) : !!items.length ? (
            <Collapse
              ghost
              defaultActiveKey={defaultKeys}
              bordered={false}
              expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
              items={items}
            />
          ) : (
            <Skeleton />
          )}
        </div>
      </div>
      <div className="border border-[#c9cdd4] rounded-md bg-white p-4 mt-4">
        <div className="flex items-center mb-5 h-16 border-b-[#e5e6eb] border-b">
          <div className="text-lg">
            <ThunderboltOutlined />
          </div>
          <div className="text-lg font-bold ml-2">合同目的</div>
        </div>
        <div className="pb-3">
          {md === null ? (
            '合同中未找到'
          ) : !!mdItems.length ? (
            <Collapse
              ghost
              defaultActiveKey={defaultMdKeys}
              bordered={false}
              expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
              items={mdItems}
            />
          ) : (
            <Skeleton />
          )}
        </div>
      </div>
      <div className="border border-[#c9cdd4] rounded-md bg-white p-4 mt-4">
        <div className="flex items-center mb-5 h-16 border-b-[#e5e6eb] border-b">
          <div className="text-lg">
            <ThunderboltOutlined />
          </div>
          <div className="text-lg font-bold ml-2">违约责任</div>
        </div>
        <div className="pb-3 [&_.ant-collapse-borderless]:!bg-transparent ">
          {wy === null ? (
            '合同中未找到'
          ) : !!wyItems.length ? (
            <Collapse
              bordered={false}
              defaultActiveKey={[0, 1]}
              expandIconPosition="end"
              items={wyItems}
            />
          ) : (
            <Skeleton />
          )}
        </div>
      </div>
    </div>
  );
}
