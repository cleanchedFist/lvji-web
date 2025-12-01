import AddRuleModal from '@/components/AddRuleModal';
import AddRuleSetModal from '@/components/AddRuleSetModal';
import Checkbox from '@/components/Checkbox';
import Mask from '@/components/Mask';
import RiskLevel, { RiskLevelType } from '@/components/RiskLevel';
import { ruleList, scenarioList } from '@/services/ant-design-pro/api';
import createsourceMap from '@/utils/createsourceMap';
import { useRequest } from '@umijs/max';
import { debounce } from 'lodash';
import { CircleX } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { rulesDetailItem } from './SelectedRuleList';

type RuleConfigurationModalProps = {
  visible: boolean;
  selected: rulesDetailItem[];
  onCancel: () => void;
  onConfirm: (data: rulesDetailItem[]) => void;
};

const RuleConfigurationModal = ({
  visible,
  selected,
  onCancel,
  onConfirm,
}: RuleConfigurationModalProps) => {
  const { run: getRuleSetList, refresh: refreshRuleSet } = useRequest(scenarioList, {
    manual: true,
  });
  const { run: getRules, refresh: refreshRule } = useRequest(ruleList, { manual: true });
  const [ruleSet, setRuleSet] = useState<API.ScenarioItem[]>([] as API.ScenarioItem[]);
  const [activeRuleSet, setActiveRuleSet] = useState<API.ScenarioItem>({} as API.ScenarioItem);
  const [keywords, setKeywords] = useState('');
  const [rules, setRules] = useState<API.RuleListItem[]>([]);
  const [internalSelectedDatas, setInternalSelectedDatas] = useState<rulesDetailItem[]>([]);
  const [allCheckedRuleSet, setAllCheckedRuleSet] = useState<string[]>([]);
  const [addRuleSetModalVisible, setAddRuleSetModalVisible] = useState(false);
  const [addRuleModalVisible, setAddRuleModalVisible] = useState(false);
  const internalSelectedIds = useMemo(
    () => internalSelectedDatas?.map((i) => i.id),
    [internalSelectedDatas],
  );

  useEffect(() => {
    setInternalSelectedDatas(selected);
  }, [selected]);

  // 初始化
  useEffect(() => {
    getRuleSetList().then((data) => {
      if (data?.records) {
        setRuleSet(data.records);
        setActiveRuleSet(data.records[0]);
      }
    });
  }, []);

  useEffect(() => {
    if (activeRuleSet.id) {
      getRules(activeRuleSet.id).then((data) => {
        if (data?.rulesDetailRecords) {
          setRules(data.rulesDetailRecords);
        }
      });
    }
  }, [activeRuleSet]);

  const filterRules = useMemo(() => {
    return rules.filter((item) => item.name?.includes(keywords));
  }, [rules, keywords]);

  const handleKeywordInput = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setKeywords(e.target.value);
    }, 300),
    [],
  );

  const changeRuleSelected = (data: rulesDetailItem, checked: boolean) => {
    if (checked) {
      const _data = [...internalSelectedDatas, data];
      setInternalSelectedDatas(_data);
    } else {
      const _data = internalSelectedDatas.filter((i) => i.id !== data.id);
      setInternalSelectedDatas(_data);
    }
  };

  const handleRuleSelectAll = (checked: boolean) => {
    const allIds = rules.map((i) => i.id);
    const inOtherSet = internalSelectedDatas.filter((i) => !allIds.includes(i.id));
    if (checked) {
      const _data = [...inOtherSet, ...(rules as rulesDetailItem[])];
      setInternalSelectedDatas(_data);
      const rulesets = [...allCheckedRuleSet, activeRuleSet.id];
      setAllCheckedRuleSet(rulesets);
    } else {
      setInternalSelectedDatas(inOtherSet);
      const rulesets = allCheckedRuleSet.filter((i) => i !== activeRuleSet.id);
      setAllCheckedRuleSet(rulesets);
    }
  };

  // start== 新增规则集操作modal
  const showAddRuleSetModal = () => {
    setAddRuleSetModalVisible(true);
  };

  const handleRuleSetAddConfirm = (success: boolean) => {
    if (success) {
      setAddRuleSetModalVisible(false);
      refreshRuleSet().then((data) => {
        if (data?.records) {
          setRuleSet(data.records);
        }
      });
    }
  };

  const handleRuleSetAddCancel = () => {
    setAddRuleSetModalVisible(false);
  };

  // end== 新增规则集操作modal

  // start == 新增规则操作modal
  const showAddRuleModal = () => {
    setAddRuleModalVisible(true);
  };

  const handleRuleAddConfirm = (success: boolean) => {
    if (success) {
      setAddRuleModalVisible(false);
      refreshRule().then((data) => {
        if (data?.rulesDetailRecords) {
          setRules(data.rulesDetailRecords);
        }
      });
    }
  };

  const handleRuleAddCancel = () => {
    setAddRuleModalVisible(false);
  };
  // end == 新增规则操作modal

  return (
    <>
      <Mask visible={visible}>
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
          <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 shrink-0">
            <h3 className="text-lg font-bold text-slate-800">从规则库选择</h3>
            <button
              type="button"
              onClick={onCancel}
              className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
            >
              <CircleX className="w-[24px] h-[24px]" />
            </button>
          </div>
          <div className="overflow-y-hidden p-6 bg-slate-50 flex">
            <div className="flex max-h-full items-stretch min-h-0 flex-1 gap-6 overflow-y-hidden">
              {/* 左侧规则集 */}
              <div className="w-64 border-r border-slate-100 pr-2 flex flex-col overflow-y-hidden">
                <div className="flex justify-between  mb-4">
                  <h4 className="font-bold text-slate-800 px-2">规则库</h4>
                  <span
                    onClick={showAddRuleSetModal}
                    className="flex items-end text-indigo-600 hover:text-indigo-700 font-medium text-xs hover:underline cursor-pointer"
                  >
                    新增规则集
                  </span>
                </div>
                <div className="space-y-1 flex-1 overflow-y-auto">
                  {ruleSet?.map((i) => (
                    <div
                      key={i.id}
                      onClick={() => setActiveRuleSet(i)}
                      className={`${
                        activeRuleSet.id === i.id
                          ? 'bg-indigo-50 text-indigo-600 font-medium'
                          : 'text-slate-600 hover:bg-slate-50'
                      } px-3 py-2 rounded-lg text-sm cursor-pointer`}
                    >
                      {i.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* 右侧规则 */}
              <div className="flex-1 flex flex-col">
                <div className="flex gap-3 mb-4 mt-1">
                  <input
                    type="text"
                    onChange={handleKeywordInput}
                    placeholder="请输入规则名称进行搜索"
                    className="w-[50%] bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => onConfirm(internalSelectedDatas)}
                    className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 text-sm hover:bg-slate-50"
                  >
                    确认 ({internalSelectedDatas.length})
                  </button>

                  <span
                    onClick={showAddRuleModal}
                    className={`${
                      activeRuleSet.createdSource === 0 ? 'hidden' : ''
                    } flex ml-auto items-end text-indigo-600 hover:text-indigo-700 font-medium text-xs hover:underline cursor-pointer`}
                  >
                    新增规则
                  </span>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0 z-10">
                      <tr>
                        <th className="px-4 py-3 w-10">
                          <Checkbox
                            checked={allCheckedRuleSet.includes(activeRuleSet.id)}
                            onChange={(e) => handleRuleSelectAll(e.target.checked)}
                          />
                        </th>
                        <th className="px-4 py-3">规则名称</th>
                        <th className="px-4 py-3">规则描述</th>
                        <th className="px-4 py-3">规则来源</th>
                        <th className="px-4 py-3">风险等级</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 pb-6">
                      {filterRules.map((i) => (
                        <tr key={i.id} className="hover:bg-slate-50">
                          <td className="px-4 py-3">
                            <Checkbox
                              onChange={(e) =>
                                changeRuleSelected(i as rulesDetailItem, e.target.checked)
                              }
                              checked={internalSelectedIds?.includes(i.id)}
                            />
                          </td>
                          <td className="px-4 py-3 font-medium text-slate-700">{i.name}</td>
                          <td className="px-4 py-3 text-slate-400 truncate max-w-xs">
                            {i.description}
                          </td>
                          <td className="px-4 py-3 text-slate-500">
                            {createsourceMap[i.createdSource].label}
                          </td>
                          <td className="px-4 py-3">
                            <RiskLevel type={+i.riskLevel as RiskLevelType} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Mask>
      <AddRuleSetModal
        onSubmit={handleRuleSetAddConfirm}
        onCancel={handleRuleSetAddCancel}
        visible={addRuleSetModalVisible}
      ></AddRuleSetModal>
      <AddRuleModal
        tableId={activeRuleSet.id}
        onSubmit={handleRuleAddConfirm}
        onCancel={handleRuleAddCancel}
        visible={addRuleModalVisible}
      ></AddRuleModal>
    </>
  );
};
export default RuleConfigurationModal;
