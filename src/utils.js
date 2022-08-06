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
    const authToken = localStorage.getItem("authToken"); 
    const trackingResultUrl = `${domain}/track/${order.trackId}`; 

    return fetch(trackingResultUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`, 
      }, 
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to track this order"); 
      }
      return response.json(); 
    }); 
  }; 

  export const trackAsGuest = (order) => {
    const trackingResultUrl = `${domain}/track/${order.trackId}`; 

    return fetch(trackingResultUrl, {
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to track this order"); 
      }
      return response.json(); 
    });  
  }

