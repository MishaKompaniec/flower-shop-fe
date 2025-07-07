import { Form, Input, Button } from 'antd';

import { Title, Wrapper, Inner } from './style';
import type { FC } from 'react';

const Authorization: FC = () => {
  const onFinish = (values: { email: string; password: string }) => {
    console.log('Success:', values);
    // Здесь можно вызывать API login (fetch/axios)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Wrapper>
      <Inner>
        <Title>Авторизация</Title>
        <Form
          name='auth_form'
          layout='vertical'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label='Email'
            name='email'
            rules={[
              { required: true, message: 'Пожалуйста, введите email!' },
              { type: 'email', message: 'Некорректный email!' },
            ]}
          >
            <Input placeholder='Введите ваш email' />
          </Form.Item>

          <Form.Item
            label='Пароль'
            name='password'
            rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
          >
            <Input.Password placeholder='Введите пароль' />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              Войти
            </Button>
          </Form.Item>
        </Form>
      </Inner>
    </Wrapper>
  );
};

export default Authorization;
