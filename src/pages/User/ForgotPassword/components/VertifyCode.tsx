import { Input } from 'antd';
import { ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
type RegistTypeProps = {
  onChange?: (data: string) => void;
  value?: string;
};
export default function VertifyCode({ value, onChange = () => {} }: RegistTypeProps) {
  const [countdown, setCountdown] = useState(0);
  // 倒计时逻辑
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);
  const handleSendCode = () => {
    if (countdown === 0) {
      setCountdown(60);
      // 这里添加发送验证码的逻辑
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
