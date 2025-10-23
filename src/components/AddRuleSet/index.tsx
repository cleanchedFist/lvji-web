import { ModalForm, ProFormText } from '@ant-design/pro-components';
import React from 'react';

export type RuleSetFormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.ScenarioItem>;

export type AddRuleSetProps = {
  onCancel: () => void;
  onSubmit: (values: RuleSetFormValueType) => Promise<void>;
  visible: boolean;
};

const AddRuleSet: React.FC<AddRuleSetProps> = (props) => {
  return (
    <ModalForm
      title="新增规则集"
      open={props.visible}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: props.onCancel,
      }}
      onFinish={props.onSubmit}
    >
      <ProFormText name="name" label="规则集名称" />
    </ModalForm>
  );
};

export default AddRuleSet;
