import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';
import PSBFilling from './components/PSBFilling';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'Public Security Bureau Filing Number',
          title: <PSBFilling />,
          href: 'https://beian.miit.gov.cn/',
          blankTarget: true,
        },
        {
          key: 'ICP',
          title: 'ICP备案/许可证号：蜀ICP备2025165504号-1',
          href: 'https://beian.miit.gov.cn/',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
