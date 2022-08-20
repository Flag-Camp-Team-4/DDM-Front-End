import 'antd/dist/antd.css';
import React from "react";
import { Button, Form, message, InputNumber, Card } from "antd";
import { trackOrder } from "../utils";

class Track extends React.Component {
    state = {
        data: [],
        loading: false,
        tracked: false,
    }

    track = async (trackId) => {
        this.setState({
            loading: true,
        });

        try {
            const resp = await trackOrder(trackId);
            this.setState({
                data: resp,
                tracked: true,
            });
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            })
        }
    };

    render() {
        const { data, loading, tracked } = this.state;
        var trackResult = [];
        for (var i in data) {
            trackResult.push(data[i]);
        }

        if (tracked === false) {
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
                    <br />
                </div>
            );
        }

        else {
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
                        <p> Status: {trackResult[5]}</p>
                        <p> Track Number: {trackResult[0]}</p>
                        <p> Weight: {trackResult[1]}</p>
                        <p> Price: {trackResult[2]}</p>
                        <p> Sending Address: {trackResult[3]}</p>
                        <p> Receiving Address: {trackResult[4]}</p>
                        <p> Order: {trackResult[6]}</p>
                    </Card>
                    <br />
                </div>
            );
        }
    }
}

export default Track; 