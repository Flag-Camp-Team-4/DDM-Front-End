// import 'antd/dist/antd.css';
import React from "react";
import { message, InputNumber, Button, Form, Input, Radio, Card, Image, Spin } from "antd";
import { submitOrder, getEta, getRouteImg, getOrderSum } from "../utils";
import OrderReview from "./OrderReview";

class Ship extends React.Component {

    state = {
        etsLoading: false,
        subLoading: false,
        etsSubmited: false,
        submited: false,
        tracked: false,
        addrInfo: [],
    };

    handleRadioOnChange = (e) => {
        this.setState({
            deviceType: e.target.value
        })
    }

    handleGetEta = async (values) => {
        this.setState({
            etsLoading: true,
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
                etsSubmited: true,
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
                etsLoading: false
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

    handleSubmit = async () => {
        const data = this.state.addrInfo;
        this.setState({
            subLoading: true,
        });
        try {
            const trackNum = await submitOrder({
                sending_address: data.sending_address,
                receiving_address: data.receiving_address,
                weight: data.weight,
            }, this.state.deviceType);
            message.success("Successfully submitted order. ");
            this.setState({
                trackNum: trackNum,
                submited: true,
            })

        } catch (error) {
            message.error(error.message);

        } finally {
            this.setState({
                subLoading: false
            });
        }
    };

    handleGetSum = async (trackId) => {
        try {
            const resp = await getOrderSum(trackId);
            this.setState({
                trackData: resp,
                tracked: true,
            });
        } catch (error) {
            message.error(error.message);
        }
    };

    handleReload = async () => {
        window.location.reload();
    }

    render() {
        const { data, imgData, etsSubmited, submited, tracked, trackNum, trackData } = this.state;
        var pickUpTime = [];
        var deliveryTime = [];
        var cost = [];
        var imgSrc = imgData;

        // var track_num = trackNum; 
        var trackResult = [];
        for (var i in trackData) {
            trackResult.push(trackData[i]);
        }

        if (data !== undefined) {
            pickUpTime = data.pick_up_time;
            deliveryTime = data.delivery_time;
            cost = data.cost;
        }

        if (etsSubmited === false) {
            return (
                <div>
                    <h2 style={{ textAlign: "center" }}>Get Estimation</h2>
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
                                loading={this.state.etsLoading}
                            >
                                Get ETA
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            )
        } else if (submited === false && etsSubmited === true) {
            return (
                <div>
                    <div>
                        <h2 style={{ textAlign: "center" }}>Get Estimation</h2>
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
                                    }
                                ]}
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
                                    }
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
                                    }
                                ]}
                            >
                                <InputNumber />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    id='getEtaBtn'
                                    type="primary"
                                    htmlType="submit"
                                    loading={this.state.etsLoading}
                                >
                                    Get ETA
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>

                    {/* ETA display card */}
                    <Card
                        loading={this.state.etsLoading}
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
                        <Form.Item
                            rules={[{
                                required: true,
                            }]}
                        >
                            <Radio.Group onChange={this.handleRadioOnChange}>
                                <Radio value={"ROBOT"}>Robot</Radio>
                                <Radio value={"DRONE"}>Drone</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={this.state.subLoading}
                            >
                                Place Order
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            );
        }
        else if (submited === true && tracked === false) {
            this.handleGetSum(trackNum);
            return (
                <div style={{ textAlign: "center" }}>
                    <Spin />
                </div>
            )
        } else if (tracked === true) {
            return (
                <div>
                    <Card
                        // loading={loading}
                        title={"Order Summary"}
                        style={{ width: "75%", margin: "auto" }}>
                        <p> Track Number: </p>
                        <p style={{ color: "#b00000", fontWeight: "bold" }}>{trackResult[0]}</p>
                        <p> Weight: {trackResult[1]}</p>
                        <p> Price: {trackResult[2]}</p>
                        <p> Sending Address: {trackResult[3]}</p>
                        <p> Receiving Address: {trackResult[4]}</p>
                        <p> Order: {trackResult[6]}</p>
                    </Card>
                    <br />
                    <div style={{ margin: "auto", width: "75%", textAlign: "center" }}>
                        <Button
                            type="primary"
                            onClick={this.handleReload}
                        >
                            Back to Home
                        </Button>
                    </div>
                    <br />
                </div>
            )
        }

    }
}


export default Ship; 
