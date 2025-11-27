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

export { Files, UnDoFile, WarnFile };
