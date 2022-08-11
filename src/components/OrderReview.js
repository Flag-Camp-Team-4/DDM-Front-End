import { Card, List, message,Row,Col } from 'antd';
import React from 'react';
import { getHistoryOrder } from '../utils';
import '../styles/OrderReview.css'
//import { LockOutlined, UserOutlined } from '@ant-design/icons';
// import { orderReview } from '../utils';


class OrderReview extends React.Component {

    state = {
        loading: false,
        load:false,
        data: [],
    }

    componentDidMount() {
        this.handleHistoryOrder();
    }
    onLoadMore = () => {
        this.setState({
            load:true,
        })
    }
    handleHistoryOrder = async() => {
        this.setState ({
            loading : true,
        });
        try {
            const resp = await getHistoryOrder();
            this.setState({
                data:resp,
            });
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            })
        }
    }

    render() {
       
        const {data} = this.state;
        var res = [];
        if(data !== undefined) {
            for(var i in data) {
                res.push(data[i]);
            }
        }
        console.log(res);
        
        return (
            <List
                // grid={{
                //     gutter: 16,
                //     xs: 1,
                //     sm: 2,
                //     md: 4,
                //     lg: 4,
                //     xl: 6,
                //     xxl: 3,
                // }}  
                loading = {this.state.loading}
                dataSource = {res}
                renderItem={(item)=>
                        <div className='order_review'>
                            <Row gutter={16}>
                                <Col span={8}>
                            <List.Item>
                                <Card 
                                    title="Order Information"
                                    bordered={false}
                                    style={{
                                        width: 300,
                                    }}>
                                        <p>Track_Id: {item.trackId}</p>
                                        <p>Order_Id: {item.orderId}</p>
                                        <p>Weight: {item.weight}</p>
                                        <p>Sending_Address: {item.sendingAddress}</p>
                                        <p>Receiving_Address: {item.receivingAddress}</p>
                                        <p>Price: {item.price}</p>
                                </Card>
                            </List.Item>
                            </Col>
                            </Row>

                        </div>}
            />
        );
    }

};

export default OrderReview;