import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link'

const LoginPage= () => {
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  return (
    <div style={{ 
      width: '100vw',
height: '100vh',
display: 'flex',
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center'
    }}>
      
    <Form
      name="normal_login"
      className="login-form"
      style={{ width: '300px', height: '300px'}}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Por favor coloque seu username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Por favor coloque sua senha!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Login
        </Button>
         Ou <Link href="/cadastro"> se cadastre agora!</Link>
      </Form.Item>
    </Form>
    </div>
  );
};

export default LoginPage