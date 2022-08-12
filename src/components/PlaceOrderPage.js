import React from "react";
import {
    Row,
    Col,
    Form,
    Input,
    Button,
    Typography,
    message,
    Image
} from 'antd';
import { useState } from "react";
import { getHistoryOrder } from '../utils';

const { Title } = Typography;

function Info({ orderInfo }) {
    let formRef = React.createRef();

    const [loading, setLoading] = useState(false);

    const back = () => {
        setLoading(true);

        try {
            alert("Back!!!");
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const next = async () => {
        const formInstance = formRef.current;

        try {
            await formInstance.validateFields();
        } catch (error) {
            return;
        }

        setLoading(true);

        try {
            alert("Next!!!");
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const onFinish = () => {
        console.log('Finish form');
    };

    return (
        <>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 20,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                ref={formRef}
            >
                <Title level={3}>Enter Shipper Info</Title>
                <Form.Item
                    label="First Name"
                    name="ShipperFirstName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the first name!',
                        },
                    ]}
                >
                    <Input placeholder="Please input shipper's first name" />
                </Form.Item>
                <Form.Item
                    label="Last Name"
                    name="ShipperLastName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the last name!',
                        },
                    ]}
                >
                    <Input placeholder="Please input shipper's last name" />
                </Form.Item>
                <Title level={3}>Enter Recipient Info</Title>
                <Form.Item
                    label="First Name"
                    name="RecipientFirstName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the first name!',
                        },
                    ]}
                >
                    <Input placeholder="Please input recipient's first name" />
                </Form.Item>
                <Form.Item
                    label="Last Name"
                    name="RecipientLastName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the last name!',
                        },
                    ]}
                >
                    <Input placeholder="Please input recipient's last name" />
                </Form.Item>
                <OrdSummary orderInfo={orderInfo} />
            </Form>
            <h1>
                <Button
                    onClick={back}
                    disabled={loading}
                    type="primary"
                >
                    Back
                </Button>
                <Button
                    onClick={next}
                    disabled={loading}
                    type="primary"
                >
                    Next
                </Button>
            </h1>
        </>
    );
};

class OrdSummary extends React.Component {
    state = {
        loading: false,
    };

    fee = this.props.orderInfo.price;
    tax = this.fee * 0.06625;
    total = this.fee + this.tax;

    onFinish = (values) => {
        console.log('Success:', values);
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        return (
            <>
                <Form
                    name="basic"
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    autoComplete="off"
                >
                    <Title level={3}>Order Summary</Title>
                    <Form>
                        <p>Delivery Fee: {this.fee.toFixed(2)}$</p>
                        <p>Eximated Tax Collected: {this.tax.toFixed(2)}$</p>
                        <p>Order Total: {this.total.toFixed(2)}$</p>
                    </Form>
                </Form>
            </>
        )
    }
}

class RouteMap extends React.Component {
    render() {
        return (
            <Image
                width={550}
                src={`https://www.mapquestapi.com/staticmap/v5/map?start=${this.props.orderInfo.sending_address}&end=${this.props.orderInfo.receiving_address}&size=@2x&key=xAGEknEZgp2cweVEAI9RGBYxwGU88prC`}
            />
        )
    }
}

class PlaceOrderPage extends React.Component {
    render() {
        let orderInfosLength = this.props.orderInfos.length;
        return (
            <Row className='main'>
                <Col span={11} className="left-side">
                    <Info orderInfo={this.props.orderInfos[orderInfosLength - 1]} />
                </Col>
                <Col span={13} className="right-side">
                    <RouteMap orderInfo={this.props.orderInfos[orderInfosLength - 1]} />
                </Col>
            </Row>
        );
    }
}

export default PlaceOrderPage;