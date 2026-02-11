import Mask from '@/components/Mask';
import {
  contractDetail,
  getAssignedVersionList,
  getContractVersionList,
} from '@/services/ant-design-pro/api';
import { Contract_Type } from '@/utils/const';
import { List, message } from 'antd';
import { CircleX } from 'lucide-react';
import { forwardRef, useContext, useImperativeHandle, useState } from 'react';
import { CatalogePageContext } from '../../utils/context';
import ContractCard from '../ContractCard';
import VersionHeaderCard from './VersionHeaderCard';

export interface ContractVersionListRef {
  openModal: (data: API.CatalogeCardProps) => void;
}

const ContractVersionList = forwardRef<ContractVersionListRef>((props: any, ref) => {
  // 获取列表类型
  const { listType } = useContext(CatalogePageContext);

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
    if (listType === Contract_Type.ClientAssigned) {
      return getAssignedVersionList(id || dirInfo.id).then((res) => {
        setVersionList(res.data.records);
        contractDetail(`${res.data.records[0].id}`).then((res) => {
          setFocusVersionParseData(res.data);
        });
      });
    }
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

  // const step = useMemo(() => {
  //   return ['起草中', '审核中', '签订中', '履约中', '已完成'].indexOf(
  //     focusVersionParseData?.stage || '',
  //   );
  // }, [focusVersionParseData]);
  const handleItemClick = (id: number) => {
    const hide = message.loading('加载中');
    contractDetail(`${id}`).then((res) => {
      setFocusVersionParseData(res.data);
      hide();
    });
  };

  return (
    <Mask visible={modalVisible}>
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
        <div className="overflow-y-auto p-6 bg-slate-100 flex-1">
          <VersionHeaderCard data={focusVersionParseData}></VersionHeaderCard>
          <div className="space-y-8">
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
                      isLastOne={versionList.length === 1}
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
    </Mask>
  );
});
export default ContractVersionList;
