import axios from "axios";

class Auth {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_API_URI,
      withCredentials: true,
    });
  }
  signup({ email, password }) {
    return this.auth
      .post("/signup", { email, password })
      .then(({ data }) => data);
  }

  login({ email, password }) {
    return this.auth
      .post("/login", { email, password })
      .then(({ data }) => data);
  }

  logout() {
    return this.auth.post("/logout", {}).then(({ data }) => data);
  }


  perfil() {
    return this.auth.get("/perfil").then(({ data }) => data);
  }
  
}

const axiosRequestFunctions = new Auth();

export default axiosRequestFunctions;
