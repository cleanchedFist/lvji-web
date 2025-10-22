import AllTab from '@/components/contract/AllTab';
import Analysis from '@/components/contract/Analysis';
import WebOfficeProvider from '@/store/wpsProvider';
import { contractDownload } from '@/utils/contractHandle';
import { DownloadOutlined, FileDoneOutlined, FireOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { Tabs, message } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import Loading from './components/Loading';

// const wsParams = {
//   partyA: 'xxxxx有限责任公司',
//   partyB: 'yyyyy有限公司',
//   scale: '强势',
//   reviewStance: '发包方',
//   contractType: '智能家居设备采购合同',
//   reviewer: 'xkm',
//   strategyId: 27,
//   objectRule: true,
//   purposeRule: true,
//   violateRule: true,
//   clauseRule: true,
//   dealNodes: true,
// };

// const sdkConfig = 0;
// = {
//   mode: 'sample',
//   officeType: 'w',
//   appId: 'SX20250707WNEWPR',
//   fileId: '322',
//   token: '1',
//   mount: '#wps-container',
//   //   isListenResize: false,
// };

const TableList: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState([]);
  const params = useParams();
  const [mode, setMode] = useState(0);
  const [fileId, setFileId] = useState();

  const sdkConfig = useMemo(() => {
    const token = window.localStorage.getItem('token');
    if (!fileId || !token) {
      return null;
    }
    return {
      mode: 'sample',
      officeType: 'w',
      appId: 'AK20250915UQIAZX',
      fileId,
      token,
      mount: '#wps-container',
    };
  }, [fileId]);

  // 合同标的
  const [bd, setBd] = useState('');

  // 目的审查
  const [md, setMd] = useState([]);

  // 违约责任审查
  const [wy, setWy] = useState();

  // 程序性条款
  //   const [_, setCx] = useState('');

  // 交易流程
  const [lc, setLc] = useState([]);

  const [items, setItems] = useState([]);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    const wsParams = localStorage.getItem('reviewParams');
    if (!token || !wsParams) {
      return;
    }

    const ws = new WebSocket(
      `ws://175.27.214.13:11086/api/llm-service/review-contract/${
        params.id
      }?Authorization=${token.slice(7)}`,
    );
    ws.onopen = function () {
      ws.send(wsParams);
    };
    ws.onmessage = function (evt) {
      const data = JSON.parse(evt.data);
      console.log('onmessage', data);
      if (data.type) {
        if (data.type === 'file') {
          setFileId(data.fileId);
        } else if (data.type === '合同标的') {
          setBd(data.mdContent);
        } else if (data.type === '目的审查') {
          //objective：标题 conditions：条件
          setMd(data.objectives);
        } else if (data.type === '违约责任审查') {
          // contractee contractor : party responsibilities: [{condition, consequence, detail, original}]
          setWy(data.contractParties);
        } else if (data.type === '程序性条款审查') {
          // contractClauses: [{clauseName, original, reviewResult, riskLevel, reviewBasics: [{type, detail, description}]}]
          //   setCx(data.contractClauses);
        } else if (data.type === '交易流程') {
          //nodeName firstParty secondParty
          setLc(data.dealNodes);
        }
      }
      if (data.reviewType) {
        setItems((v) => v.concat([data]));
      }
      if (data.taskQueue) {
        if (data.status) {
          ws.close();
        }
        setLoading(!data.status);
        setTask(data.taskQueue);
      }
    };
    ws.onerror = function (e) {
      message.error('ws 接口报错了');
      console.log('ws 接口报错了', e);
    };
    ws.onclose = function () {
      //   message.error('ws 断开了');
      console.log('ws 断开了');
    };
    return () => {
      ws.close();
    };
  }, [params.id]);

  const [items1, items2, items3, items4, items5] = useMemo(() => {
    // 高风险，合同标的，合同条款，文字符号，自定义策略
    return items.reduce(
      (pre, cur) => {
        if (cur.riskLevel === '高风险') {
          pre[0].push(cur);
        }
        if (cur.reviewType === '合同标的') {
          pre[1].push(cur);
        }
        if (cur.reviewType === '合同条款') {
          pre[2].push(cur);
        }
        if (cur.reviewType === '文字符号') {
          pre[3].push(cur);
        }
        if (cur.reviewType === '自定义策略') {
          pre[4].push(cur);
        }
        return pre;
      },
      [[], [], [], [], []],
    );
  }, [items]);

  const tabsItem = useMemo(() => {
    return [
      {
        key: '2',
        label: '全部',
        children: <AllTab items={items} />,
      },
      {
        key: '3',
        label: '高风险',
        children: <AllTab items={items1} />,
      },
      {
        key: '4',
        label: '合同标的',
        children: <AllTab items={items2} />,
      },
      {
        key: '5',
        label: '合同条款',
        children: <AllTab items={items3} />,
      },
      {
        key: '6',
        label: '文字符号',
        children: <AllTab items={items4} />,
      },
      {
        key: '7',
        label: '自定义策略',
        children: <AllTab items={items5} />,
      },
    ];
  }, [items]);

  // 下载合同源文件
  const handleExport = () => {
    const contractData = {}; // todo
    const contractName = contractData.name;
    contractDownload({ contractName, reviewId: params.id });
  };

  return (
    <div className="[&_.ant-pro-page-container-children-container]:pr-0">
      <PageContainer>
        {sdkConfig && (
          <WebOfficeProvider config={sdkConfig}>
            <div className="flex">
              <div id="wps-container" className="flex-1 border bg-white h-screen w-full"></div>
              <div className="flex shrink-0 w-[622px] px-2 h-screen overflow-hidden">
                <div className="mr-4 flex-1 h-full overflow-auto [&_.ant-tabs]:h-full [&_>.ant-tabs-content-holder]:!flex-1 [&_.ant-tabs-content-holder]:!overflow-auto">
                  {mode === 1 ? (
                    <Analysis bd={bd} lc={lc} md={md} wy={wy} />
                  ) : loading ? (
                    <div className="rounded-xl border bg-[#f7f8fa] shadow p-6 pt-0">
                      <Loading data={task} />
                    </div>
                  ) : (
                    <div className="rounded-xl border bg-[#f7f8fa] shadow p-6 pt-0">
                      <Tabs defaultActiveKey="1" items={tabsItem} />
                    </div>
                  )}
                </div>
                <div className="shrink-0 w-[60px] bg-[#f2f3f5] px-2 py-6 h-screen overflow-hidden">
                  <div
                    className={`cursor-pointer text-center text-xs hover:font-bold ${
                      mode === 0 && 'font-bold'
                    }`}
                    onClick={() => setMode(0)}
                  >
                    <div
                      className={`w-[40px] h-[40px] rounded-xl hover:bg-white flex justify-center items-center text-lg ${
                        mode === 0 ? 'bg-white text-[#009e59]' : 'bg-[#e5e6eb]'
                      }`}
                    >
                      <FireOutlined />
                    </div>
                    <div className="mt-1">审查</div>
                  </div>
                  <div
                    className={`mt-6 cursor-pointer text-center text-xs hover:font-bold ${
                      mode === 1 && 'font-bold'
                    }`}
                    onClick={() => setMode(1)}
                  >
                    <div
                      className={`w-[40px] h-[40px] rounded-xl hover:bg-white flex justify-center items-center text-lg ${
                        mode === 1 ? 'bg-white text-[#009e59]' : 'bg-[#e5e6eb]'
                      }`}
                    >
                      <FileDoneOutlined />
                    </div>
                    <div className="mt-1">解析</div>
                  </div>
                  <div className={`mt-6 cursor-pointer text-center text-xs hover:font-bold`}>
                    <div
                      className={`w-[40px] h-[40px] rounded-xl hover:bg-white flex justify-center items-center text-lg`}
                      onClick={handleExport}
                    >
                      <DownloadOutlined />
                    </div>
                    <div className="mt-1">导出</div>
                  </div>
                </div>
              </div>
            </div>
          </WebOfficeProvider>
        )}
      </PageContainer>
    </div>
  );
};

export default TableList;
