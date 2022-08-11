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



  export const orderReview = (orderId) => {
    const authToken = localStorage.getItem("authToken");
    const orderReviewUrl = `${domain}/order/reservations/${orderId}`;
   
    return fetch(orderReviewUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to review order");
      }
   
      return response.json();
    });
  };

  export const getOrderInfo = (trackId) => {
    const authToken = localStorage.getItem("authToken");
    const getOrderInfoUrl = `${domain}/track/{trackId.}`;
   
    return fetch(getOrderInfoUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to get order information");
      }
   
      return response.json();
    });
  };



   