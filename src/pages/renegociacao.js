"use client"
import React, { useState } from 'react';
import { Layout, Button, theme, Row, Col, Table, Select, Modal, Input } from 'antd';

const { Content } = Layout;

export default function Itau(props) {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedRows, setSelectedRows] = useState([])
  const [email, setEmail] = useState('')
  const [parcela, setParcela] = useState()
  const [valorParcela, setValorParcela] = useState()
  const [showTable, setShowTable] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [data, setData] = useState(props.dataSource)
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
    for(let i = 0; i< props.dataSource.length; i++) {
      valor += props.dataSource[i].value
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
    const valor = (valorTotal/value) * 9
    setParcela(valor)
    setValorParcela(value)
    setShowTable(true)
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    await fetch('/api/sendmail', {
      method: 'POST',
      body: JSON.stringify({title: 'Proposta de efetuação de acordo de pagamento', emails: email, text: `Valor da proposta: ${valorSelecionado()}, com parcelas de ${parcela}`})
    })
    setIsModalOpen(false)
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const dataParcelas = [
    {
      key: 1,
      parcela: valorParcela,
      juros: 9,
      valor: parcela
    }
  ]

  const columnsParcelas = [
    {
      title: 'Quantidade de parcelas',
      dataIndex: 'parcela',
      key: 'parcela',
    },
    {
      title: 'Taxa efetiva',
      dataIndex: 'juros',
      key: 'juros',
    },
    {
      title: 'Primeira parcela',
      dataIndex: 'valor',
      key: 'valor',
    },
  ];

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
          <Modal 
          title="Simulação de pagamento" 
          open={isModalOpen} 
          onOk={handleOk} 
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancelar
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              Efetivar acordo via e-mail
            </Button>,
          ]}
          >
          <p>Valor selecionado para pagamento de dívidas: {valorSelecionado()} reais</p>
          <p>Número de parcelas: <Select
          options={[
            {
              value: '12',
              label: '12',
            },
            {
              value: '24',
              label: '24',
            },
            {
              value: '36',
              label: '36',
            },
            {
              value: '48',
              label: '48',
            },
            {
              value: '60',
              label: '60',
            },
            {
              value: '72',
              label: '72',
            },
            {
              value: '84',
              label: '84',
            },
            {
              value: '108',
              label: '108',
            },
            {
              value: '120',
              label: '120',
            }
          ]}
          style={{
            width: 120,
          }}
          onChange={handleChange}
          ></Select></p>
          {showTable && <Table style={{width: '100%'}} dataSource={dataParcelas} columns={columnsParcelas} />}
          <p>Digite seu e-mail para enviar o acordo:</p>
          <Input placeholder="E-mail para envio da proposta de pagamento" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </Modal>
          </Row>
        </Content>
      </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch('https://sendmail-six.vercel.app/api/getDividas')
  const dataSource = await res.json()

  return {
    props: {
    dataSource,
    },
  }
}