import { Layout, Dropdown, Menu, Button, PageHeader, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import OrderReview from "./components/OrderReview";
import TravelOrder from "./components/TravelOrder";


const { Header, Content } = Layout;

class App extends React.Component {
  render() {
    return (
      <Layout>
        <PageHeader/>
        <TravelOrder/>
      </Layout>
    );
  }
}

export default App;
