import React from "react";
import 'antd/dist/antd.css';
import { Tabs, Button, Form, Input, message, List, InputNumber, Space, Checkbox, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import { login, register, trackAsGuest, trackOrder } from "../utils";
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
    render() {
        return (
            <div>
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
            const resp = await trackAsGuest(trackId);
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
        var result = [];
        for(var i in data) {
            result.push(data[i]);
        }
        return (
            <div style={{ margin: "auto", textAlign: "center" }}>
                <Form
                    onFinish={this.track}>
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
                    title={`Track Number: ${result[0]}`}
                    style={{ width: "90%", margin: "auto" }}>
                    <p> Weight: {result[1]}</p>
                    <p> Price: {result[2]}</p>
                    <p> Sending Address: {result[3]}</p>
                    <p> Receiving Address: {result[4]}</p>
                    <p> Order: {result[5]}</p>
                </Card>
                {/* <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 3,
                        md: 3,
                        lg: 3,
                        xl: 4,
                        xxl: 4,
                    }}
                    loading={loading}
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                            <Card>
                                title={<Text>Tracking Number: {item.trackId}</Text>}
                                description={
                                    <>
                                        <Text>Sending Address: {item.sendingAddress}</Text>
                                        <br />
                                        <Text>Receiving Address: {item.receivingAddress}</Text>
                                    </>
                                }
                            </Card>
                        </List.Item>
                    )}
                /> */}

            </div>
        );
    }
}

// class LogRegForm extends React.Component {


//     render() {
//         return (
            
//         )
//     }
// }

export default LoginPage;

