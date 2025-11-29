import PageContainer from '@/components/PageContainer';
import { contractPre } from '@/services/ant-design-pro/api';
import { useNavigate, useParams, useRequest } from '@umijs/max';
import React, { useState } from 'react';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';

const ContractStep: React.FC = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const params = useParams();
  const { data } = useRequest(contractPre, {
    defaultParams: [params.id!],
  });
  const [step1Form, setStep1Form] = useState({});

  function next(value: any) {
    setStep1Form(value);
    setStep(1);
  }

  function back() {
    setStep(0);
  }

  function finish(value: any) {
    const reviewParams = {
      partyA: data.partyA,
      partyB: data.partyB,
      contractType: data.contractType,
      ...step1Form,
      ...value,
    };
    localStorage.setItem('reviewParams', JSON.stringify(reviewParams));
    if (data.reviewResultNewId) {
      navigate(`/clm/contract/detail/${data.reviewResultNewId}`);
    }
  }

  if (!data) {
    return null;
  }

  return (
    <PageContainer>
      {step === 0 && <StepOne formData={step1Form} data={data} onOk={next}></StepOne>}
      {step === 1 && <StepTwo onOk={finish} onBack={back} />}
    </PageContainer>
  );
};

export default ContractStep;
