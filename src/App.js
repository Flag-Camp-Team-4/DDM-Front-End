import { Layout, Dropdown, Menu, Button, PageHeader } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home"; 
import PageHeader from "./components/PageHeader"; 

 
const { Header, Content } = Layout;
 
class App extends React.Component {
  state = {
    authed: false,
    asStaff: false,
  };
 
  componentDidMount() {
    const authToken = localStorage.getItem("authToken");
    const asStaff = localStorage.getItem("asStaff") === "true";
    this.setState({
      authed: authToken !== null,
      asStaff: asStaff,
    });
  }
 
  handleLoginSuccess = (token, asStaff) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("asStaff", asStaff);
    this.setState({
      authed: true,
      asStaff: asStaff,
    });
  };
 
  handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("asStaff");
    this.setState({
      authed: false,
    });
  };
 
  renderContent = () => {
    if (!this.state.authed) {
      return <LoginPage handleLoginSuccess={this.handleLoginSuccess} />;
    }
 
    if (this.state.asStaff) {
      return <StaffPage />;
    }
 
    return <Home />;
  };
 
  userMenu = (
    <Menu>
      <Menu.Item key="logout" onClick={this.handleLogOut}>
        Log Out
      </Menu.Item>
      <Menu.Item key="orderHistory">
        Order History
      </Menu.Item>
    </Menu>
  );
 
  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        <Header style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: "white" }}>
            Stays Booking
          </div>
          {this.state.authed && (
            <PageHeader />
          )}
        </Header>
        <Content
          style={{ height: "calc(100% - 64px)", margin: 20, overflow: "auto" }}>
          {this.renderContent()}
        </Content>
      </Layout>
    );
  }
}
 
export default App;
