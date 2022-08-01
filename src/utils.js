const domoain = "http://localhost:8080"

export const login = (credential, asHost) => {
    const loginUrl = `${domain}/authenticate/${asHost ? "user" : "staff"}`;
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
  
  export const register = (credential, asHost) => {
    const registerUrl = `${domain}/register/${asHost ? "user" : "staff"}`;
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
