const AddLabel = ({ isAdd }: { isAdd: number }) => {
  if (isAdd === 1) {
    return (
      <span className="ml-2 px-2 py-0.5 shrink-0 rounded text-xs border font-medium bg-blue-100 text-blue-500 border-blue-200">
        新增
      </span>
    );
  }
  return null;
};
export default AddLabel;
