import './DeviceApp.css'; 
import { Layout, message } from 'antd';
import PageHeader from './components/PageHeader';
import React from 'react';

const { Header, Content } = Layout;

function DeviceApp() {
  const [loggedIn, setLoggedIn] = useState(false)

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
            <Home 
            isLoggedIn={loggedIn}/>
            
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default DeviceApp;