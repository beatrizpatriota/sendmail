import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router';
const CadastroPage= () => {
    const [error, setError] = useState('')
    const router = useRouter()
  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    try {
        const response = await fetch('/api/user/cadastro', {
        method: 'POST',
        body: JSON.stringify(values)
    })
    const json = await response.json()

    if (response.status !== 201) throw new Error(json)
    setCookie('authorization', json)
    router.push('/renegociacao')
    } catch (err) {
        setError(err.message)
    }

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
        name="name"
        rules={[
          {
            required: true,
            message: 'Por favor coloque seu nome!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nome" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Por favor, coloque seu e-mail!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
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
          placeholder="Senha"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Cadastrar
        </Button>
      </Form.Item>
      {error && <p>{error}</p>}
    </Form>

    </div>
  );
};

export default CadastroPage