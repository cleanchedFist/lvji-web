import { contractDownload, reviewReportDownload } from '@/utils/contractHandle';
import { useWebOffice, WebOfficeHookResult } from '@/utils/wps/context';
import {
  DownloadOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  FireOutlined,
} from '@ant-design/icons';
import { useLocation, useParams } from '@umijs/max';
import React, { useState } from 'react';

type SiderMenuProps = {
  onChangeMode: (v: number) => void;
  fileId?: number;
};

const Btn = ({
  text,
  icon,
  onClick,
  active,
  className,
}: {
  text: string;
  className?: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={`flex flex-col items-center cursor-pointer text-center text-xs ${
        active && 'font-bold'
      } ${className || ''}`}
      onClick={onClick}
    >
      <div
        className={`w-[40px] h-[40px] rounded-xl flex justify-center items-center text-lg ${
          active ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        {icon}
      </div>
      <div className="mt-1 w-[54px]">{text}</div>
    </div>
  );
};

const SiderMenu = ({ onChangeMode, fileId }: SiderMenuProps) => {
  const location = useLocation();
  const params = useParams();
  const [mode, setMode] = useState(0);
  const { fileName }: WebOfficeHookResult = useWebOffice();

  const handleExport = () => {
    const contractData = location.state as { name: string };
    const contractName = fileName || contractData?.name || '合同文件';
    if (params.id && fileId) {
      contractDownload({ contractName, fileId, reviewId: params.id });
    }
  };

  const handleChangeMode = (v: number) => {
    setMode(v);
    onChangeMode(v);
  };

  const handleDownloadReport = () => {
    const contractData = location.state as { name: string };
    const contractName = fileName || contractData?.name || '合同文件';
    if (params.id && fileId) {
      reviewReportDownload({ contractName, fileId, reviewId: params.id });
    }
  };

  return (
    <div className="bg-white py-4 rounded-xl">
      <Btn
        text="审查"
        icon={<FireOutlined />}
        active={mode === 0}
        onClick={() => handleChangeMode(0)}
      />
      <Btn
        text="解析"
        className="mt-5"
        icon={<FileDoneOutlined />}
        active={mode === 1}
        onClick={() => handleChangeMode(1)}
      />
      <Btn
        text="导出合同"
        className="mt-5"
        icon={<DownloadOutlined />}
        active={false}
        onClick={handleExport}
      />
      <Btn
        text="下载报告"
        className="mt-5"
        icon={<FileTextOutlined />}
        active={false}
        onClick={handleDownloadReport}
      />
    </div>
  );
};
export default SiderMenu;
