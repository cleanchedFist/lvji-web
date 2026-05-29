import { Footer } from '@/components';
import { lawyerRegist, regist } from '@/services/ant-design-pro/api';
import UseLoginStyles from '@/utils/loginCardStyle';
import { LockOutlined, MobileOutlined, SwitcherOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { Helmet, history, Link } from '@umijs/max';
import { message } from 'antd';
import React, { useState } from 'react';
import Settings from '../../../../config/defaultSettings';
import VertifyCode from '../components/VertifyCode';
import RegistType from './components/RegistType';

const Regist: React.FC = () => {
  const { styles: loginStyle } = UseLoginStyles();
  const [codeVisible, setCodeVisible] = useState(true);

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      if (values?.type === 'lawyer') {
        await lawyerRegist({ ...values });
      } else {
        await regist({ ...values });
      }
      message.success('注册成功！');
      history.push('/user/login');
    } catch (error) {
      console.log('xxx', error);
    }
  };

  const handleValuesChange = (value: any) => {
    if (value.type === 'lawyer') {
      setCodeVisible(true);
    } else if (value.type === 'user') {
      setCodeVisible(false);
    }
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
        <title>注册页 - {Settings.title}</title>
      </Helmet>
      <div className="w-full max-w-md bg-white/40 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/60 transition-all duration-300">
        <div
          className={loginStyle.wrapper}
          style={{
            flex: '1',
            padding: '32px 0',
          }}
        >
          <LoginForm
            contentStyle={{
              minWidth: 280,
              maxWidth: '75vw',
            }}
            logo={<img alt="logo" src="/logo.svg" />}
            title="合同 AI"
            submitter={{
              searchConfig: {
                submitText: '注册',
              },
            }}
            onFinish={async (values) => {
              await handleSubmit(values as API.LoginParams);
            }}
            onValuesChange={handleValuesChange}
          >
            <div className="h-4"></div>
            <ProForm.Item name="type" initialValue="lawyer">
              <RegistType />
            </ProForm.Item>
            <ProFormText
              name="phoneNumber"
              fieldProps={{
                size: 'large',
                prefix: <MobileOutlined />,
              }}
              placeholder="手机号"
              rules={[
                {
                  required: true,
                  message: '请输入手机号!',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '手机号格式错误！',
                },
              ]}
            />
            <ProForm.Item
              name="code"
              rules={[
                { required: true, message: '请输入验证码！' },
                { pattern: /^\d{6}$/, message: '验证码格式错误！' },
              ]}
            >
              <VertifyCode type="regist"></VertifyCode>
            </ProForm.Item>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined />,
              }}
              placeholder="用户名"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined />,
              }}
              placeholder="密码"
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
            {codeVisible && (
              <ProFormText
                name="invitationCode"
                fieldProps={{
                  size: 'large',
                  prefix: <SwitcherOutlined />,
                }}
                placeholder="邀请码"
                rules={[
                  {
                    required: true,
                    message: '请输入邀请码!',
                  },
                ]}
              />
            )}
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
