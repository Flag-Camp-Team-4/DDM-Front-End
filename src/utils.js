// const SERVER_ORIGIN = "http://localhost:8080";
const SERVER_ORIGIN = "";  

const loginUrl = `${SERVER_ORIGIN}/login`; 
export const login = (credential) => {
    return fetch(loginUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credential)
    }).then((response) => {
        if (response.status !== 200) {
            throw Error('Fail to log in ' + response.status);
        }

        return response.json();
    })
}

const registerUrl = `${SERVER_ORIGIN}/register`;

export const register = (data) => {
    return fetch(registerUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then((response) => {
        if (response.status !== 200) {
            throw Error('Fail to register');
        }
    })
}


const logoutUrl = `${SERVER_ORIGIN}/logout`;

export const logout = () => {
    return fetch(logoutUrl, {
        method: 'POST',
        credentials: 'include',
    }).then((response) => {
        if (response.status !== 200) {
            throw Error('Fail to log out');
        }
    })
}

export const getOrderHistory = () => {

    const authToken = localStorage.getItem("authToken");
    const listOrderUrl = `{SERVER_ORIGN}/orders`
    return fetch(listOrderUrl, {
        headers: {
            Authorization: `Bearer ${authToken}` 
        }
    }).then((response) => {
        if(response.status !== 200) {
            throw Error("Fail to get the order list");
        }
        return response.json();
    });
}

export const getOrderById = (orderId) => {
    // const authToken = localStorage.getItem("authToken");
    const listOrderByIdUrl =`{SERVER_ORIGN}/track/${orderId}`;
    return fetch(listOrderByIdUrl, {
        // method: "GET",
        // headers: {
        //     Authorization: `Bearer ${authToken}`,
        // }
    }).then((response) => {
        if(response.status !== 200) {
            throw Error("Fail to get order by Id");
        }
        return response.json();
    });
};

