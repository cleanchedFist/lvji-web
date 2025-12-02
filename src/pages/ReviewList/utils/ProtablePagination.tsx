const Pagination = (props: { current: any; type: string; originalElement: React.ReactNode }) => {
  const { current, type, originalElement } = props;
  if (type === 'prev') {
    return (
      <button
        type="button"
        className="px-3 py-1 mx-1 text-sm rounded-md transition duration-150 bg-gray-100 hover:bg-gray-200"
      >
        上一页
      </button>
    );
  }
  if (type === 'next') {
    return (
      <button
        type="button"
        className="px-3 py-1 mx-1 text-sm rounded-md transition duration-150 bg-gray-100 hover:bg-gray-200"
      >
        下一页
      </button>
    );
  }
  if (type === 'page') {
    return (
      <button
        type="button"
        className="px-3 py-1 mx-1 text-sm rounded-md transition duration-150 font-semibold bg-white hover:bg-blue-50 text-gray-700"
      >
        {current}
      </button>
    );
  }
  return originalElement;
};

export default Pagination;
