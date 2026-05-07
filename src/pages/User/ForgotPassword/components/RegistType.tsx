import CustomRadio from '@/components/Radio';
type RegistTypeProps = {
  onChange?: (data: string) => void;
  value?: string;
};
export default function RegistType({ value }: RegistTypeProps) {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <div>账号类型：</div>
      <CustomRadio checked={value === 'lawyer'} disabled={value !== 'lawyer'}>
        律师
      </CustomRadio>
      <CustomRadio checked={value === 'user'} disabled={value !== 'user'}>
        用户
      </CustomRadio>
    </div>
  );
}
