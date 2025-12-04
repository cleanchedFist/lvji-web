import { ProfileOutlined } from '@ant-design/icons';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
export type ReviewBasisItem = {
  tag: string; // 依据的标签/分类
  title: string; // 依据的标题
  desc: string; // 依据的详细描述
};

const EvidenceTitleLabel = ({ text, className }: { text: string; className?: string }) => {
  return (
    <div
      className={`inline-flex items-center gap-1 border px-2 py-1 rounded-2xl ${className || ''}`}
    >
      <ProfileOutlined className="text-indigo-600" />
      <span>{text}</span>
    </div>
  );
};

const OpenRender = ({ data }: { data: ReviewBasisItem[] }) => {
  return data.map((i, k) => (
    <div
      key={k}
      className="text-sm mt-2 leading-relaxed text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-200"
    >
      <EvidenceTitleLabel text={i.tag}></EvidenceTitleLabel>
      <h3 className="font-bold my-2 text-black">{i.title}</h3>
      <div className="">{i.desc}</div>
    </div>
  ));
};

const CloseRender = ({ data }: { data: ReviewBasisItem[] }) => {
  return (
    <div className="mt-2 flex">
      {data.map((i, k) => (
        <EvidenceTitleLabel
          key={k}
          className={k !== 0 ? 'ml-2' : ''}
          text={i.tag}
        ></EvidenceTitleLabel>
      ))}
    </div>
  );
};

const ReviewBasisCard = ({ data }: { data: ReviewBasisItem[] }) => {
  // 默认展开，保持与第二张图中的内容一致性
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full mt-2 text-left flex justify-between items-center transition-colors duration-150"
      >
        <div className="flex items-center text-sm font-bold text-gray-800">
          审查依据
          <ChevronRight
            className={`w-4 h-4 ml-2 text-gray-500 transition-transform duration-300 ${
              isOpen ? 'rotate-90' : ''
            }`}
          />
        </div>
      </button>
      <div className=" transition-all duration-300 ease-in-out">
        {isOpen && <OpenRender data={data} />}
        {!isOpen && <CloseRender data={data} />}
      </div>
    </div>
  );
};

export default ReviewBasisCard;
