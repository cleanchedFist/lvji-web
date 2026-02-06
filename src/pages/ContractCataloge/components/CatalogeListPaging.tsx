type PaginationProps = {
  total: number;
  currentPage: number;
  loading: boolean;
  size: number;
  handlePageChange: (page: number) => void;
};
// 分页组件
const Pagination = (props: PaginationProps) => {
  const { total, currentPage, loading, size, handlePageChange } = props;
  const totalPages = Math.ceil(total / size);
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

export default Pagination;
