import { Footer } from '@/components';
import { resetPassword, verifySmsCode } from '@/services/ant-design-pro/api';
import UseLoginStyles from '@/utils/loginCardStyle';
import { LockOutlined, MobileOutlined } from '@ant-design/icons';
import { LoginForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { Helmet, history, Link } from '@umijs/max';
import { message } from 'antd';
import React from 'react';
import Settings from '../../../../config/defaultSettings';
import VertifyCode from '../components/VertifyCode';

const Regist: React.FC = () => {
  const { styles: loginStyle } = UseLoginStyles();

  const handleSubmit = async (values: API.RegistParams) => {
    try {
      // 登录
      const { phoneNumber, code, password } = values;
      const { data } = await verifySmsCode({ phoneNumber, code });
      await resetPassword({ phoneNumber, password, resetToken: data });
      message.success('密码重置成功，请登陆');
      history.push('/user/login');
    } catch (error) {
      message.error('重置失败，请重试');
    }
  };

  const loginFormConfig = {
    contentStyle: {
      minWidth: 280,
      maxWidth: '75vw',
    },
    // logo: <img alt="logo" src="/logo.svg" />,
    title: '合同 AI',
    submitter: {
      searchConfig: {
        submitText: '确认修改',
      },
    },
    onFinish: async (values: API.RegistParams) => {
      await handleSubmit(values as API.RegistParams);
    },
  };

  return (
    <div
      className="min-h-screen w-screen flex flex-col justify-center items-center p-4 selection:bg-indigo-200"
      style={{
        background:
          'radial-gradient(circle at 80% 20%, #eef2ff 0%, #e0e7ff 35%, #f1f5f9 70%, #ffffff 100%)',
      }}
    >
      <Helmet>
        <title>忘记密码 - {Settings.title}</title>
      </Helmet>
      <div className="w-full max-w-md bg-white/40 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/60 transition-all duration-300">
        <div className={`${loginStyle.wrapper} flex-1 py-8`}>
          <LoginForm {...loginFormConfig}>
            <div className="h-4"></div>

            {/* <ProForm.Item name="type" initialValue={type === '1' ? 'lawyer' : 'user'}>
            <RegistType />
          </ProForm.Item> */}

            <ProFormText
              name="phoneNumber"
              placeholder="手机号"
              fieldProps={{ size: 'large', prefix: <MobileOutlined /> }}
              rules={[
                { required: true, message: '请输入手机号!' },
                { pattern: /^1\d{10}$/, message: '手机号格式错误！' },
              ]}
            />
            <ProForm.Item
              name="code"
              rules={[
                { required: true, message: '请输入验证码！' },
                { pattern: /^\d{6}$/, message: '验证码格式错误！' },
              ]}
            >
              <VertifyCode type="reset"></VertifyCode>
            </ProForm.Item>
            <ProFormText.Password
              name="password"
              placeholder="设置新密码"
              fieldProps={{ size: 'large', prefix: <LockOutlined /> }}
              rules={[{ required: true, message: '请输入密码！' }]}
            />
            <ProFormText.Password
              name="confirm_password"
              placeholder="确认新密码"
              fieldProps={{ size: 'large', prefix: <LockOutlined /> }}
              rules={[
                { required: true, message: '请输入密码！' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    // 如果输入为空，或者与 password 字段的值一致，则校验通过
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    // 否则返回错误信息
                    return Promise.reject(new Error('两次输入的密码不一致！'));
                  },
                }),
              ]}
            />
            <div className="flex mb-6 justify-between">
              <Link to="/user/login">返回登录</Link>
            </div>
          </LoginForm>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Regist;
