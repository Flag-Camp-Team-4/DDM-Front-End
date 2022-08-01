import { React, useRef } from "react";
import 'antd/dist/antd.css';
import { Tabs, Button, Form, Input } from "antd";


const { TabPane } = Tabs;

const onChange = (key) => {
    console.log(key);
};

// const navigate = useNavigate();

const Home = ({ isLoggedIn }) => {
    const reg = useRef(null).className;
    return (
        <main style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", width: "50%", margin: "auto" }}>
            <Tabs
                defaultActiveKey="1"
                onChange={onChange}
                size="large"
                centered
            >
                <TabPane tab="Track" key="1">

                    {/* Track order */}
                    <Form
                        name="trackNum"
                        style={{ width: "50%", margin: "auto" }}>
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
                </TabPane>
                <TabPane tab="Ship" key="2" className="shipForm">

                    {/* From address */}
                    <h2 style={{ marginLeft: "12.5%" }}>From</h2>
                    <Form
                        name="shipping_info"
                        style={{ width: "75%", margin: "auto" }}>
                        <Form.Item
                            label="Street Address"
                            name="st_addr_from"
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
                            name="st_addr_to"
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
                        <Form.Item
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
                        </Form.Item>
                        <Form.Item
                            label="Weight (lb)"
                            name="weight"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input package weight. "
                                },
                            ]}>
                            <Input />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" >
                                Submit
                            </Button>
                        </Form.Item>

                    </Form>
                </TabPane>
            </Tabs>
        </main>
    )
}

export default Home; 
