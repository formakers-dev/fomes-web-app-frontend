import axios from "axios";
import config from "../../../config";

const instance = axios.create({
  baseURL: config.serverBaseUrl,
  withCredentials: true
});

function create(axiosInstance) {
  axiosInstance.interceptors.response.use(
    response => {
      if(response.request.responseURL.indexOf('/user/signIn') > -1){
        const accessToken = response.data.accessToken;
        axiosInstance.defaults.headers.common['x-access-token'] = accessToken;
        return response;
      }

      return response;
    },
    error => {
      if (error.response.status === 403) {
        delete axiosInstance.defaults.headers.common['x-access-token'];
      }
      return Promise.reject(error);
    }
  );

  //로그 아웃 관련 임시 반영
  axiosInstance.deleteTokenHeader = () => {
    delete axiosInstance.defaults.headers.common['x-access-token'];
  };
}

create(instance);

export default instance;
