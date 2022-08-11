const domain = "http://localhost:8080";

export const getOrder = async (trackId) => {
    const listCostUrl = `${domain}/track/${trackId}`;

    const response = await fetch(listCostUrl);
    if (response.status !== 200) {
        throw Error("Fail to get order");
    }
    return await response.json();
};

export const getDevice = async (stationId, deviceType) => {
    const authToken = localStorage.getItem("authToken");
    const listCostUrl = `${domain}/order/search/device/${stationId}/${deviceType}`;

    const response = await fetch(listCostUrl, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
    if (response.status !== 200) {
        throw Error("Fail to get device");
    }
    return await response.json();
};


export const getCost = async (lon1, lat1, lon2, lat2, weight, size, device) => {
    const authToken = localStorage.getItem("authToken");
    const listCostUrl = `${domain}/device/${lon1}/${lat1}/${lon2}/${lat2}/${weight}/${size}/${device}`;

    const response = await fetch(listCostUrl, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
    if (response.status !== 200) {
        throw Error("Fail to get order cost");
    }
    return await response.json();
};

export const getOrderHistory = () => {
    const authToken = localStorage.getItem("authToken"); 
    const orderHistoryUrl = `${domain}/user/historyorders`;

    return fetch(orderHistoryUrl,  {
        headers: {
            Authorization: `Bearer ${authToken}`
        }, 
    }).then((response) => {
        if (response.status !== 200) {
            throw Error("Fail to track this order");
        }
        return response.json();
    });
};


