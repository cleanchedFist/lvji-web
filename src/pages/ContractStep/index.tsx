import PageContainer from '@/components/PageContainer';
import { contractPre, contractReview } from '@/services/ant-design-pro/api';
import { useNavigate, useParams, useRequest } from '@umijs/max';
import { Form, message } from 'antd';
import React, { useState } from 'react';
import StepOne, { FormData as StepOneFormData } from './components/StepOne/index';
import StepTwo from './components/StepTwo';
import { initialForm } from './dataSchema';

const ContractStep: React.FC = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const params = useParams();
  const { data } = useRequest(contractPre, {
    defaultParams: [params.id!],
  });

  const [form] = Form.useForm<StepOneFormData>();

  function finish(value: any) {
    const formData = form.getFieldsValue(true);
    const reviewParams = {
      partyA: data.partyA,
      partyB: data.partyB,
      contractType: data.contractType,
      ...formData,
      ...value,
      reviewStance:
        formData?.reviewStance === '甲方'
          ? `甲方: ${data.partyA || ''}`
          : `乙方: ${data.partyB || ''}`,
    };
    try {
      contractReview(data.reviewResultNewId, { ...reviewParams, fileId: params.id }).then((res) => {
        // 审查成功
        if (res.data) {
          navigate(`/clm/reviews/result/${data.reviewResultNewId}`);
        } else {
          message.warning('审查失败，请重试');
        }
      });
    } catch (e) {
      message.warning('审查失败，请重试');
    }
  }

  if (!data) {
    return null;
  }
  return (
    <PageContainer>
      <Form form={form} initialValues={initialForm} preserve={true}>
        {step === 0 && (
          <StepOne formData={form} data={{ ...data }} onOk={() => setStep(1)}></StepOne>
        )}
        {step === 1 && <StepTwo onOk={finish} onBack={() => setStep(0)} />}
      </Form>
    </PageContainer>
  );
};

export default ContractStep;
