import { SmileOutlined } from '@ant-design/icons';
import { Timeline, Card } from 'antd';
import React from 'react';
import { travelOrder } from '../utils';


class TravelOrder extends React.Component {
    render() {
        return (
            <Card
            style={{
                width: matchMedia,
            }}
            >
                <Timeline>
                    <Timeline.Item color="gray">2022-03-22 10:10 : Order Created</Timeline.Item>
                    <Timeline.Item color="gray">2022-03-22 12:30 : Order Processed</Timeline.Item>
                    <Timeline.Item color="green">2022-03-22 15:20 : Order Deliveried</Timeline.Item>

                </Timeline>
                <Card
                title="Order Details"
                style={{
                    width: 800,
                }}
                >
                    <p>Order Date</p>
                    <p>Order Number</p>
                    <p>Order Total</p>

                </Card>
                <Card
                title="Shipping Address"
                style={{
                    width: 800,
                }}
                >
                    <p>US</p>
                </Card>
                <Card
                title="Package Information"
                style={{
                    width: 800,
                }}
                >
                    <p>Method</p>
                    <p>Weoght</p>
                </Card>
            </Card>
               

        );
    }
}
 export default TravelOrder;








