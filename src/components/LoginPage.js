import React from "react";
import 'antd/dist/antd.css';
import { Tabs, Button, Form, Input, message, InputNumber, Space, Checkbox, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { login, register, trackOrder } from "../utils";
const { TabPane } = Tabs;

const onChange = (key) => {
    console.log(key);
};

class LoginPage extends React.Component {
    formRef = React.createRef();
    state = {
        asStaff: false,
        loading: false,
    };

    onFinish = () => {
        console.log("finish form");
    };

    handleLogin = async () => {
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
            const { asStaff: asStaff } = this.state;
            const resp = await login(formInstance.getFieldsValue(true), asStaff);
            this.props.handleLoginSuccess(resp.token, asStaff);
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    };

    handleRegister = async () => {
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
            await register(formInstance.getFieldsValue(true), this.state.asStaff);
            message.success("Register Successfully");
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    };

    handleCheckboxOnChange = (e) => {
        this.setState({
            asStaff: e.target.checked,
        });
    };

    // Login page render
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
                            <TrackForm />
                        </TabPane>
                        <TabPane tab="Login/Register" key="2" className="logRegForm">

                            {/* From address */}
                            {/* <LogRegForm /> */}
                            <div style={{ width: 500, margin: "auto" }} className="forms">
                                <Form ref={this.formRef} onFinish={this.onFinish}>
                                    <Form.Item
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input your Username!",
                                            },
                                        ]}
                                    >
                                        <Input
                                            disabled={this.state.loading}
                                            prefix={<UserOutlined className="site-form-item-icon" />}
                                            placeholder="Username"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input your Password!",
                                            },
                                        ]}
                                    >
                                        <Input.Password
                                            disabled={this.state.loading}
                                            placeholder="Password"
                                        />
                                    </Form.Item>
                                </Form>
                                <Space>
                                    <Checkbox
                                        disabled={this.state.loading}
                                        checked={this.state.asStaff}
                                        onChange={this.handleCheckboxOnChange}
                                    >
                                        Staff Login
                                    </Checkbox>
                                    <Button
                                        onClick={this.handleLogin}
                                        disabled={this.state.loading}
                                        type="primary"
                                    >
                                        Log in
                                    </Button>
                                    <Button
                                        onClick={this.handleRegister}
                                        disabled={this.state.loading}
                                        type="primary"
                                    >
                                        Register
                                    </Button>
                                </Space>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </main>
        );
    }
}

class TrackForm extends React.Component {
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

                <Card
                    loading={loading}
                    title={"Tracking Result"}
                    style={{ width: "90%", margin: "auto" }}>
                    <p> Tracking Number: {trackResult[0]}</p>
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

export default LoginPage;

