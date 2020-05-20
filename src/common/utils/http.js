import axios from "axios";
import config from "../../../config";
import app from "../../main";

// 임시코드
axios.defaults.headers.common['x-access-token'] = config.temporaryAccessToken;

const instance = axios.create({
  baseURL: config.serverBaseUrl,
  withCredentials: true
});

function create(axiosInstance) {
  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 403) {
        app.removeCookie("access_token");
        delete axiosInstance.defaults.headers.common["Authorization"];
      }
      return Promise.reject(error);
    }
  );
}

create(instance);

export default instance;
