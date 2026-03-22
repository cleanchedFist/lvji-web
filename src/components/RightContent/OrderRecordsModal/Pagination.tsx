import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useState } from 'react';
type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNum: number) => void;
  isLoading: boolean;
};
const Pagination = ({ currentPage, totalPages, onPageChange, isLoading }: PaginationProps) => {
  const [jumpPage, setJumpPage] = useState('');

  const handleJump = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pageNum = parseInt(jumpPage);
    if (pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
      setJumpPage('');
    }
  };

  return (
    <div className="p-4 border-t border-gray-100 bg-white shrink-0">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* 页码导航 */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1 || isLoading}
            className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ChevronsLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1 || isLoading}
            className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex items-center gap-1 mx-2">
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              if (
                totalPages <= 5 ||
                pageNum === 1 ||
                pageNum === totalPages ||
                Math.abs(pageNum - currentPage) <= 1
              ) {
                return (
                  <button
                    type="button"
                    key={pageNum}
                    disabled={isLoading}
                    onClick={() => onPageChange(pageNum)}
                    className={`w-8 h-8 rounded-lg font-bold text-xs transition-all ${
                      currentPage === pageNum
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                        : 'text-gray-500 hover:bg-gray-100 disabled:opacity-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              } else if (
                (pageNum === currentPage - 2 && pageNum > 1) ||
                (pageNum === currentPage + 2 && pageNum < totalPages)
              ) {
                return (
                  <span key={pageNum} className="px-1 text-gray-300">
                    ...
                  </span>
                );
              }
              return null;
            })}
          </div>

          <button
            type="button"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages || isLoading}
            className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ChevronRight size={16} />
          </button>
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages || isLoading}
            className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ChevronsRight size={16} />
          </button>
        </div>

        {/* 快捷跳转 */}
        <div className="flex items-center gap-3">
          <form onSubmit={handleJump} className="flex items-center gap-2">
            <span className="text-gray-400 text-xs">跳至</span>
            <input
              disabled={isLoading}
              type="text"
              value={jumpPage}
              onChange={(e) => setJumpPage(e.target.value.replace(/\D/g, ''))}
              className="w-10 h-8 bg-gray-50 border border-gray-200 rounded-lg text-center font-mono text-xs focus:border-indigo-500 outline-none transition-all disabled:opacity-50"
            />
            <button
              disabled={isLoading || !jumpPage}
              type="submit"
              className="px-2 py-1 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-30"
            >
              确定
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Pagination;
