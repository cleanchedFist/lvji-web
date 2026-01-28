import CustomRadio from '@/components/Radio';
type RegistTypeProps = {
  onChange?: (data: string) => void;
  value?: string;
};
export default function RegistType({ value, onChange }: RegistTypeProps) {
  const _onChange = onChange || (() => {});
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <div>注册类型：</div>
      <CustomRadio checked={value === 'lawyer'} onClick={() => _onChange('lawyer')}>
        律师
      </CustomRadio>
      <CustomRadio checked={value === 'user'} onClick={() => _onChange('user')}>
        用户
      </CustomRadio>
    </div>
  );
}
