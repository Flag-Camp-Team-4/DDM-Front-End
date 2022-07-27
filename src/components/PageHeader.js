import { Layout, Row, Col, Button } from 'antd';
import Register from './Register';

import Login from './Login';

import React from 'react'
import OrderList from './OrderList';

const { Header } = Layout

function PageHeader({ loggedIn, signoutOnClick, signinOnSuccess}) {
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
          {loggedIn && (
            <>
              <OrderList/>
            </>
          )}
          
          
          
          {/* <Button
            onClick={clickOrderHistory}
            style={{ marginRight: "20px" }}>Order History</Button>} */}
          {/* {loggedIn && <Button
            onClick={signoutOnClick}
            style={{ marginRight: "20px" }}>Logout</Button>} */}
          {!loggedIn && (
            <>
              <Login onSuccess={signinOnSuccess} />
              <Register />
            </>
          )}
        </Col>
      </Row>
    </Header>
  )
}

export default PageHeader; 