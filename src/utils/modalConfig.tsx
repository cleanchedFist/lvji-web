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
      'px-6 py-5 mt-6 mr-2 rounded-lg text-gray-400 hover:![color:rgb(17,24,39)] hover:![background-color:rgb(243,244,246)] hover:![border-color:rgb(209,213,219)] transition',
  },
  okButtonProps: {
    className:
      'px-6 py-5 mt-6 text-sm font-semibold rounded-lg text-white shadow-md bg-indigo-600 hover:![background-color:rgb(67,56,202)] transition duration-150 transform hover:scale-[1.01]',
  },
};
export const deleteModalConfig = {
  icon: <InfoIcon />,
  ...ModalButtonConfig,
};
