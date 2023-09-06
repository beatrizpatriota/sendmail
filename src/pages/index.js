"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import {
  CarOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Row } from 'antd';
import Link from 'next/link'
const { Header, Sider, Content } = Layout;

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ overflow: 'auto'}}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ height: '100vh'}}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Perfil',
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            height: '100%',
            background: colorBgContainer,
          }}
        >
          <Row>
          <Image src='/renegociacao.png' width={1640} height={350}/>
          <div style={{color: '#EC7000', width: '100%', padding:'60px', textAlign: 'center', backgroundColor: '#FAF7F5'}}>
            <h1>Aproveite e renegocie suas dívidas com as ofertas do Itaú</h1>  
          </div>
          <div style={{color: 'black', width: '100%', padding: '60px', textAlign: 'center'}}>
            <h1>Quais dívidas você gostaria de renegociar?</h1>
            <div style={{marginTop: '20px'}}>
            <Link href="/itau"><Button icon={<HomeOutlined />}>Dívidas do Itaú</Button></Link>
            <Link href="https://renegocie.gruporecovery.com/registro?utm_medium=lprenegocie&utm_source=reneg&utm_campaign=renegitau"><Button icon={<CarOutlined />}>Outras dívidas</Button></Link>          
            </div>
          </div>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
