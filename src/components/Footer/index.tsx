import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';
import PSBFilling from './components/PSBFilling';

const Footer: React.FC = () => {
  const links = [];

  links.push({
    key: 'Public Security Bureau Filing Number',
    title: <PSBFilling code={PSB} />,
    href: 'https://beian.miit.gov.cn/',
    blankTarget: true,
  });

  links.push({
    key: 'ICP',
    title: `ICP备案/许可证号：${ICP}`,
    href: 'https://beian.miit.gov.cn/',
    blankTarget: true,
  });
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={links}
    />
  );
};

export default Footer;
