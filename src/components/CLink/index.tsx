import { Link } from '@umijs/max';
import React from 'react';

type CLinkProps = React.ComponentProps<typeof Link>;

const CLink: React.FC<CLinkProps> = ({ children, className = '', ...rest }) => {
  return (
    <Link
      className={`text-slate-400 hover:text-indigo-600 font-medium transition-colors ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default CLink;
