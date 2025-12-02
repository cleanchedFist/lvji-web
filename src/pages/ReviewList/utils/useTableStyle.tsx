import { createStyles } from 'antd-style';
const useTableStyle = createStyles(() => ({
  wrapper: {
    '.ant-pro-card': {
      'border-radius': '1rem',
    },
    '.ant-pro-card-body': {
      'padding-inline': '0!important',
    },
    th: {
      padding: '16px 24px!important',
      background: '#f8fafc!important',
      color: '#64748b!important',
    },
    td: {
      padding: '16px 24px!important',
    },
    '.ant-table-row:hover': {
      background: '#f8fafc!important',
    },
  },
}));

export default useTableStyle;
