import { getAssignedDirList, getDirList } from '@/services/ant-design-pro/api';
import { Contract_Type } from '@/utils/const';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { CatalogePageContext } from '../utils/context';
import CatalogeTab from './/CatalogeTab';
import CatalogeCard from './CatalogeCard';
import Pagination from './CatalogeListPaging';
const PAGE_SIZE = 10;

const CatalogeList = forwardRef((props: any, ref) => {
  const { initialState } = useModel('@@initialState');
  const { updateListType } = useContext(CatalogePageContext);
  // 搜索和分页状态
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [tabId, setTabId] = useState(0);

  // 数据状态
  const [contracts, setContracts] = useState<API.CatalogeCardProps[]>([]);
  const [total, setTotal] = useState(0);

  const listType = useMemo(() => {
    // 律师合同列表
    // 律师处理客户合同列表：处理进度
    // 客户合同列表：查看进度：下载审查结果
    if (initialState?.isUserRole) {
      return Contract_Type.ClientUpload;
    } else if (tabId === 0) {
      return Contract_Type.LawyerUpload;
    } else {
      return Contract_Type.ClientAssigned;
    }
  }, [tabId]);

  useEffect(() => {
    updateListType(listType);
  }, [listType]);

  // 核心数据获取逻辑
  const loadData = async (key: string, page: number) => {
    setLoading(true);
    try {
      const params = {
        size: PAGE_SIZE,
        current: page,
        word: key,
      };

      const dataFn = tabId === 1 ? getAssignedDirList : getDirList;
      const { data: result } = await dataFn(params);
      setContracts(result.records);
      setTotal(result.total);
      setCurrentPage(page);
    } catch (error) {
      console.error('Failed to fetch contracts:', error);
      setContracts([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    reload() {
      loadData('', 1);
    },
  }));

  // 首次加载/关键词/页码变化时触发
  useEffect(() => {
    loadData('', 1);
  }, [tabId]);

  // 处理搜索提交
  const handleSearch = () => {
    loadData(searchTerm, 1);
  };

  // 处理重置
  const handleReset = () => {
    loadData('', 1).then(() => {
      setSearchTerm('');
    });
  };

  // 处理分页
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= Math.ceil(total / PAGE_SIZE)) {
      loadData(searchTerm, newPage);
      setCurrentPage(newPage);
    }
  };

  const handleTabChange = (id: number) => {
    setSearchTerm('');
    setTabId(id);
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 hidden sm:block">合同列表</h1>
      <div className="bg-white rounded-2xl">
        {!initialState?.isUserRole && <CatalogeTab tabId={tabId} onChange={handleTabChange} />}
        <div className="p-3 pt-0">
          {/* 搜索/筛选/重置区域 */}
          <div className="bg-white py-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              {/* 搜索输入框 */}
              <div className="relative flex-grow">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleSearch();
                  }}
                  placeholder="搜索合同名称..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm text-base"
                />
                <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>

              {/* 搜索按钮 */}
              <button
                type="button"
                onClick={handleSearch}
                disabled={loading}
                className="flex items-center justify-center space-x-1 px-6 py-3 text-sm font-medium text-white bg-[#4f46e5] rounded-lg hover:bg-blue-700 transition duration-150 shadow-md disabled:opacity-50"
              >
                {loading ? '查询中...' : '查询'}
              </button>

              {/* 重置按钮 */}
              <button
                type="button"
                onClick={handleReset}
                disabled={loading}
                className="flex items-center justify-center space-x-1 px-4 py-3 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-150 disabled:opacity-50"
              >
                <ReloadOutlined className="w-4 h-4" />
                <span>重置</span>
              </button>
            </div>
          </div>

          {/* 列表主体 */}
          <div className="grid grid-cols-1 gap-6">
            {loading ? (
              <div className="text-center p-12 text-gray-500">
                <div className="animate-spin inline-block w-8 h-8 border-4 border-t-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
                <p>数据加载中...</p>
              </div>
            ) : contracts.length > 0 ? (
              contracts.map((contract) => <CatalogeCard key={contract.id} contract={contract} />)
            ) : (
              <div className="text-center p-12 text-gray-500 bg-white rounded-lg shadow-md">
                <p className="text-lg">未找到相关合同。</p>
                <p className="text-sm mt-2">请尝试更改搜索关键词或重置筛选条件。</p>
              </div>
            )}
          </div>

          {/* 分页组件 */}
          {total > 0 && (
            <Pagination
              total={total}
              size={PAGE_SIZE}
              handlePageChange={handlePageChange}
              loading={loading}
              currentPage={currentPage}
            />
          )}
        </div>
      </div>
    </>
  );
});

export default CatalogeList;
