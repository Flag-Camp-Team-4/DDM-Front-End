import 'antd/dist/antd.css';
import React from "react";
import { Tabs, Button, Form, Input, message, InputNumber, Card, Radio } from "antd";
import { trackOrder, submitOrder } from "../utils";
import Track from './Track'; 
import Ship from './Ship'; 

const { TabPane } = Tabs;

const onChange = (key) => {
    console.log(key);
};

class Home extends React.Component {
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
                            <Track />
                        </TabPane>
                        <TabPane tab="Ship" key="2" className="shipForm">
                            {/* From address */}
                            <Ship />
                        </TabPane>
                    </Tabs>
                </div>
            </main>
        );
    }
}

export default Home; 
