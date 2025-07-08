import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';

import { Title, Wrapper, Inner, LanguageSelectWrapper } from './style';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSelect } from '../../components/select';
import { useLoginMutation, useRegisterMutation } from '../../services/authApi';
import { useNavigate } from 'react-router-dom';

const AuthPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();

  const [isLogin, setIsLogin] = useState(true);

  const onFinishLogin = async (values: { email: string; password: string }) => {
    try {
      const res = await login(values).unwrap();
      localStorage.setItem('token', res.token);
      navigate('/', { replace: false });
    } catch (err: any) {
      message.error(err.data?.error || t('authorization.loginError'));
    }
  };

  const onFinishRegister = async (values: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      const { confirmPassword, ...rest } = values;
      await register({ ...rest, role: 'user' }).unwrap();
      setIsLogin(true);
    } catch (err: any) {
      message.error(err.data?.error || t('authorization.registerError'));
    }
  };

  return (
    <Wrapper>
      <LanguageSelectWrapper>
        <LanguageSelect isBlack />
      </LanguageSelectWrapper>
      <Inner>
        <Title>
          {isLogin ? t('authorization.login') : t('authorization.registration')}
        </Title>
        {isLogin ? (
          <Form
            name='login_form'
            layout='vertical'
            onFinish={onFinishLogin}
            initialValues={{ remember: true }}
          >
            <Form.Item
              label={t('authorization.email')}
              name='email'
              rules={[
                { required: true, message: t('authorization.enterEmail') },
                { type: 'email', message: t('authorization.invalidEmail') },
              ]}
            >
              <Input placeholder={t('authorization.email')} />
            </Form.Item>

            <Form.Item
              label={t('authorization.password')}
              name='password'
              rules={[
                { required: true, message: t('authorization.enterPassword') },
              ]}
            >
              <Input.Password placeholder={t('authorization.password')} />
            </Form.Item>

            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                block
                loading={isLoggingIn}
              >
                {t('authorization.loginBtn')}
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Form
            name='register_form'
            layout='vertical'
            onFinish={onFinishRegister}
          >
            <Form.Item
              label={t('authorization.email')}
              name='email'
              rules={[
                { required: true, message: t('authorization.enterEmail') },
                { type: 'email', message: t('authorization.invalidEmail') },
              ]}
            >
              <Input placeholder={t('authorization.email')} />
            </Form.Item>

            <Form.Item
              label={t('authorization.password')}
              name='password'
              rules={[
                { required: true, message: t('authorization.enterPassword') },
                { min: 6, message: t('authorization.passwordMinLength') },
              ]}
              hasFeedback
            >
              <Input.Password placeholder={t('authorization.password')} />
            </Form.Item>

            <Form.Item
              label={t('authorization.confirmPassword')}
              name='confirmPassword'
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: t('authorization.confirmPasswordRequired'),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(t('authorization.passwordsNotMatch'))
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder={t('authorization.confirmPassword')}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                block
                loading={isRegistering}
              >
                {t('authorization.registrationBtn')}
              </Button>
            </Form.Item>
          </Form>
        )}

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          {isLogin ? (
            <>
              {t('authorization.noAccount')}{' '}
              <Button type='link' onClick={() => setIsLogin(false)}>
                {t('authorization.register')}
              </Button>
            </>
          ) : (
            <>
              {t('authorization.haveAccount')}{' '}
              <Button type='link' onClick={() => setIsLogin(true)}>
                {t('authorization.signIn')}
              </Button>
            </>
          )}
        </div>
      </Inner>
    </Wrapper>
  );
};

export default AuthPage;
