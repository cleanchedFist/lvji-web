import { sendSmsCode, sendSmsCodeForReset } from '@/services/ant-design-pro/api';
import { Form, Input, message } from 'antd';
import { ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

type RegistTypeProps = {
  onChange?: (data: string) => void;
  value?: string;
  type: string;
};
export default function VertifyCode({ type, value, onChange = () => {} }: RegistTypeProps) {
  const [countdown, setCountdown] = useState(0);
  const form = Form.useFormInstance();
  // 倒计时逻辑
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);
  const handleSendCode = async () => {
    if (!form || countdown) return;
    try {
      await form.validateFields(['phoneNumber']);
      const phoneNumber = form.getFieldValue('phoneNumber');
      const sendCode = type === 'regist' ? sendSmsCode : sendSmsCodeForReset;
      await sendCode(phoneNumber);

      setCountdown(60);
      message.success('验证码已发送！');
    } catch (e) {
      console.log('表单校验未通过:', e);
    }
  };
  return (
    <div className="flex gap-2">
      <Input
        placeholder="验证码"
        size="large"
        prefix={<ShieldCheck size={16} />}
        value={value} // 接收父级 ProForm.Item 传下来的值
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
      />
      <button
        type="button"
        onClick={handleSendCode}
        disabled={countdown > 0}
        className={`px-4 rounded-lg text-sm font-medium whitespace-nowrap transition-all shadow-sm ${
          countdown > 0
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-indigo-600  border border-indigo-100 hover:bg-indigo-50 active:scale-95'
        }`}
      >
        {countdown > 0 ? `${countdown}s后重发` : '获取验证码'}
      </button>
    </div>
  );
}
