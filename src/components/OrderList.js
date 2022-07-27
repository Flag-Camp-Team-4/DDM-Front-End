// import { Header } from "antd/lib/layout/layout";
import React from "react";
import {Input, Button} from "antd";
const { Search } = Input;


class OrderList extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }
    
    
    clickOrderHistory = () => {
        this.setState({
            loading: true
        })
    }

    //find the tracking number from the database
    handleSearch = (value, event) => {
        if(event) {
            console.log(value);
        }
        
    }

    render() {
        const clickOrder = this.state.loading;
        let search;
        if(clickOrder) {
            search = <Search 
                        addonBefore = "Your Order"
                        placeholder="Please Input Your Tracking Number"
                        enterButton="search"
                        size="large"
                        onSearch={this.handleSearch}
                        style={{
                            height: 400,
                            width: 600,
                        }}
                    />
        }
        return(
        <>
            <Button
                onClick={this.clickOrderHistory}
                style={{ marginLeft: '700px' }}
            >
                Order History
            </Button>
            
            <div style={{width:1000, margin: "100px auto"}}>
                {search}
            </div> 
            
        </>
             
        );
    }
}

export default OrderList;