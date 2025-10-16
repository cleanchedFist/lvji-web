import { DownOutlined, UpOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
interface ExpandableCellProps {
  text: string;
  maxLines?: number;
}

const ExpandableCell: React.FC<ExpandableCellProps> = ({ text, maxLines = 2 }) => {
  const [expanded, setExpanded] = React.useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const cellClass = expanded ? '' : `line-clamp-${maxLines}`;

  const buttonStyle = {
    color: '#1890ff',
    cursor: 'pointer',
    marginLeft: '5px',
    fontSize: '20px',
  };

  useEffect(() => {
    const element = ref.current;
    if (element) {
      const check = () => {
        const truncated =
          element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight;
        setIsTruncated(truncated);
      };

      check();
      return () => window.removeEventListener('resize', check);
    }
  }, [text]);
  return (
    <div className="flex justify-between">
      <div
        ref={ref}
        className={cellClass}
        style={maxLines > 1 && !expanded ? { WebkitLineClamp: maxLines } : {}}
      >
        {text}
      </div>
      {text && isTruncated && (
        <div onClick={toggleExpanded}>
          {expanded ? <UpOutlined style={buttonStyle} /> : <DownOutlined style={buttonStyle} />}
        </div>
      )}
    </div>
  );
};

export default ExpandableCell;
