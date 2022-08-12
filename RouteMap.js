import { React } from "react";
import { Image } from 'antd';

class RouteMap extends React.Component {
    render() {
        return (
            <Image
                width={550}
                // 从父component传入order的信息
                src={`https://www.mapquestapi.com/staticmap/v5/map?start=${this.props.orderInfo.sending_address}&end=${this.props.orderInfo.receiving_address}&size=@2x&key=xAGEknEZgp2cweVEAI9RGBYxwGU88prC`}
            />
        )
    }
}

export default RouteMap;