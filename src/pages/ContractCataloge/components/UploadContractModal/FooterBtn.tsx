import { LoadingOutlined } from '@ant-design/icons';
type BtnProps = {
  disabled?: boolean;
  text: string;
  onClick: () => void;
};
export const CancelBtn = ({ text, disabled = false, onClick }: BtnProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`${
        disabled ? '' : 'hover:bg-gray-100 hover:border-gray-300'
      } px-6 py-2 mr-2 rounded-lg text-gray-400 hover:text-gray-900 transition  disabled:pointer-events-none disabled:cursor-not-allowed`}
    >
      {text}
    </button>
  );
};

export const OkBtn = ({
  loading,
  disabled = false,
  text,
  onClick,
}: BtnProps & { loading: boolean }) => {
  return (
    <button
      disabled={disabled}
      type="button"
      onClick={onClick}
      className={`${
        disabled ? 'hover:bg-gray-400 bg-indigo-600/50' : 'hover:bg-indigo-700 bg-indigo-600'
      } px-6 py-2 text-sm font-semibold rounded-lg text-white shadow-md transition duration-150 transform hover:scale-[1.01] disabled:pointer-events-none disabled:cursor-not-allowed`}
    >
      {loading && <LoadingOutlined className="mr-2" style={{ color: '#fff' }} />}
      {text}
    </button>
  );
};
