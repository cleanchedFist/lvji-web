import AllTab from '@/components/contract/AllTab';
import Analysis from '@/components/contract/Analysis';
import { contractView } from '@/services/ant-design-pro/api';
import WebOfficeProvider from '@/store/wpsProvider';
import { contractDownload } from '@/utils/contractHandle';
import { DownloadOutlined, FileDoneOutlined, FireOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useLocation, useParams, useRequest } from '@umijs/max';
import { Tabs } from 'antd';
import React, { useMemo, useState } from 'react';
import Loading from './components/Loading';

// const sdkConfig = {
//   mode: 'sample',
//   officeType: 'w',
//   appId: 'SX20250707WNEWPR',
//   fileId: '326',
//   token: '1',
//   mount: '#wps-container',
// };

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

const ContractView: React.FC = () => {
  const [loading] = useState(false);
  const location = useLocation();
  const params = useParams();

  const { data } = useRequest(contractView, {
    defaultParams: [params.id!],
  });
  const sdkConfig = useMemo(() => {
    const token = window.localStorage.getItem('token');
    if (!data?.fileId || !token) {
      return null;
    }
    return {
      mode: 'sample',
      officeType: 'w',
      appId: 'AK20250915UQIAZX',
      fileId: data?.fileId,
      token: token,
      mount: '#wps-container',
    };
  }, [data]);
  const [mode, setMode] = useState(0);

  //   const [items, setItems] = useState([]);
  const items = useMemo(() => {
    return data?.reviewChunkRespDTOList ?? [];
  }, [data]);

  // 合同标的
  const bd = useMemo(() => {
    try {
      return JSON.parse(data?.reviewResultNewRespDTO.objectRule).mdContent;
    } catch (error) {
      return '';
    }
  }, [data]);

  // 目的审查
  const md = useMemo(() => {
    try {
      return JSON.parse(data?.reviewResultNewRespDTO.purposeRule).objectives;
    } catch (error) {
      return [];
    }
  }, [data]);

  // 违约责任审查
  const wy = useMemo(() => {
    try {
      return JSON.parse(data?.reviewResultNewRespDTO.violateRule).contractParties;
    } catch (error) {
      return [];
    }
  }, [data]);

  // 交易流程
  const lc = useMemo(() => {
    try {
      return JSON.parse(data?.reviewResultNewRespDTO.dealNodesRule).dealNodes;
    } catch (error) {
      return [];
    }
  }, [data]);

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
    const contractData = location.state;
    const contractName = contractData.name;
    contractDownload({ contractName, reviewId: params.id });
  };

  return (
    <div className="[&_.ant-pro-page-container-children-container]:pr-0">
      <PageContainer>
        {sdkConfig && (
          <WebOfficeProvider config={sdkConfig}>
            <div className="flex">
              <div id="wps-container" className="flex-1 border bg-white h-screen w-full">
                {/* <div
                  id="docx"
                  className="[&_>.docx-wrapper]:p-0 [&_>.docx-wrapper]:bg-transparent h-screen overflow-auto"
              ></div> */}
                {/* <iframe
                src={`https://view.officeapps.live.com/op/view.aspx?src=${data?.filePath}`}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="auto"
              ></iframe> */}
              </div>
              <div className="flex shrink-0 w-[622px] px-2 h-screen overflow-hidden">
                <div className="mr-4 flex-1 h-full overflow-auto [&_.ant-tabs]:h-full [&_>.ant-tabs-content-holder]:!flex-1 [&_.ant-tabs-content-holder]:!overflow-auto">
                  {mode === 1 ? (
                    <Analysis bd={bd} lc={lc} md={md} wy={wy} />
                  ) : loading ? (
                    <Loading />
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

export default ContractView;
