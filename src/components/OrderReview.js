import { Card, Descriptions } from 'antd';
import React from 'react';
//import { LockOutlined, UserOutlined } from '@ant-design/icons';
// import { orderReview } from '../utils';

class OrderReview extends React.Component {

    render() {
        return (
            <div>
                <br></br>
                <div className='orderReview'>
                    <div className='reviewBlock'>
                        <Descriptions title="Order Details">
                            <Descriptions.Item label="Order date">Zhou Maomao</Descriptions.Item>
                            <Descriptions.Item label="Order number">1810000000</Descriptions.Item>
                        </ Descriptions>

                        <Descriptions title="Sender Information">
                            <Descriptions.Item>
                                Peter 123-123-1233
                                20 W 34th St
                                New York, NY 10001
                                United States
                            </Descriptions.Item>
                        </Descriptions>

                        <Descriptions title="Shipping Address">
                            <Descriptions.Item>
                                Peter 123-123-1233
                                20 W 34th St
                                New York, NY 10001
                                United States
                            </Descriptions.Item>
                        </Descriptions>

                        <Descriptions title="Package Information">
                            <Descriptions.Item label="Method">Drone</Descriptions.Item>
                            <Descriptions.Item label="Weight">2.5 lb</Descriptions.Item>
                        </Descriptions>
                    </div>
                    <br></br>
                    <div className='reviewBlock'>
                        <Descriptions title="Order Summary">
                            <Descriptions.Item label="Delivery Fee">$20</Descriptions.Item>
                        </Descriptions>
                    </div>
                </div>
            </div>
        );
    }

}

export default OrderReview;