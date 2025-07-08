import { useState } from 'react';
import { Form, Input, Button } from 'antd';

import { Title, Wrapper, Inner, LanguageSelectWrapper } from './style';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSelect } from '../../components/select';

const AuthPage: FC = () => {
  const { t } = useTranslation();

  const [isLogin, setIsLogin] = useState(true);

  const onFinishLogin = (values: { email: string; password: string }) => {
    console.log('Login Success:', values);
  };

  const onFinishRegister = (values: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    console.log('Register Success:', values);
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
              <Button type='primary' htmlType='submit' block>
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
              <Button type='primary' htmlType='submit' block>
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
