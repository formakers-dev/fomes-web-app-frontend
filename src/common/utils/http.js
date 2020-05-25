import axios from "axios";
import config from "../../../config";

const instance = axios.create({
  baseURL: config.serverBaseUrl,
  withCredentials: true
});

function create(axiosInstance) {
  axiosInstance.interceptors.response.use(
    response => {
      if(response.request.responseURL && response.request.responseURL.indexOf('/user/signIn') > -1){
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

  axiosInstance.interceptors.request.use((config) => {
    if (config.url.indexOf('/logout') > -1) {
      // 실제 요청 없이 로그아웃 처리 위해 빈 값으로 즉시 resolve
      config.adapter = function (config) {
        return new Promise((resolve) => {
          delete axiosInstance.defaults.headers.common['x-access-token'];

          const res = {
            data: {},
            status: 200,
            statusText: "OK",
            headers: { "content-type": "text/plain; charset=utf-8" },
            config,
            request: {}
          };

          return resolve(res);
        });
      };
    }

    return {
      ...config,
      headers: {
        ...config.headers
      }
    };
  });
}

create(instance);

export default instance;
