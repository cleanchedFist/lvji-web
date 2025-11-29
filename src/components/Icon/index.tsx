import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const FilesSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-files text-blue-500 text-blue-500"
      aria-hidden="true"
    >
      <path d="M20 7h-3a2 2 0 0 1-2-2V2"></path>
      <path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z"></path>
      <path d="M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8"></path>
    </svg>
  );
};
const Files = function (props: Partial<CustomIconComponentProps>) {
  return <Icon component={FilesSvg} {...props} />;
};

const unDoFileSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-file-clock text-amber-500 text-amber-500"
      aria-hidden="true"
    >
      <path d="M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"></path>
      <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
      <circle cx="8" cy="16" r="6"></circle>
      <path d="M9.5 17.5 8 16.25V14"></path>
    </svg>
  );
};

const UnDoFile = function (props: Partial<CustomIconComponentProps>) {
  return <Icon component={unDoFileSvg} {...props} />;
};
const warnFileSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-file-warning text-rose-500 text-rose-500"
      aria-hidden="true"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
      <path d="M12 9v4"></path>
      <path d="M12 17h.01"></path>
    </svg>
  );
};

const WarnFile = function (props: Partial<CustomIconComponentProps>) {
  return <Icon component={warnFileSvg} {...props} />;
};

const DownloadSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-download"
    aria-hidden="true"
  >
    <path d="M12 15V3"></path>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <path d="m7 10 5 5 5-5"></path>
  </svg>
);
const Download = function (props: Partial<CustomIconComponentProps>) {
  return <Icon component={DownloadSvg} {...props} />;
};

const TrashSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-trash2 lucide-trash-2"
    aria-hidden="true"
  >
    <path d="M3 6h18"></path>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
    <line x1="10" x2="10" y1="11" y2="17"></line>
    <line x1="14" x2="14" y1="11" y2="17"></line>
  </svg>
);
const Trash = function (props: Partial<CustomIconComponentProps>) {
  return <Icon component={TrashSvg} {...props} />;
};

const FileTextSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-file-text"
    aria-hidden="true"
  >
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
    <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
    <path d="M10 9H8"></path>
    <path d="M16 13H8"></path>
    <path d="M16 17H8"></path>
  </svg>
);
const FileText = function (props: Partial<CustomIconComponentProps>) {
  return <Icon component={FileTextSvg} {...props} />;
};

const GuardSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-shield-alert"
    aria-hidden="true"
  >
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
    <path d="M12 8v4"></path>
    <path d="M12 16h.01"></path>
  </svg>
);
const Guard = function (props: Partial<CustomIconComponentProps>) {
  return <Icon component={GuardSvg} {...props} />;
};

const UploadIcon = (props: { [key: string]: any }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 12h-6l-2 3h-4l-2-3H2" />
    <path d="M5.4 5.1L5 5.5v13.9l.4.4h13.2l.4-.4V5.5l-.4-.4H5.4z" />
    <path d="M12 9v6" />
  </svg>
);

const BulbIcon = (props: { [key: string]: any }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10 2a6 6 0 00-6 6c0 1.95.84 3.73 2.19 5.06l-.76 1.15a.5.5 0 00.41.83h7.32a.5.5 0 00.41-.83l-.76-1.15A6 6 0 0016 8a6 6 0 00-6-6zm0 14a2 2 0 100-4 2 2 0 000 4z" />
  </svg>
);
export { BulbIcon, Download, Files, FileText, Guard, Trash, UnDoFile, UploadIcon, WarnFile };
