import { getDirList } from '@/services/ant-design-pro/api';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { ContractVersionsContext } from '../utils/context';
import CatalogeTab from './/CatalogeTab';
import CatalogeCard from './CatalogeCard';
const PAGE_SIZE = 10;

const CatalogeList = forwardRef((props: any, ref) => {
  // 搜索和分页状态
  const [searchTerm, setSearchTerm] = useState('');
  const [keyword, setKeyword] = useState(''); // 实际搜索关键词
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [tabId, setTabId] = useState(0);
  const contractVersionsContext = useContext(ContractVersionsContext);

  // 数据状态
  const [contracts, setContracts] = useState<API.CatalogeCardProps[]>([]);
  const [total, setTotal] = useState(0);

  // 核心数据获取逻辑
  const loadData = useMemo(() => {
    return async (key: string, page: number) => {
      setLoading(true);
      try {
        const params = {
          size: PAGE_SIZE,
          current: page,
          word: key,
        };
        const { data: result } = await getDirList(params);
        setContracts(result.records);
        setTotal(result.total);
      } catch (error) {
        console.error('Failed to fetch contracts:', error);
        setContracts([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };
  }, []);

  useImperativeHandle(ref, () => ({
    reload() {
      loadData('', 1);
    },
  }));

  // 首次加载/关键词/页码变化时触发
  useEffect(() => {
    loadData(keyword, currentPage);
  }, [keyword, currentPage, loadData]);

  // 处理搜索提交
  const handleSearch = () => {
    // 当关键词变化时，重置页码到第一页
    if (searchTerm !== keyword) {
      setKeyword(searchTerm);
      setCurrentPage(1);
    } else {
      // 重新搜索当前关键词（比如用户点了一次搜索后又点了一次）
      loadData(keyword, currentPage);
    }
  };

  // 处理重置
  const handleReset = () => {
    setSearchTerm('');
    setKeyword('');
    setCurrentPage(1);
    // loadData will be triggered by keyword/currentPage useEffect
  };

  // 处理分页
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= Math.ceil(total / PAGE_SIZE)) {
      setCurrentPage(newPage);
    }
  };

  // 分页组件
  const Pagination = () => {
    const totalPages = Math.ceil(total / PAGE_SIZE);
    const pages = [];
    const maxPagesToShow = 5; // 最多显示的页码数

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    const commonClass = 'px-3 py-1 mx-1 text-sm rounded-md transition duration-150';

    return (
      <div className="flex justify-center items-center mt-8 space-x-2 text-gray-700">
        <button
          type="button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className={`${commonClass} ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white hover:bg-gray-100'
          }`}
        >
          上一页
        </button>

        {startPage > 1 && <span className="mx-1">...</span>}

        {pages.map((page) => (
          <button
            type="button"
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={loading}
            className={`${commonClass} font-semibold ${
              page === currentPage
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white hover:bg-blue-50 text-gray-700'
            }`}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && <span className="mx-1">...</span>}

        <button
          type="button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
          className={`${commonClass} ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white hover:bg-gray-100'
          }`}
        >
          下一页
        </button>
        {/* <span className="text-sm ml-4 text-gray-500">共 {total} 条</span> */}
      </div>
    );
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 hidden sm:block">合同列表</h1>
      <div className="bg-white rounded-2xl">
        {!contractVersionsContext.isUser && (
          <CatalogeTab tabId={tabId} onChange={(id) => setTabId(id)} />
        )}
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
          {total > 0 && <Pagination />}
        </div>
      </div>
    </>
  );
});

export default CatalogeList;
