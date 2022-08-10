import 'antd/dist/antd.css';
import React, { version } from "react";
import { message, InputNumber, Button, Form, Input, Radio, Card } from "antd";
import { submitOrder, getEta } from "../utils";

class Ship extends React.Component {

    state = {
        loading: false
    };

    handleRadioOnChange = (e) => {
        // const [value, deviceType] = useState("ROBOT");
        this.setState({
            deviceType: e.target.value
        })
    }

    handleSubmit = async (values) => {
        this.setState({
            loading: true,
        });
        try {
            await submitOrder({
                sending_address: values.sending_address,
                receiving_address: values.receiving_address,
                weight: values.weight
            }, this.state.deviceType);
            message.success("Successfully submitted order");
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false
            });
        }
    };

    handleGetEta = async (values) => {
        this.setState({
            loading: true,
        });

        try {
            const resp = await getEta({
                sending_address: values.sending_address,
                receiving_address: values.receiving_address
            });
            this.setState({
                data: resp
            });
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false
            });
        }
    };

    hourMinutesTime = (minutesTime) => {
        var hour = 0;
        var minute = 0;
        hour = Math.round(minutesTime / 60);
        minute = minutesTime % 60;
        return hour + "h " + minute + "m";
    }

    getInput = async (values) => {
        var addrInput = [];
        addrInput.push(values.sending_address);
        addrInput.push(values.receiving_address);
        return addrInput;
    }


    render() {
        const { data, loading } = this.state;
        var pickUpTime = [];
        var deliveryTime = [];

        if (data !== undefined) {
            pickUpTime = data.pick_up_time;
            deliveryTime = data.delivery_time;
        }

        return (
            <div>
                <div>
                    <h2 style={{ textAlign: "center" }}>Shipping Estimation Wizard</h2>
                    <Form
                        name="nest-messages"
                        onFinish={this.handleGetEta}
                        style={{ width: "75%", margin: "auto" }}>
                        <h3>From</h3>
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

                        <h3>To</h3>
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

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={this.state.loading}>
                                Get ETA
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

                <div>
                    <Card
                        loading={loading}
                        title={"Shipping Estimation"}
                        style={{ width: "90%", margin: "auto" }}>
                        <p>Robot delivery time ETA: {this.hourMinutesTime(deliveryTime[0])}</p>
                        <p>Robot pick up time ETA: {this.hourMinutesTime(pickUpTime[0])}</p>
                        <p>Drone delivery time ETA: {this.hourMinutesTime(deliveryTime[1])}</p>
                        <p>Drone pick up time ETA: {this.hourMinutesTime(pickUpTime[1])}</p>
                    </Card>
                </div>

                <br />
                <h2 style={{ textAlign: "center" }}>Input shipping info</h2>
                <Form
                    onFinish={this.handleSubmit}
                    style={{ width: "75%", margin: "auto" }}>

                    <h3>From</h3>
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

                    <h3>To</h3>
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
                        <Radio.Group onChange={this.handleRadioOnChange}>
                            <Radio value={"ROBOT"}>Robot</Radio>
                            <Radio value={"DRONE"}>Drone</Radio>
                        </Radio.Group>
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

export default Ship; 
