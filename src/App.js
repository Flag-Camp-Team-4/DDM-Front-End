import logo from './logo.svg';
import './App.css';
import { Layout, message } from 'antd';
import PageHeader from './components/PageHeader';
import Home from './components/Home'
import { isDisabled } from '@testing-library/user-event/dist/utils';
import { logout } from './utils';
import React, {useState, useEffect } from 'react';

const { Header, Content } = Layout;

function App() {
  const [loggedIn, setLoggedIn] = useState(true)

  const signinOnSuccess = () => {
    setLoggedIn(true);
  }

  const signoutOnClick = () => {
    logout().then(() => {
      setLoggedIn(false)
      message.success('Successfully Signed out')
    }).catch((err) => {
      message.error(err.message)
    })
  }


  return (
    <Layout>
      <Header
      style={{padding: '0px', flex: isDisabled}}>
        <PageHeader 
        loggedIn={loggedIn}
        signoutOnClick={signoutOnClick}
        signinOnSuccess={signinOnSuccess}
         />
        {/* <h1 style={{ color: 'white', fontFamily: 'Helvatica, Arial', fontWeight: 'bold' }}>
        Despatch & Delivery Managment
      </h1> */}
      </Header>
      <Layout>
        <Layout style={{ padding: '5px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 20,
              margin: 0,
              height: 800,
              overflow: 'auto'
            }}
          >
            {/* <Home 
            isLoggedIn={loggedIn}/> */}
            
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
