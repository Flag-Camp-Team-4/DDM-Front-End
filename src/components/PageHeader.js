import { Layout, Row, Col, Button } from 'antd';
import React from 'react'

const { Header } = Layout

function PageHeader() {
  return (
    <Header style={{ backgroundColor: '#2050a0', padding: '0px' }}>
      <Row justify='space-between'>
        <h1 style={{
          color: 'white',
          fontFamily: 'Helvatica, Arial',
          fontWeight: 'bold',
          marginLeft: '20px'
        }}>
          Despatch & Delivery Managment
        </h1>
        <Col>
          <Dropdown trigger="click" overlay={this.userMenu}>
            <Button icon={<UserOutlined />} shape="circle" />
          </Dropdown>
        </Col>
      </Row>
    </Header>
  )
}

export default PageHeader; 