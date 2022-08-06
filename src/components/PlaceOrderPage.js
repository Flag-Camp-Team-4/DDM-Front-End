import React from "react";
import {
    Row,
    Col,
    Form,
    Input,
    Button,
    Typography,
    List,
    message,
    Image
} from 'antd';
import { getCost } from "../utils";

const { Title, Text } = Typography;

class Info extends React.Component {
    formRef = React.createRef();

    state = {
        loading: false,
    };

    handlePrevious = () => {
        this.setState({
            loading: true,
        });

        try {
            this.props.handlePrevious();
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    };

    handleNext = async () => {
        const formInstance = this.formRef.current;

        try {
            await formInstance.validateFields();
        } catch (error) {
            return;
        }

        this.setState({
            loading: true,
        });

        try {
            this.props.handleNext();
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    };

    onFinish = () => {
        console.log('Finish form');
    };

    render() {
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
                    onFinish={this.onFinish}
                    ref={this.formRef}
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
                </Form>
                <div />
                <OrdSummary />
                <p>
                    <Button
                        onClick={this.handlePrevious}
                        disabled={this.state.loading}
                        type="primary"
                    >
                        Back
                    </Button>
                    <Button
                        onClick={this.handleNext}
                        disabled={this.state.loading}
                        type="primary"
                    >
                        Next
                    </Button>
                </p>
            </>
        );
    };
};

class OrdSummary extends React.Component {
    state = {
        loading: false,
        data: [],
    };

    componentDidMount() {
        this.loadData();
    }

    onFinish = (values) => {
        console.log('Success:', values);
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    loadData = async () => {
        this.setState({
            loading: true,
        });

        try {
            const resp = await getCost();
            this.setState({
                data: resp,
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
                    <List
                        style={{ margin: "auto" }}
                        loading={this.state.loading}
                        dataSource={this.state.data}
                        renderItem={(item) => (
                            <List.Item >
                                <List.Item.Meta
                                    title={<Text>{item.order_id}</Text>}
                                    description={
                                        <>
                                            <Text>Delivery charge: {item.delivery_charge}</Text>
                                            <br />
                                            <Text>Estimated tax: {item.estimated_tax}</Text>
                                            <br />
                                            <Text>Total including tax: {item.total}</Text>
                                        </>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </Form>
            </>
        )
    }
}

class RouteMap extends React.Component {
    // 暂略
    render() {
        return (
            <Image
                width={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
        )
    }
}

class PlaceOrderPage extends React.Component {
    render() {
        return (
            <Row className='main'>
                <Col span={10} className="left-side">
                    <Info handlePrevious={this.props.handlePrevious} handleNext={this.props.handleNext}/>
                </Col>
                <Col span={14} className="right-side">
                    <RouteMap />
                </Col>
            </Row>
        );
    }
}

export default PlaceOrderPage;