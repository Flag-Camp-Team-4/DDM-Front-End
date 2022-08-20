const domain = ""

export const login = (credential, asStaff) => {
    const loginUrl = `${domain}/authenticate/${asStaff ? "staff" : "user"}`;
    return fetch(loginUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
    }).then((response) => {
        if (response.status !== 200) {
            throw Error("Fail to log in");
        }
        return response.json();
    });
};

export const register = (credential, asStaff) => {
    const registerUrl = `${domain}/register/${asStaff ? "staff" : "user"}`;
    return fetch(registerUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
    }).then((response) => {
        if (response.status !== 200) {
            throw Error("Fail to register");
        }
    });
};


export const trackOrder = (order) => {
    const trackingResultUrl = `${domain}/track/${order.trackId}`;

    return fetch(trackingResultUrl, {
    }).then((response) => {
        if (response.status !== 200) {
            throw Error("Fail to track this order");
        }
        return response.json();
    });
};

export const getOrderSum = (trackId) => {
    const sumUrl = `${domain}/track/${trackId}`;

    return fetch(sumUrl, {
    }).then((response) => {
        if (response.status !== 200) {
            throw Error("Fail to fetch order summary");
        }
        return response.json();
    });
};

export const getRouteImg = (address) => {
    const mapquestUrl = `https://www.mapquestapi.com/staticmap/v5/map?start=${address.sending_address}&end=${address.receiving_address}&key=xAGEknEZgp2cweVEAI9RGBYxwGU88prC`; 

    return mapquestUrl; 
}

export const submitOrder = (data, deviceType) => {
    const authToken = localStorage.getItem("authToken");
    const orderGenUrl = `${domain}/order/${deviceType}`;

    return fetch(orderGenUrl, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then((response) => {
        if (response.status === 500) {
            throw Error(`No ${deviceType} available nearby`)
        }
        if (response.status !== 200) {
            throw Error("Fail to submit the order");
        }
        return response.json(); 
    });
}

export const getEta = (info) => {
    const authToken = localStorage.getItem("authToken"); 
    const getSumUrl = 
    `${domain}/order/generate?sending_address=${info.sending_address}
    &receiving_address=${info.receiving_address}&weight=${info.weight}`; 
    return fetch(getSumUrl, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }, 
    }).then((response) => {
        if (response.status !== 200) {
            throw Error("Fail to get estimation information"); 
        }
        return response.json(); 
    }); 
}

export const getHistoryOrder = () => {
    const authToken = localStorage.getItem("authToken");
    const getHistoryOrderUrl = `${domain}/user/historyorders`;

    return fetch(getHistoryOrderUrl, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        }
    }).then((response) => {
        if (response.status !== 200) {
            throw Error("Fail to get order History");
        }
        return response.json();
    })
}



