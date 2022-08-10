import 'antd/dist/antd.css';
import React from "react";
import { message, InputNumber, Button, Form, Input, Radio } from "antd";
import { submitOrder } from "../utils";

class Ship extends React.Component {
    
    state = {
        loading: false,
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
