import type { RadioProps } from 'antd';
import { Radio } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  root: css`
    border-radius: ${token.borderRadius};
    &:not(.ant-radio-wrapper-disabled):hover .ant-radio.ant-wave-target .ant-radio-inner {
      border-color: #4f46e5 !important;
    }
    .ant-radio-checked:not(.ant-radio-disabled):hover .ant-radio-inner {
      background-color: #423bc9ff !important;
      border-color: #4f46e5 !important;
    }
    & .ant-radio-checked .ant-radio-inner {
      background-color: #4f46e5 !important;
      border-color: #4f46e5 !important;
    }
    &:hover .ant-radio-inner {
      border-color: #d9d9d9 !important;
    }
    .ant-radio-inner,
    .ant-radio-inner::after {
      transition: none;
    }
  `,
}));

const CustomRadio = (props: RadioProps) => {
  const { styles: classNames } = useStyles();
  return <Radio {...props} className={classNames.root}></Radio>;
};

export default CustomRadio;
