import { Footer } from '@/components';
import CLink from '@/components/CLink';
import { login, smsLogin } from '@/services/ant-design-pro/api';
import UseLoginStyles from '@/utils/loginCardStyle';
import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, Helmet, history, SelectLang, useIntl, useModel } from '@umijs/max';
import { Form, message } from 'antd';
import { createStyles } from 'antd-style';
import { KeyRound, Smartphone } from 'lucide-react';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';
import VertifyCode from '../components/VertifyCode';
import RoleBtn from './components/RoleBtn';

const useStyles = createStyles(({ token }) => {
  return {
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
  };
});

const Lang = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.lang} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  );
};

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { styles: loginStyle } = UseLoginStyles();
  const [role, setRole] = useState<number>(0);
  const intl = useIntl();

  const [loginType, setLoginType] = useState('password');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();

    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
          isUserRole: userInfo?.role === 'user',
        }));
      });
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const loginFn = loginType === 'sms' ? smsLogin : login;
      const res = await loginFn({ ...values });
      window.localStorage.setItem('token', res.data.token);
      message.success('登录成功！');
      await fetchUserInfo();

      const urlParams = new URL(window.location.href).searchParams;
      history.push(urlParams.get('redirect') || '/');
    } catch (error) {}
  };
  const [form] = Form.useForm();
  const changeRole = (role: number) => {
    setRole(role);
    form.resetFields(); // 清空输入的数据
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
        <title>
          {intl.formatMessage({
            id: 'menu.login',
            defaultMessage: '登录页',
          })}
          - {Settings.title}
        </title>
      </Helmet>
      <Lang />
      <div className="w-full max-w-md bg-white/40 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/60 transition-all duration-300">
        <div
          className={loginStyle.wrapper}
          style={{
            flex: '1',
            padding: '32px 0',
          }}
        >
          <LoginForm
            form={form}
            contentStyle={{
              minWidth: 280,
              maxWidth: '75vw',
            }}
            logo={null}
            title="合同 AI"
            //   subTitle="登录"
            initialValues={{
              autoLogin: true,
            }}
            onFinish={async (values) => {
              const _values = { ...values, role };
              await handleSubmit(_values as API.LoginParams);
            }}
          >
            <div className="flex justify-center my-6 border-b border-gray-100">
              <RoleBtn onClick={() => changeRole(0)} isActive={role === 0}>
                客户登录
              </RoleBtn>
              <RoleBtn onClick={() => changeRole(1)} isActive={role === 1}>
                律师登录
              </RoleBtn>
            </div>

            <>
              {loginType === 'sms' && (
                <>
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
                    <VertifyCode type="login"></VertifyCode>
                  </ProForm.Item>
                </>
              )}
              {loginType === 'password' && (
                <>
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
                        message: (
                          <FormattedMessage
                            id="pages.login.password.required"
                            defaultMessage="请输入密码！"
                          />
                        ),
                      },
                    ]}
                  />
                </>
              )}
            </>

            {/* 辅助链接栏：将登录方式切换完美嵌入左侧，右侧放置注册与忘记密码 */}
            <div className="flex justify-between items-center px-1 pt-1 text-sm mb-6">
              <button
                type="button"
                onClick={() => setLoginType(loginType === 'password' ? 'sms' : 'password')}
                className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors focus:outline-none flex items-center gap-1.5"
              >
                {loginType === 'password' ? (
                  <>
                    <Smartphone size="14" />
                    <span>验证码登录</span>
                  </>
                ) : (
                  <>
                    <KeyRound size="14" />
                    <span>密码登录</span>
                  </>
                )}
              </button>
              <div className="flex items-center space-x-3 text-slate-400">
                <CLink to="/user/regist">注册</CLink>
                <span className="text-slate-200">|</span>
                <CLink to={`/user/forget?type=${role}`}>忘记密码</CLink>
              </div>
            </div>
          </LoginForm>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
