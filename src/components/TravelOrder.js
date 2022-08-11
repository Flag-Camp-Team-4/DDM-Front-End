import { SmileOutlined } from '@ant-design/icons';
import { Timeline, Card , Image, Layout, Row, Col, message} from 'antd';
import React from 'react';
import { getOrderInfo } from '../utils';

const {Sider, Content } = Layout;


class OrderInfo extends React.Component {
    
    render() {
        return (
            <Card
            style={{
                width: matchMedia,
            }}
            >
                <Timeline
                title='Order state'
                style={{
                    left: 1000,
                }}
                >
                    <Timeline.Item color="gray">2022-03-22 10:10 : Order Created</Timeline.Item>
                    <Timeline.Item color="gray">2022-03-22 12:30 : Order Processed</Timeline.Item>
                    <Timeline.Item color="green">2022-03-22 15:20 : Order Deliveried</Timeline.Item>

                </Timeline>
                <Card
                title="Order Details"
                style={{
                    width: 700,
                }}
                >
                    <p>Order Date</p>
                    <p>Order Number</p>
                    <p>Order Total</p>

                </Card>
                <Card
                title="Shipping Address"
                style={{
                    width: 700,
                }}
                >
                    <p>US</p>
                </Card>
                <Card
                title="Package Information"
                style={{
                    width: 700,
                }}
                >
                    <p>Method</p>
                    <p>Weoght</p>
                </Card>
            </Card>
               

        );
    }
}

class mapImage extends React.Component {
    render() {
        return (
            <Image
                width={550}
                src={`https://www.mapquestapi.com/staticmap/v5/map?start=${this.props.orderInfos.sending_address}&end=${this.props.orderInfos.receiving_address}&size=@2x&key=xAGEknEZgp2cweVEAI9RGBYxwGU88prC`}
            />
        )
    }
}

class TravelOrder extends React.Component {
    state = {
        loading: false,
        orderInfos: {
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

    render () {
        return (
            <Row className='main'>
                <Col span={11} className="left-side" push={2}>
                    <OrderInfo/>
                </Col>
                <Col span={13} className="right-side" pull={2}>
                    <mapImage />
                </Col>
            </Row>

        );

    }
}


 export default TravelOrder;








