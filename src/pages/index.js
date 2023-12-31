"use client"
import Image from 'next/image'
import React from 'react';
import {
  CarOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { Layout, Button, theme, Row } from 'antd';
import Link from 'next/link'

const {  Content } = Layout;

export default function Home() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
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
            <Link href="/renegociacao"><Button icon={<HomeOutlined />}>Dívidas do Itaú</Button></Link>
            <Link href="https://renegocie.gruporecovery.com/registro?utm_medium=lprenegocie&utm_source=reneg&utm_campaign=renegitau"><Button icon={<CarOutlined />}>Outras dívidas</Button></Link>          
            </div>
          </div>
          </Row>
        </Content>
    </Layout>
  );
}
