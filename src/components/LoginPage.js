import React from "react";
import { Form, Button, Input, Space, Checkbox, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { login, register } from "../utils";

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
            <main className="login_page">
                <div style={{ width: 500, margin: "auto" }} className="forms">
                    <h2>Track</h2>
                    <Form name="trackNum">
                        <Form.Item
                            name="tracking_num"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input tracking number. "
                                },
                            ]}>
                            <Input placeholder="Input tracking number here" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    <br>
                    </br>
                    <h2>Login / Register</h2>
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
            </main>
        );
    }
}

export default LoginPage;
