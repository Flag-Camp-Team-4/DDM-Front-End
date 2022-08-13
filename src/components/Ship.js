// import 'antd/dist/antd.css';
import React from "react";
import { message, InputNumber, Button, Form, Input, Radio, Card, Image } from "antd";
import { submitOrder, getEta, getRouteImg } from "../utils";

class Ship extends React.Component {

    state = {
        loading: false, 
        addrInfo: [], 
    };

    handleRadioOnChange = (e) => {
        this.setState({
            deviceType: e.target.value
        })
    }

    handleGetEta = async (values) => {
        this.setState({
            loading: true,
        });

        try {
            const resp = await getEta({
                sending_address: values.sending_address,
                receiving_address: values.receiving_address,
                weight: values.weight,
            });

            const imgResp = await getRouteImg({
                sending_address: values.sending_address,
                receiving_address: values.receiving_address,
            });

            this.setState({
                data: resp,
                imgData: imgResp, 
                addrInfo: {
                    sending_address: values.sending_address, 
                    receiving_address: values.receiving_address, 
                    weight: values.weight, 
                }, 
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

    handleSubmit = async (values) => {
        const data = this.state.addrInfo; 
        this.setState({
            loading: true,
        });
        try {
            await submitOrder({
                sending_address: data.sending_address,
                receiving_address: data.receiving_address,
                weight: data.weight, 
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
        const { data, imgData, loading } = this.state;
        var pickUpTime = [];
        var deliveryTime = [];
        var cost = [];
        var imgSrc = imgData;

        if (data !== undefined) {
            pickUpTime = data.pick_up_time;
            deliveryTime = data.delivery_time;
            cost = data.cost;
        }

        return (
            <div>
                <div>
                    <h2 style={{ textAlign: "center" }}>Shipping Estimation Wizard</h2>
                    <Form
                        name="nest-messages"
                        onFinish={this.handleGetEta}
                        style={{ width: "75%", margin: "auto" }}
                    >
                        <h3>From</h3>
                        <Form.Item
                            name="sending_address"
                            label="Street Address"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input street address. "
                                }]}
                        >
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
                            ]}
                        >
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
                            ]}
                        >
                            <InputNumber />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                id='getEtaBtn'
                                type="primary"
                                htmlType="submit"
                                loading={this.state.loading}
                            >
                                Get ETA
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

                {/* ETA display card */}
                    <Card
                        loading={loading}
                        title={"Shipping Estimation"}
                        style={{
                            width: "75%",
                            margin: "auto",
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <h3 style={{ color: "#002f80" }}>Robot</h3>
                                <p>Delivery ETA: {this.hourMinutesTime(deliveryTime[0])}</p>
                                <p>Pick up ETA: {this.hourMinutesTime(pickUpTime[0])}</p>
                                <p>Cost: {cost[0]}</p>

                                <h3 style={{ color: "#704000" }}>Drone</h3>
                                <p>Delivery ETA: {this.hourMinutesTime(deliveryTime[1])}</p>
                                <p>Pick up ETA: {this.hourMinutesTime(pickUpTime[1])}</p>
                                <p>Cost: {cost[1]}</p>
                            </div>
                            <div>
                                <Image
                                    width={270}
                                    src={imgSrc}
                                />
                            </div>
                        </div>
                    </Card>
                <br />

                <h2 style={{ textAlign: "center" }}>Select Your Delivery Method</h2>
                <Form
                    onFinish={this.handleSubmit}
                    style={{ width: "75%", margin: "auto" }}
                    >                    
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
                            loading={this.state.loading}
                        >
                            Place Order
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}


export default Ship; 
