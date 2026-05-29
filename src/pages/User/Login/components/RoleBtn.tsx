type RoleBtnProps = {
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
};
const RoleBtn = ({ onClick, isActive, children }: RoleBtnProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-6 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-0 active:outline-none active:ring-0 ${
        isActive
          ? 'text-indigo-600 border-b-2 border-indigo-600'
          : 'text-gray-400 hover:text-gray-600'
      }`}
    >
      {children}
    </button>
  );
};
export default RoleBtn;
