import AddRuleModal from '@/components/AddRuleModal';
import PageContainer from '@/components/PageContainer';
import RiskLevel from '@/components/RiskLevel';
import { removeRule, ruleList } from '@/services/ant-design-pro/api';
import createsourceMap from '@/utils/createsourceMap';
import { useParams, useRequest } from '@umijs/max';
import { message } from 'antd';
import { Plus, Search } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import ExpandableDescription from './components/ExpandableDescription';

const TableList: React.FC = () => {
  const params = useParams();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [keywords, setKeywords] = useState('');
  const [addRuleModalVisible, setAddRuleModalVisible] = useState(false);

  const { data: ruleInfo, refresh } = useRequest(ruleList, {
    defaultParams: [params.id!],
  });

  const handleRemove = async (id: string) => {
    const hide = message.loading('正在删除');
    if (!id) return true;
    try {
      await removeRule(id);
      refresh();
      hide();
      message.success('删除成功');
      return true;
    } catch (error) {
      hide();
      message.error('删除失败，请重试');
      return false;
    }
  };

  const rules = useMemo(() => {
    return ruleInfo?.rulesDetailRecords.filter((item) => item.name?.includes(keywords)) || [];
  }, [keywords, ruleInfo]);

  const showAddRuleModal = () => {
    setCurrentRow({} as API.RuleListItem);
    setAddRuleModalVisible(true);
  };

  const showAddRuleModalWithData = (data: API.RuleListItem) => {
    setCurrentRow(data);
    setAddRuleModalVisible(true);
  };

  const handleRuleAddConfirm = (success: boolean) => {
    if (success) {
      setAddRuleModalVisible(false);
      refresh();
    }
  };

  const handleRuleAddCancel = () => {
    setAddRuleModalVisible(false);
  };

  return (
    <PageContainer>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 border-b pb-2">审查规则</h1>
        </header>

        {/* 搜索与操作区域 - 采用模板 (Image 1) 的布局风格 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          {/* 搜索框 */}
          <div className="relative w-full md:w-96 mb-4 md:mb-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="输入规则名称或描述搜索..."
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-sm"
            />
          </div>

          {/* 新增规则按钮 (保留模板样式) */}
          <button
            type="button"
            onClick={showAddRuleModal}
            className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg shadow hover:bg-blue-700 transition duration-150 ease-in-out focus:outline-none"
          >
            <Plus className="w-4 h-4 mr-1" />
            <span>新增规则</span>
          </button>
        </div>

        {/* 表格区域 - 采用模板 (Image 1) 的背景和边框样式 */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5"
                >
                  规则名称
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5"
                >
                  规则描述
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5"
                >
                  规则来源
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12"
                >
                  风险等级
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12"
                >
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {rules.length > 0 ? (
                rules.map((rule) => (
                  <tr key={rule.id} className="hover:bg-gray-50 transition duration-100">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 align-top">
                      {rule.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 align-top max-w-lg">
                      <ExpandableDescription description={rule.description || ''} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 align-top">
                      {createsourceMap[rule.createdSource].label}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm align-top">
                      <RiskLevel type={rule.riskLevel} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium align-top">
                      {/* 操作区域 - 模仿模板中的按钮/链接样式 */}
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => showAddRuleModalWithData(rule)}
                          className="text-indigo-600 hover:text-indigo-700 font-medium transition duration-150 ease-in-out flex items-center"
                        >
                          修改
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemove(`${rule.id}`)}
                          className="ml-2 text-red-500 hover:text-red-700 font-medium transition duration-150 ease-in-out flex items-center"
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500 text-base">
                    未找到匹配的规则。
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <AddRuleModal
          data={currentRow}
          tableId={params.id || ''}
          onSubmit={handleRuleAddConfirm}
          onCancel={handleRuleAddCancel}
          visible={addRuleModalVisible}
        ></AddRuleModal>
      </div>
    </PageContainer>
  );
};

export default TableList;
