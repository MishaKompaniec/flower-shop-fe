import { useState } from 'react';
import { Form, Input, Button } from 'antd';

import {
  Title,
  Wrapper,
  Inner,
  LanguageSelectWrapper,
  LogoWrapper,
  Logo,
} from './style';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useNotificationContext } from '@/context/notificationContext';
import {
  useLoginMutation,
  useRegisterMutation,
} from '@/store/services/authApi';
import { LanguageSelect } from '@/components';
import { useDispatch } from 'react-redux';
import { setToken } from '@/store/slices/authSlice';
import { parseApiError } from '@/utils/parseApiError';

const AuthPage: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const api = useNotificationContext();

  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();

  const [isLogin, setIsLogin] = useState(true);

  const onFinishLogin = async (values: { email: string; password: string }) => {
    try {
      const res = await login(values).unwrap();
      localStorage.setItem('token', res.token);
      dispatch(setToken(res.token));
      navigate('/', { replace: false });
    } catch (error) {
      const { message } = parseApiError(error);
      const errorMessageMap: Record<string, string> = {
        'Invalid password': 'authorization.loginErrorInvalidPassword',
        'User not found': 'authorization.loginErrorUserNotFound',
      };
      const messageKey = errorMessageMap[message] || 'authorization.loginError';

      api.error({
        message: t(messageKey),
        placement: 'topRight',
        duration: 3,
      });
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
    } catch (error) {
      const { message } = parseApiError(error);
      const isUserExists = message === 'User already exists';

      api.error({
        message: isUserExists
          ? t('authorization.registerErrorExists')
          : t('authorization.registerError'),
        placement: 'topRight',
        duration: 3,
      });
    }
  };

  return (
    <Wrapper>
      <LogoWrapper to='/'>
        <Logo src='/images/logo.png' alt='flower' />
      </LogoWrapper>
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
