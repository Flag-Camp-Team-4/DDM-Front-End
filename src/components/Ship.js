import 'antd/dist/antd.css';
import React from "react";
import { message, InputNumber, Button, Form, Input, Radio, Card, Image } from "antd";
import { submitOrder, getEta, getRouteImg } from "../utils";

class Ship extends React.Component {

    state = {
        loading: false
    };

    handleRadioOnChange = (e) => {
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
        var sendAddr = "";
        var receAddr = "";
        var weight = 0;

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
                imgData: imgResp
            });

            sendAddr = values.sending_address;
            receAddr = values.receiving_address;
            weight = values.weight;
            var packageInfo = [sendAddr, receAddr, weight];

        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false
            });
        }
        return packageInfo;
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
        console.log(imgSrc);

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
                <div>
                    <Card
                        loading={loading}
                        title={"Shipping Estimation"}
                        style={{
                            width: "75%",
                            margin: "auto",
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between"}}>
                            <div>
                                <h3 style={{ color: "#002f80" }}>Robot</h3>
                                <p>Delivery time ETA: {this.hourMinutesTime(deliveryTime[0])}</p>
                                <p>Pick up time ETA: {this.hourMinutesTime(pickUpTime[0])}</p>
                                <p>Cost: {cost[0]}</p>

                                <h3 style={{ color: "#704000" }}>Drone</h3>
                                <p>Delivery time ETA: {this.hourMinutesTime(deliveryTime[1])}</p>
                                <p>Pick up time ETA: {this.hourMinutesTime(pickUpTime[1])}</p>
                                <p>Cost: {cost[1]}</p>
                            </div>
                            <div>
                                <Image
                                    width={270}
                                    // height={500}
                                    // 从父component传入order的信息
                                    src={imgSrc}
                                />
                            </div>
                        </div>
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
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        );
    }
}

export default Ship; 
