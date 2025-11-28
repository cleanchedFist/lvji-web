import { contractDetail, getContractVersionList } from '@/services/ant-design-pro/api';
import { List, message } from 'antd';
import { CircleX, Clock4, FileText } from 'lucide-react';
import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import formatTime from '../utils/formatTime';
import ContractCard from './ContractCard';
import ContractStep from './ContractStep';

export interface ContractVersionListRef {
  openModal: (data: API.CatalogeCardProps) => void;
}

const ContractVersionList = forwardRef<ContractVersionListRef>((props: any, ref) => {
  const [focusVersionParseData, setFocusVersionParseData] = useState<API.ContractListItem>(
    {} as API.ContractListItem,
  );
  const [versionList, setVersionList] = useState<API.ContractVersionItem[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [dirInfo, setDirInfo] = useState<API.CatalogeCardProps>({} as API.CatalogeCardProps);

  const hideModal = () => {
    setModalVisible(false);
  };

  function updateList(id?: number) {
    return getContractVersionList(id || dirInfo.id).then((res) => {
      setVersionList(res.data.records);
      contractDetail(`${res.data.records[0].id}`).then((res) => {
        setFocusVersionParseData(res.data);
      });
    });
  }
  useImperativeHandle(ref, () => ({
    openModal(data: API.CatalogeCardProps) {
      updateList(data.id).then(() => {
        setModalVisible(true);
      });
      setDirInfo(data);
    },
  }));

  const step = useMemo(() => {
    return ['起草中', '审核中', '签订中', '履约中', '已完成'].indexOf(
      focusVersionParseData?.stage || '',
    );
  }, [focusVersionParseData]);

  const handleItemClick = (id: number) => {
    const hide = message.loading('加载中');
    contractDetail(`${id}`).then((res) => {
      setFocusVersionParseData(res.data);
      hide();
    });
  };

  return (
    <div
      className={`${
        modalVisible ? 'fixed' : 'hidden'
      } inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4`}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 shrink-0">
          <h3 className="text-lg font-bold text-slate-800">合同详情</h3>
          <button
            type="button"
            onClick={hideModal}
            className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
          >
            <CircleX />
          </button>
        </div>
        <div className="overflow-y-auto p-6 bg-slate-50 flex-1">
          <div className="space-y-8">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  {focusVersionParseData.name}
                </h2>
                <div className="flex gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <FileText className="w-[14px] h-[14px]" />
                    合同类型: {focusVersionParseData.type}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock4 className="w-[14px] h-[14px]" />
                    创建日期: {formatTime(focusVersionParseData.createTimeStamp)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
                  {focusVersionParseData.stage}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 bg-slate-50 p-6 rounded-xl border border-slate-100">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                  合同主体 - 甲方
                </span>
                <div className="font-semibold text-slate-800 text-lg">
                  {focusVersionParseData.parta || '-'}
                </div>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                  合同主体 - 乙方
                </span>
                <div className="font-semibold text-slate-800 text-lg">
                  {focusVersionParseData.partb || '-'}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 mb-6">合同阶段</h3>
              <ContractStep step={step} />
            </div>
            <div>
              <div className="flex items-center gap-4 border-b border-slate-200 mb-4">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-indigo-600 border-b-2 border-indigo-600"
                >
                  版本历史
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700"
                >
                  版本对比
                </button>
              </div>
              <List style={{ maxHeight: '400px', overflow: 'scroll' }}>
                {versionList?.map((i) => (
                  <div key={i.id} onClick={() => handleItemClick(i.id)}>
                    <ContractCard
                      isCurrent={+focusVersionParseData.id === i.id}
                      contract={i}
                      updateList={updateList}
                    ></ContractCard>
                  </div>
                ))}
              </List>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default ContractVersionList;
