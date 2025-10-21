import { contractPre, strategyList } from '@/services/ant-design-pro/api';
import { BulbOutlined, CheckCircleFilled, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Link, useNavigate, useParams, useRequest } from '@umijs/max';
import { Button, Input, Select } from 'antd';
import React, { useState } from 'react';

const scaleInfoMap = [
  {
    id: 0,
    title: '强势',
    tip: '你所代表阵营的谈判地位较高，对合同的修改尺度较大，可修改的程度较高，系统在审查修改时会尽量多争取权利条款，尽量避免义务条款。',
  },
  {
    id: 1,
    title: '中立',
    tip: '合同双方谈判地位势均，你所代表的阵营无明显优势。系统在在审查合同时应以完善合同内容、增强合同的可操作性为出发点，以权利义务对等为原则，对合同内容进行审查和修改。',
  },
  {
    id: 2,
    title: '弱势',
    tip: '你所代表阵营的谈判地位较低，对合同的修改尺度处于相对劣势。系统在审查修改时对于与实现合同核心目的有关的底线问题必须修改，对于非底线问题可适度放宽审查标准。',
  },
];

function Step1(props) {
  const { data, form } = props;
  const [position, setPosition] = useState(form.position ?? 0);
  const [checkScale, setCheckScale] = useState(form.checkScale ?? 0);
  const [strategy, setStragety] = useState(form.strategy);
  const [annotations, setAnnotations] = useState(form.annotations ?? '');

  const { data: strategyArr } = useRequest(strategyList);

  const selectOptions = strategyArr?.records?.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  function confirm() {
    props.onOk({
      data: {
        reviewStance: position === 0 ? data.partyA : data.partyB,
        scale: scaleInfoMap[checkScale].title,
        strategyId: strategy,
        reviewer: annotations,
      },
      form: {
        position,
        checkScale,
        strategy,
        annotations,
      },
    });
  }
  return (
    <div>
      <div>
        <div className="flex items-center justify-between">
          <div>
            <div className="relative text-lg font-bold pl-[14px] before:absolute before:w-[6px] before:h-[6px] before:bg-[#009e59] before:rounded-full before:top-1/2 before:left-0 before:mt-[-3px]">
              选择你的立场
            </div>
            <div className="mt-1 pl-[14px] text-[#86909c] text-sm">选定你的合同审查立场</div>
          </div>
          <div className="text-base font-bold">{data.contractType}</div>
        </div>
        <div className="flex items-center justify-center gap-x-8 mt-5">
          <div
            className={`flex-1 px-4 py-5 border border-[#e5e6eb] rounded-md cursor-pointer hover:border-[#009e59] ${
              position === 0 && 'border-[#009e59] bg-[#009e59]/[.06]'
            }`}
            onClick={() => setPosition(0)}
          >
            <div className="text-[#86909c] text-base">甲方</div>
            <div className="h-[96px] overflow-hidden text-2xl font-bold">{data.partyA}</div>
          </div>
          <div
            className={`flex-1 px-4 py-5 border border-[#e5e6eb] rounded-md cursor-pointer hover:border-[#009e59] ${
              position === 1 && 'border-[#009e59] bg-[#009e59]/[.06]'
            }`}
            onClick={() => setPosition(1)}
          >
            <div className="text-[#86909c] text-base">乙方</div>
            <div className="h-[96px] overflow-hidden text-2xl font-bold">{data.partyB}</div>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <div className="flex items-center justify-between">
          <div>
            <div className="relative text-lg font-bold pl-[14px] before:absolute before:w-[6px] before:h-[6px] before:bg-[#009e59] before:rounded-full before:top-1/2 before:left-0 before:mt-[-3px]">
              选择你的审查尺度
            </div>
            <div className="mt-1 pl-[14px] text-[#86909c] text-sm">
              选定不同审查尺度，对应不同的审查范围
            </div>
          </div>
        </div>
        <div className="p-1 flex items-center justify-center mt-5 rounded-md bg-[#f7f7f7]">
          <div
            className={`h-[54px] flex-1 flex justify-center items-center rounded-md cursor-pointer ${
              checkScale === 0 && ' bg-white'
            }`}
            onClick={() => setCheckScale(0)}
          >
            <div className="text-lg">强势</div>
          </div>
          <div
            className={`h-[54px] flex-1 flex justify-center items-center rounded-md cursor-pointer ${
              checkScale === 1 && ' bg-white'
            }`}
            onClick={() => setCheckScale(1)}
          >
            <div className="text-lg">中立</div>
          </div>
          <div
            className={`h-[54px] flex-1 flex justify-center items-center rounded-md cursor-pointer ${
              checkScale === 2 && ' bg-white'
            }`}
            onClick={() => setCheckScale(2)}
          >
            <div className="text-lg">弱势</div>
          </div>
        </div>
        <div className="text-[#86909c] text-sm mt-3">{scaleInfoMap[checkScale].tip}</div>
      </div>
      <div className="mt-12">
        <div className="flex items-center justify-between">
          <div>
            <div className="relative text-lg font-bold pl-[14px] before:absolute before:w-[6px] before:h-[6px] before:bg-[#009e59] before:rounded-full before:top-1/2 before:left-0 before:mt-[-3px]">
              设置审阅人
            </div>
            <div className="mt-1 pl-[14px] text-[#86909c] text-sm">
              设置审阅人名称，在导出修订版本生效
            </div>
          </div>
        </div>
        <div className="mt-5">
          <Input
            value={annotations}
            onChange={(e) => setAnnotations(e.target.value)}
            className="w-[300px]"
            size="large"
          />
        </div>
      </div>
      <div className="mt-12">
        <div className="flex items-center justify-between">
          <div>
            <div className="relative text-lg font-bold pl-[14px] before:absolute before:w-[6px] before:h-[6px] before:bg-[#009e59] before:rounded-full before:top-1/2 before:left-0 before:mt-[-3px]">
              设置审查重点
            </div>
            <div className="mt-1 pl-[14px] text-[#86909c] text-sm">
              编辑设置合同重点，影响代表方的审查倾向
            </div>
          </div>
        </div>
        <div className="mt-5">
          <Select
            className="w-[300px]"
            size="large"
            showSearch
            value={strategy}
            placeholder="选择一个策略"
            optionFilterProp="label"
            onChange={setStragety}
            options={selectOptions}
          />
        </div>
        <div className="mt-5">
          <Button icon={<PlusOutlined />} iconPosition="start">
            <Link to="/clm/config/strategy-add">新增策略</Link>
          </Button>
        </div>
      </div>
      <div className="mt-12 flex justify-center">
        <Button type="primary" size="large" className="w-40" onClick={confirm}>
          下一步
        </Button>
      </div>
    </div>
  );
}

const list = [
  {
    label: '标的审查',
    desc: '系统分析合同标的类型及标的详情，智能分析标的条款可能存在的风险并进行审查修改。',
    value: 'objectRule',
    checked: true,
  },
  {
    label: '目的审查',
    desc: '系统基于审查立场分析其通过合同希望实现的目的以及对应需要满足的条件，进一步分析合同中对应的权利义务条款是否存在风险并进行审查修改。',
    value: 'purposeRule',
    checked: true,
  },
  //   {
  //     label: '主体审查',
  //     desc: '调取合同相对方的信息，分析相关主体的资信能力以及是否具备合同签署的资质或许可。',
  //     value: 'ccc',
  //     checked: true,
  //   },
  {
    label: '违约责任',
    desc: '分析我方及相对方在合同中的义务及对应的违约责任条款安排，并判断相关条款安排是否存在风险。',
    value: 'violateRule',
    checked: true,
  },
  {
    label: '程序性条款审查',
    desc: '判断合同中是否包含鉴于、免责、通知与送达、争议解决、保密、效力、附件、签署等程序性条款，并分析是否存在风险。',
    value: 'clauseRule',
    checked: true,
  },
  {
    label: '交易节点规则',
    desc: '交易节点规则审查。',
    value: 'dealNodesRule',
    checked: true,
  },
];

function Step2(props) {
  const [items, setItems] = useState(list);

  function confirm() {
    props.onOk(
      items
        .filter((item) => item.checked)
        .reduce((pre, cur) => {
          pre[cur.value] = true;
          return pre;
        }, {}),
    );
  }
  function check(value: string) {
    setItems(
      items.map((item) => ({
        ...item,
        checked: item.value === value ? !item.checked : item.checked,
      })),
    );
  }

  return (
    <div>
      <div>
        <div className="flex items-center justify-between">
          <div>
            <div className="relative text-lg font-bold pl-[14px] before:absolute before:w-[6px] before:h-[6px] before:bg-[#009e59] before:rounded-full before:top-1/2 before:left-0 before:mt-[-3px]">
              选择合同审查组件
            </div>
            <div className="mt-1 pl-[14px] text-[#86909c] text-sm">
              系统将根据审查清单中的具体审查要求及参考资料审查合同。
            </div>
          </div>
        </div>
        <div className="flex flex-wrap mt-5">
          {items.map((item) => (
            <div
              key={item.value}
              className="flex-shrink-0 flex-grow-0 basis-1/2 p-3"
              onClick={() => check(item.value)}
            >
              <div
                className={`group border border-[#e5e6eb] rounded-md px-3 py-4 cursor-pointer hover:border-[#009e59] ${
                  item.checked && 'border-[#009e59]'
                }`}
              >
                <div className="flex justify-between items-center">
                  <BulbOutlined style={{ fontSize: '20px' }} />
                  {item.checked ? (
                    <CheckCircleFilled style={{ fontSize: '20px' }} className="text-[#009e59]" />
                  ) : (
                    <div className="w-[20px] h-[20px] rounded-full border border-[#e5e6eb] group-hover:border-[#009e59]" />
                  )}
                </div>
                <div className="text-lg font-bold mt-3">{item.label}</div>
                <div className="text-[#86909c] text-sm mt-2 h-[60px] overflow-hidden">
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 flex flex-col gap-y-2 items-center ">
        <Button type="primary" size="large" className="w-40" onClick={confirm}>
          确定
        </Button>
        <Button type="link" size="large" className="w-40" onClick={props.onBack}>
          返回上一步
        </Button>
      </div>
    </div>
  );
}

const TableList: React.FC = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const params = useParams();
  const { data } = useRequest(contractPre, {
    defaultParams: [params.id!],
  });
  const [step1Data, setStep1Data] = useState({});
  const [step1Form, setStep1Form] = useState({});

  function next(value) {
    setStep1Data(value.data);
    setStep1Form(value.form);
    setStep(1);
  }
  function back() {
    setStep(0);
  }
  function finish(value) {
    const reviewParams = {
      partyA: data.partyA,
      partyB: data.partyB,
      contractType: data.contractType,
      ...step1Data,
      ...value,
    };
    localStorage.setItem('reviewParams', JSON.stringify(reviewParams));
    if (data.reviewResultNewId) {
      navigate(`/clm/contract/detail/${data.reviewResultNewId}`);
    }
  }

  if (!data) {
    return null;
  }

  return (
    <PageContainer>
      <div className="rounded-xl border shadow px-6 py-8 bg-white">
        {step === 0 && <Step1 form={step1Form} data={data} onOk={next} />}
        {step === 1 && <Step2 onOk={finish} onBack={back} />}
      </div>
    </PageContainer>
  );
};

export default TableList;
