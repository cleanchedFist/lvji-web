import { AlertTriangle } from 'lucide-react';
const InfoIcon = () => {
  return (
    <div
      className={`flex-shrink-0 mr-4 h-12 w-12 flex items-center justify-center rounded-full text-orange-500 bg-orange-100`}
    >
      <AlertTriangle className="h-7 w-7" />
    </div>
  );
};

export const ModalButtonConfig = {
  cancelButtonProps: {
    className:
      'px-6 py-5 mt-6 mr-2 rounded-lg text-gray-400 hover:!text-gray-900 hover:!bg-gray-100 hover:!border-gray-300 transition',
  },
  okButtonProps: {
    className:
      'px-6 py-5 mt-6 text-sm font-semibold rounded-lg text-white shadow-md bg-indigo-600 hover:!bg-indigo-700 transition duration-150 transform hover:scale-[1.01]',
  },
};
export const deleteModalConfig = {
  icon: <InfoIcon />,
  ...ModalButtonConfig,
};
