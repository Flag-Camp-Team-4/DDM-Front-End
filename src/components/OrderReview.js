import { Button, Card } from 'antd';
import React from 'react';
import { orderReview } from '../utils';

class OrderReview extends React.Component {
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