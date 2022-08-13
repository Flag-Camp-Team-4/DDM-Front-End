import { message, Layout, Dropdown, Menu, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import StaffPage from "./components/StaffPage";
import { getHistoryOrder } from "./utils";
import OrderReview from "./components/OrderReview"
import PlaceOrderPage from "./components/PlaceOrderPage";


const { Header, Content } = Layout;

class App extends React.Component {
    state = {
        authed: false,
        asStaff: false,
        loading: false, 
        toPlaceOrder: false,
        toOrderReviewPage: false,
        toShipPage: false,
        data: [], 
        orderInfos: [], 
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

    handleHistoryOrder = async () => {
        this.setState({
            loading: true,
        });
        try {
            const resp = await getHistoryOrder();
            this.setState({
                orderInfos: resp,
            });
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    }; 

    handleToPlaceOrder = () => {
        this.handleHistoryOrder();
        this.setState( {
            toPlaceOrder: true,
        })
    }

    handleClickOrderHistory = () => {
        this.setState( {
            loading: true,
        })
    }

    handleClickBackToMain = () => {
        this.setState({
            loading: false,
            toPlaceOrder: false
        });
    }

    renderContent = () => {
        if (!this.state.authed) {
            return <LoginPage handleLoginSuccess={this.handleLoginSuccess} />;
        }

        if (this.state.asStaff) {
            return <StaffPage />;
        }

        if(this.state.loading) {
            return <OrderReview/>;
        }

        if(this.state.toPlaceOrder) {
            return <PlaceOrderPage orderInfos={this.state.orderInfos} handleToOrderReviewPage={this.handleToOrderReviewPage}/>;
        }

        return <Home />;
    };

    userMenu = (
        <Menu>
            <Menu.Item key="logout" onClick={this.handleLogOut}>
                Log Out
            </Menu.Item>
            <Menu.Item key="orderHistory" onClick={this.handleClickOrderHistory}>
                Order History
            </Menu.Item>
        </Menu>
    );

    // Rander App
    render() {
        return (
            <Layout style={{ height: "100vh" }}>
                <Header style={{ backgroundColor: '#2050a0', padding: '0px', display: "flex", justifyContent: "space-between" }}>
                    <h1 style={{
                        color: 'white', fontFamily: 'Helvatica, Arial', fontWeight: 'bold', marginLeft: '20px'
                    }}>
                        Despatch & Delivery Managment
                    </h1>
                    <div style={{display: "flex", marginRight: "30px"}}>
                    <div>
                    <Button
                        onClick={this.handleClickBackToMain}
                        >
                            Home
                    </Button>
                    </div>
                    {this.state.authed && (
                        <div style={{marginLeft: "20px"}}>
                            <Dropdown trigger="click" overlay={this.userMenu}>
                                <Button icon={<UserOutlined />} shape="circle" />
                            </Dropdown>
                        </div>
                    )}
                    </div>
                </Header>
                <Content
                    style={{ height: "calc(100% - 64px)", overflow: "auto" }}>
                    {this.renderContent()}
                </Content>
            </Layout>
        );
    }
}

export default App;
