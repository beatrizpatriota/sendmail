"use client"
import React, { useState } from 'react';
import {
  CarOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Row, Col, Table, Select, Modal } from 'antd';
const { Header, Sider, Content } = Layout;

export default function Itau() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedRows, setSelectedRows] = useState([])
  const [showValor, setShowValor] = useState(false)
  const [parcela, setParcela] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const dataSource = [
    {
      key: '1',
      value: 300000,
      segmento: 'Apartamento',
      address: '10 Downing Street',
    },
    {
      key: '2',
      value: 450000,
      segmento: 'Casa',
      address: '10 Downing Street',
    },
    {
      key: '3',
      value: 450000,
      segmento: 'Casa',
      address: '10 Downing Street',
    },
    {
      key: '4',
      value: 450000,
      segmento: 'Casa',
      address: '10 Downing Street',
    },
    {
      key: '5',
      value: 450000,
      segmento: 'Casa',
      address: '10 Downing Street',
    },
    {
      key: '6',
      value: 450000,
      segmento: 'Casa',
      address: '10 Downing Street',
    },
  ];
  const [data, setData] = useState(dataSource)
  const columns = [
    {
      title: 'Valor da dívida',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Segmento',
      dataIndex: 'segmento',
      key: 'segmento',
    },
    {
      title: 'Endereço',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    setSelectedRows(selectedRows);
  };

  const rowSelection = {
    selectedRows,
    onChange: onSelectChange,
  };

  const valorTotal = () => {
    let valor = 0
    for(let i = 0; i< dataSource.length; i++) {
      valor += dataSource[i].value
        }
    return valor
  }

  const valorSelecionado = () => {
    let valor = 0
    for(let i = 0; i< selectedRows.length; i++) {
      valor += selectedRows[i].value
        }
    return valor
  }

  const simularPagamento = () => {
    return valorTotal() - valorSelecionado()
  }

  const handleChange = (value) => {
    const valorTotal = valorSelecionado()
    const valor = valorTotal/value
    setParcela(valor)
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    await fetch('https://sendmail-six.vercel.app/api/sendmail', {
      method: 'POST',
      body: JSON.stringify({title: 'Proposta de efetuação de acordo de pagamento', emails: ['biaapatriota@gmail.com'], text: `Valor da proposta: ${valorSelecionado()}`})
    })
    setIsModalOpen(false)
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
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
            <p>Selecione os valores a serem pagos:</p>
          <Table style={{width: '100%'}} rowSelection={rowSelection} dataSource={data} columns={columns} />
          <Row>
            <h2>Simulação de pagamento</h2>
            <Col span={24}><p>Valor total de dívidas: {valorTotal()} reais</p>
            </Col>
          </Row>
          <Row style={{ width: '100%'}}>
            <Col span={24}><p>Valor selecionado para pagamento de dívidas: {valorSelecionado()} reais</p>
            </Col>
            <Col span={24}><p>Valor restante de dívidas: {simularPagamento()}</p></Col>
          </Row>
          <Button onClick={() => showModal()}>Simular pagamento</Button>
          <Modal title="Simulação de pagamento" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>Valor selecionado para pagamento de dívidas: {valorSelecionado()} reais</p>
          <p>Número de parcelas: <Select
          defaultValue={5}
          options={[
            {
              value: '5',
              label: '5',
            },
            {
              value: '10',
              label: '10',
            },
            {
              value: '15',
              label: '15',
            },
            {
              value: '20',
              label: '20',
            },
            {
              value: '25',
              label: '25',
            },
            {
              value: '30',
              label: '30',
            },
            {
              value: '40',
              label: '40',
            },
            {
              value: '50',
              label: '50',
            },
            {
              value: '60',
              label: '60',
            }
          ]}
          style={{
            width: 120,
          }}
          onChange={handleChange}
          ></Select></p>
          <p>Valor de cada parcela: {parcela}</p>
      </Modal>
          </Row>
          
        </Content>
      </Layout>
    </Layout>
  );
}
