import { Footer } from '@/components';
import { resetPassword, verifySmsCode } from '@/services/ant-design-pro/api';
import UseLoginStyles from '@/utils/loginCardStyle';
import { LockOutlined, MobileOutlined } from '@ant-design/icons';
import { LoginForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { Helmet, history, Link } from '@umijs/max';
import { message } from 'antd';
import { createStyles } from 'antd-style';
import React from 'react';
import Settings from '../../../../config/defaultSettings';
import VertifyCode from '../components/VertifyCode';

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
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
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});

const Regist: React.FC = () => {
  const { styles } = useStyles();
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
    <div className={styles.container}>
      <Helmet>
        <title>忘记密码 - {Settings.title}</title>
      </Helmet>
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
      <Footer />
    </div>
  );
};

export default Regist;
