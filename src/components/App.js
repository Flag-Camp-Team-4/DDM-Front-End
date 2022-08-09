import { Layout, Dropdown, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import PlaceOrderPage from "./PlaceOrderPage";
import ShipPage from "./ShipPage";
import OrderReviewPage from "./OrderReviewPage";

const { Header, Content } = Layout;

class App extends React.Component {
  state = {
    authed: true,
    toShipPage: false,
    toOrderReviewPage: false,
    orderInfo: {
      price: 13.21,
      receiving_address: "200 Angelo Cifelli Dr, Harrison, NJ 07029",
      sending_address: "605 Pavonia Ave, Jersey City, NJ 07306",
      track_id: 28606,
      weight: 3,
      device_id: 7,
      user_name: "test1"
    }
  };

  componentDidMount() {
    const authToken = localStorage.getItem("authToken");
    this.setState({
      authed: authToken !== null,
    });
  }

  handleShipPage = () => {
    this.setState({
      toShipPage: true,
    });
  };

  handleOrderReviewPage = () => {
    this.setState({
      toOrderReviewPage: true,
    });
  };

  renderContent = () => {
    if (this.state.toShipPage) {
      return <ShipPage />;
    } else if (this.state.toOrderReviewPage) {
      return <OrderReviewPage />;
    } else {
      return <PlaceOrderPage handlePrevious={this.handleShipPage} handleNext={this.handleOrderReviewPage} orderInfo={this.state.orderInfo} />;
    }
  };

  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        <Header style={{ backgroundColor: '#2050a0', padding: '0px', display: "flex", justifyContent: "space-between" }}>
          <h1 style={{
            color: 'white', fontFamily: 'Helvatica, Arial', fontWeight: 'bold', marginLeft: '20px'
          }}>
            Despatch & Delivery Managment
          </h1>
          {this.state.authed && (
            <div style={{ marginRight: "20px" }}>
              <Dropdown trigger="click" overlay={this.userMenu}>
                <Button icon={<UserOutlined />} shape="circle" />
              </Dropdown>
            </div>

          )}
        </Header>
        <Content
          style={{ height: "calc(100% - 64px)", margin: 20, overflow: "auto" }}
        >
          {this.renderContent()}
        </Content>
      </Layout>
    );
  }
}

export default App;
