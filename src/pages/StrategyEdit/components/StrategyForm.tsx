import { history } from '@umijs/max';
import { BookOpen, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import RuleConfigurationModal from './RuleConfigurationModal';
import SelectedRuleList, { rulesDetailItem } from './SelectedRuleList';

export type FormData = {
  name?: string;
  description?: string;
  rulesDetailRecords?: rulesDetailItem[];
};

export type SubmitFormData = {
  id?: string;
  name?: string;
  description?: string;
  smallRuleIds?: number[];
};

type StrategyFormProps = {
  data: FormData;
  onCancel: () => void;
  onConfirm: (data: SubmitFormData) => void;
};

const jumpToRuleConfig = () => {
  history.push('/clm/config?tab=1');
};

const StrategyForm = ({ data = {}, onCancel, onConfirm }: StrategyFormProps) => {
  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.description);
  const [rulesDetailRecords, setRulesDetailRecords] = useState(data.rulesDetailRecords);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setName(data.name);
    setDescription(data.description);
    setRulesDetailRecords(data.rulesDetailRecords);
  }, [data]);

  const onModalCancel = () => {
    setModalOpen(false);
  };
  const onModalConfirm = (data: rulesDetailItem[]) => {
    setRulesDetailRecords(data);
    setModalOpen(false);
  };

  const handleConfirm = () => {
    onConfirm({ name, description, smallRuleIds: rulesDetailRecords?.map((i) => i.id) });
  };
  return (
    <>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">审核策略名称</label>
          <input
            type="text"
            defaultValue={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="请输入策略名称"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">审核策略描述</label>
          <textarea
            rows={4}
            defaultValue={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder="请输入策略描述"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
          ></textarea>
        </div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-bold text-slate-700">审查规则</label>
          </div>
          <div className="border border-slate-200 rounded-xl overflow-hidden mb-4  max-h-[30vh] overflow-y-scroll">
            <SelectedRuleList data={rulesDetailRecords || []} />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors"
            >
              <Plus className="w-[16px] h-16[px]" />
              添加规则
            </button>
            <button
              type="button"
              onClick={jumpToRuleConfig}
              className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors"
            >
              <BookOpen className="w-[16px] h-16[px]" />
              管理规则库
            </button>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-12 pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium"
          >
            取消
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-md shadow-indigo-200"
          >
            确认
          </button>
        </div>
      </div>
      <RuleConfigurationModal
        visible={modalOpen}
        selected={rulesDetailRecords || []}
        onCancel={onModalCancel}
        onConfirm={onModalConfirm}
      ></RuleConfigurationModal>
    </>
  );
};

export default StrategyForm;
