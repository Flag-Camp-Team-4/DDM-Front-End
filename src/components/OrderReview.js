import { Button, Card, message, List } from 'antd';
import React from 'react';
import { getOrderInfo } from '../utils';

class OrderReview extends React.Component {
    state = {
        loading: false,
        orderInfos: []
    };

    componentDidMount() {
        this.loadInfo();
    }

    loadInfo = async () => {
        this.setState({
            loading: true,
        });

        try {
            const resp = await getOrderInfo();
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

    render() {
        return (
            <>
                <Card
                    title="Order Review"
                    style={{
                        width: matchMedia,
                    }}
                >
                    <p>
                        <Card
                            style={{
                                width: matchMedia,
                            }}
                        >
                            <h1>Order Details</h1>
                            <List
                                style={{ width: 1000, margin: "auto" }}
                                loading={this.state.loading}
                                dataSource={this.state.data}
                                renderItem={(item) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            title={<h1>Order Details</h1>}
                                            description={
                                                <>
                                                    <p>Order Date : {item.orderInfos.data}</p>
                                                    <p>Order Number : {item.orderInfos.number}</p>
                                                </>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                            <p>Order Date</p>
                            <p>Order Number</p>
                            <h1>Sender Information</h1>
                            <h1>Shipping Address</h1>
                            <h1>Shipping Information</h1>
                            <p>Method</p>
                            <p>Weight</p>
                            <p>Length</p>
                            <p>Weight</p>
                            <p>height</p>
                        </Card>
                    </p>
                    <p>
                        <Card
                            //title="Order Summary"
                            style={{
                                width: matchMedia,
                            }}
                        >
                            <h1>Order Summary</h1>
                            <p>Delivery Fee</p>
                            <p>Total Before Tax</p>
                            <p>Eximated Tax Collected</p>
                            <p>Order Total</p>
                        </Card>
                    </p>
                    <div>
                        <Button
                            //onClick={this.handleRegister}
                            //disabled={this.state.loading}
                            shape="round"
                            type="primary"
                        >
                            Previous
                        </Button>
                        <Button
                            style={{
                                left: 700,
                            }}
                            //onClick={this.handleRegister}
                            //disabled={this.state.loading}
                            shape="round"
                            type="primary"
                        >
                            Previous
                        </Button>
                    </div>
                </Card>
            </>

        );
    }

}

export default OrderReview;