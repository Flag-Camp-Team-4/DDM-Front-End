// import { Header } from "antd/lib/layout/layout";
import React from "react";
import {Input, Button, message, List, Skeleton, Divider, Typography} from "antd";
import {demo, getOrderHistory } from "../utils";
import InfiniteScroll from 'react-infinite-scroll-component';
import Demo from "./Demo";
const { Search } = Input;
const {Text} = Typography;

class SearchOrder extends React.Component {
    state = {
        loading: false,
        search: false,
        data: []
    }

    handleDisplay = () => {
        this.setState({
            loading: true
        });
    }

    handleSearch = async (query) => {
        
        this.setState({
            search:true,
        });
        try {
            const resp =  await demo(query);
            this.setState({
                data: resp,
            });    
            console.log(resp);
        } catch (error) {
            message.error(error.message);
        } finally{
            this.setState({
                search: false
            });
        }
            
        
    }
    render() {
        const {data} = this.state;
        // console.log(data);
        return(
           
            <>
                <div style={{width:1000, margin: "100px auto"}} >
                    <Search 
                        addonBefore = "Your Order"
                        placeholder="Please Input Your Tracking Number"
                        enterButton="search"
                        size="large"
                        allowClear
                        onSearch={this.handleSearch}
                        style={{
                            height: 0,
                            width: 600,
                        }}
                        loading={this.state.search}
                    />
                    
                    <div
                        id="scrollableDiv"
                        style={{
                            height: 400,
                            overflow: 'auto',
                            padding: '0 16px',
                            border: '1px solid rgba(140, 140, 140, 0.35)',
                        }}
                    >
                        <InfiniteScroll
                            dataLength={data.length}
                            hasMore={data.length < 50}
                            loader={
                            <Skeleton
                                avatar
                                paragraph={{
                                rows: 1,
                                }}
                                active
                            />
                            }
                            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                            scrollableTarget="scrollableDiv"
                        >
                        <List
                            dataSource={data}
                            // renderItem={(item) => (
                            //     <List.Item key={item.source}>
                            //     <List.Item.Meta
                            //         title={<a href="https://ant.design">{item.name.last}</a>}
                            //         description={item.email}
                            //     />
                            //     <div>Content</div>
                            //     </List.Item>
                            // )}
                        />
                    </InfiniteScroll>
                    </div>
                    
                </div>
            </>
        );
    }
};

class OrderHistoryButton extends React.Component {
    

    state = {
        loading: false,
        click: false,
        data:[]
    }

    loadData = async() => {
        const {onGetOrderHistorySuccess} = this.props;
        this.setState({
            loading: true
        })
        try {
            const resp = await getOrderHistory();
            this.setState({
                data: resp
            });
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false
            });
        }
        onGetOrderHistorySuccess();
    }

    handleClick = () => {
        this.setState({
            click: true
        })
    }

    render() {
        const {click} = this.state;
        
        return(
            <>
                <Button
                    loading={this.state.loading} 
                    onClick={this.handleClick}

                    style={{ marginLeft: '700px' }}
                >
                    Order History
                </Button> 
                <SearchOrder/>
                {click && <Demo/>}
                
            </>
        );
    }
};

class MyOrderHistory extends React.Component {
    state = {
        loading: false,
        data: []
    }
    loadData = async() => {
        this.setState({
            loading: true
        })
        try {
            const resp = await getOrderHistory();
            this.setState({
                data: resp
            })
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false
            })
        }
        console.log("abc");
    };

    render() {
        return(
            <List
                style={{width: 550, margin: "0px"}}
                loading={this.state.loading}
                dataSource={this.state.data}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            title={<Text>{item.order.track_id}</Text>}
                            description={
                                <>
                                    <Text>{item.receiving_address}</Text>
                                    {/* <br />
                                    <Text>Checkout Date: {item.checkout_date}</Text> */}
                                    <div>
                                        <Button>View Detail</Button>
                                    </div>
                                </>
                            }
                        />
                    </List.Item>
                )}
            />
        )
    }
}


class OrderPage extends React.Component {
    
    render() {     
        
        return(
        <>
            <OrderHistoryButton/>
        </>
             
        );
    }
}



export default OrderPage;







{/* // showList = <> */}
            //             <div
            //                 id="scrollableDiv"
            //                 style={{
            //                 height: 400,
            //                 overflow: "auto",
            //                 padding: "0 16px",
            //                 border: "1px solid rgba(140, 140, 140, 0.35)"
            //             }}
            //             ></div>
            //              <InfiniteScroll
            //                 dataLength={this.state.data.length}
            //                 next = {this.state.data}
            //                 hasMore = {true}
            //                 loader={
            //                 <Skeleton
            //                     avatar
            //                     paragraph={{
            //                         rows: 1,
            //                     }}
            //                     active
            //                 />
            //                 }
            //                 endMessage={<Divider plain>Nothing more</Divider>}
            //                 scrollbaleTarget="scrollableDiv"
            //              />
            //                 <List 
            //                     dataSource={this.state.data}
            //                     renderItem={(item) => (
            //                         <List.Item key={item.track_id}>
            //                             <List.Item.Meta
            //                                 title={<>Tracking Number: {item.name.first}</>}
            //                                 description={<>
            //                                                 <div>
            //                                                     {item.receiving_address}
            //                                                 </div>
            //                                             </>}
            //                             />
            //                             <Button onClick={this.handleView}>View Detail</Button>
            //                         </List.Item>
            //                     )}
            //                 />
            //             </>