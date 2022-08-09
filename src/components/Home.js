import React from "react";
import 'antd/dist/antd.css';
import { Tabs, Button, Form, Input, message, InputNumber, Card } from "antd";
import { trackOrder, submitOrder } from "../utils";

const { TabPane } = Tabs;

const onChange = (key) => {
    console.log(key);
};


class Home extends React.Component {
    render() {
        return (
            <main>
                <br />
                <div style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", width: "50%", margin: "auto" }}>
                    <Tabs
                        defaultActiveKey="1"
                        onChange={onChange}
                        size="large"
                        centered
                    >
                        <TabPane tab="Track" key="1">

                            {/* Track order */}
                            <Track />
                        </TabPane>
                        <TabPane tab="Ship" key="2" className="shipForm">

                            {/* From address */}
                            <Ship />
                        </TabPane>
                    </Tabs>
                </div>
            </main>
        );
    }
}


class Track extends React.Component {
    state = {
        data: [],
        loading: false,
    }

    track = async (trackId) => {
        this.setState({
            loading: true,
        });

        try {
            const resp = await trackOrder(trackId);
            this.setState({
                data: resp,
            });
            console.log(this.state.data);
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            })
        }
    };

    render() {
        const { data, loading } = this.state;
        var trackResult = [];
        for (var i in data) {
            trackResult.push(data[i]);
        }
        // const weight = Json.
        return (
            <div style={{ width: "75%", margin: "auto" }}>
                <Form
                    onFinish={this.track}
                    style={{ textAlign: "center" }}>
                    <Form.Item
                        name="trackId"
                        rules={[
                            {
                                required: true,
                                message: "Please input tracking number. "
                            },
                        ]}>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            loading={loading}
                            type="primary"
                            htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

                {/* Tracking Results */}
                <Card
                    loading={loading}
                    title={"Track Result"}
                    style={{ width: "90%", margin: "auto" }}>
                    <p> Track Number: {trackResult[0]}</p>
                    <p> Weight: {trackResult[1]}</p>
                    <p> Price: {trackResult[2]}</p>
                    <p> Sending Address: {trackResult[3]}</p>
                    <p> Receiving Address: {trackResult[4]}</p>
                    <p> Order: {trackResult[5]}</p>
                </Card>
                <br />
            </div>
        );
    }
}


class Ship extends React.Component {
    state = {
        loading: false,
    };

    handleSubmit = async (values) => {
        const {order} = this.props; 
        this.setState({
            loading: true,
        });
        try {
            await submitOrder({
                sending_address: values.sending_address, 
                receiving_address: values.receiving_address, 
                weight: values.weight
            });
            message.success("Successfully submitted order");
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false
            });
        }
    };

    render() {
        return (
            <div>
                <h2 style={{ marginLeft: "12.5%" }}>From</h2>
                <Form
                    name="nest-messages"
                    onFinish={this.handleSubmit}
                    style={{ width: "75%", margin: "auto" }}>
                    <Form.Item
                        name="sending_address"
                        label="Street Address"
                        rules={[
                            {
                                required: true,
                                message: "Please input street address. "
                            }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Suite, Apt, etc"
                        name="suite_apt_from"
                        rules={[
                            {
                                required: false,
                            },
                        ]}>
                        <Input />
                    </Form.Item>

                    {/* To address */}
                    <h2>To</h2>
                    <Form.Item
                        label="Street Address"
                        name="receiving_address"
                        rules={[
                            {
                                required: true,
                                message: "Please input street address. "
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Suite, Apt, etc"
                        name="suite_apt_to"
                        rules={[
                            {
                                required: false,
                            },
                        ]}>
                        <Input />
                    </Form.Item>

                    {/* Package Info */}
                    <h2>Package Info</h2>
                    {/* <Form.Item
                        label="Length (inch)"
                        name="length"
                        rules={[
                            {
                                required: true,
                                message: "Please input package length. "
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Width (inch)"
                        name="width"
                        rules={[
                            {
                                required: true,
                                message: "Please input package width. "
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Height (inch)"
                        name="height"
                        rules={[
                            {
                                required: true,
                                message: "Please input package height. "
                            },
                        ]}>
                        <Input />
                    </Form.Item>  */}
                    <Form.Item
                        label="Weight (lb)"
                        name="weight"
                        rules={[
                            {
                                required: true,
                                type: "number",
                                message: "Please input package weight. "
                            },
                        ]}>
                        <InputNumber />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={this.state.loading}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}


export default Home; 
