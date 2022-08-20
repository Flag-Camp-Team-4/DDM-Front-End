import { Card, List, message, Row, Col } from 'antd';
import React from 'react';
import { getHistoryOrder } from '../utils';
import '../styles/OrderReview.css'


class OrderReview extends React.Component {

    state = {
        loading: false,
        load: false,
        data: [],
    }

    componentDidMount() {
        this.handleHistoryOrder();
    }

    onLoadMore = () => {
        this.setState({
            load: true,
        })
    }

    handleHistoryOrder = async () => {
        this.setState({
            loading: true,
        });
        try {
            const resp = await getHistoryOrder();
            this.setState({
                data: resp,
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

        const { data } = this.state;
        var res = [];
        if (data !== undefined) {
            for (var i in data) {
                res.push(data[i]);
            }
        }

        return (
            <div className='orderHist'>
                <List
                    grid={{
                        gutter: 16,
                        // column: 4, 
                        xs: 1,
                        sm: 2,
                        md: 2,
                        lg: 3,
                        xl: 4,
                        xxl: 5,
                    }}
                    className='orderList'
                    // grid={{ gutter: 16, column: 4 }}
                    loading={this.state.loading}
                    dataSource={res}
                    renderItem={(item) =>
                        <div className='order_review'>
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
                                    <p>Sending Address: {item.sendingAddress}</p>
                                    <p>Receiving Address: {item.receivingAddress}</p>
                                    <p>Price: {item.price}</p>
                                </Card>
                            </List.Item>
                        </div>}
                />
            </div>
        );
    }

};

export default OrderReview;