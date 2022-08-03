const SERVER_ORIGIN = "http://localhost:8080"; 

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
    // searchUrl.searchParams.append("track_id", query.track_id);
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

export const demo = (query) => {
    const url = new URL(`https://newsapi.org/v2/everything?`);
    url.searchParams.append("q",query.q);
    url.searchParams.append("from", "2022-07-29");
    url.searchParams.append("to", "2022-07-29");
    url.searchParams.append("sortedBy", "popularity");
    // const url = `https://newsapi.org/v2/everything?q=tesla&from=2022-06-29&sortBy=publishedAt&apiKey=4e665b8aad5d45ee884891dacb7ad64a`
    return fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer 4e665b8aad5d45ee884891dacb7ad64a`
        }
        
    }).then((response) => {
        if(response.status !== 200) {
            throw Error("Fail to get the news");
        }
        return response.json();
    })
}