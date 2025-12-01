import type { CheckboxProps } from 'antd';
import { Checkbox } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  root: css`
    border-radius: ${token.borderRadius};
    &:not(.ant-checkbox-wrapper-disabled):hover .ant-checkbox.ant-wave-target .ant-checkbox-inner {
      border-color: #4f46e5 !important;
    }
    .ant-checkbox-checked:not(.ant-checkbox-disabled):hover .ant-checkbox-inner {
      background-color: #423bc9ff !important;
      border-color: #4f46e5 !important;
    }
    & .ant-checkbox-checked .ant-checkbox-inner {
      background-color: #4f46e5 !important;
      border-color: #4f46e5 !important;
    }
    &:hover .ant-checkbox-inner {
      border-color: #d9d9d9 !important;
    }
    .ant-checkbox-inner,
    .ant-checkbox-inner::after {
      transition: none;
    }
  `,
}));

const CustomCheckbox = (props: CheckboxProps) => {
  const { styles: classNames } = useStyles();
  return <Checkbox {...props} className={classNames.root}></Checkbox>;
};

export default CustomCheckbox;
