import { createStyles } from 'antd-style';
const UseLoginStyles = createStyles(({ token }) => {
  return {
    wrapper: {
      '.ant-tabs-tab-btn': {
        color: 'black!important',
      },
      '.ant-tabs-ink-bar': {
        opacity: 0,
      },
      '.ant-btn': {
        background: '#4b4ddd',
      },
      '.ant-btn:hover': {
        background: '#818CF8!important',
      },
      '.ant-input-outlined:hover': {
        'border-color': '#4b4ddd!important',
      },
    },
  };
});

export default UseLoginStyles;
