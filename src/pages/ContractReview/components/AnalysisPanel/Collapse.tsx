import { CaretRightOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
type CollapseProps = {
  title: string;
  children: React.ReactNode;
  className: string;
};

const IconClassName =
  'text-[12px] cursor-pointer transition-transform rotate-[90deg] duration-300 mr-2';
const Collapse = ({ title, children, className }: CollapseProps) => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <div className={`flex ${className}`}>
        <CaretRightOutlined
          className={`${IconClassName} transform ${!open ? 'rotate-[0deg]' : 'rotate-0'}`}
          onClick={() => setOpen(!open)}
        />
        {title}
      </div>
      {open ? children : null}
    </div>
  );
};

export default Collapse;
