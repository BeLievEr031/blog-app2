import axios from "axios";
import { getAccessToken, getType } from "../utils/common-util";
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from "../constant/config";
const axiosInstance = axios.create({
  baseURL: "http://localhost:4500",
  timeout: 10000,
  headers: {
    "content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    if (config.TYPE.params) {
      config.params = config.TYPE.params;
    } else if (config.TYPE.query) {
      config.url = config.url + "/" + config.TYPE.query;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return processResponse(response);
  },
  (err) => {
    return processError(err);
  }
);

const processResponse = (response) => {
  if (response?.status === 200) {
    return {
      isSuccess: true,
      tap: "vhjk",
      data: response.data,
    };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      msg: response?.msg,
      code: response?.code,
    };
  }
};

const processError = (err) => {
  if (err.response) {
    console.log("error--->", err.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.responseFailure,
      code: err.response.status,
    };
  } else if (err.request) {
    console.log("error--->", err.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.requestFailure,
      code: "",
    };
  } else {
    console.log("error--->", err.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.networkError,
      code: "",
    };
  }
};

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (body, showUploadProgress, showDownloadProgress) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      data: value.method === "DELETE"?{}: body,
      responseType: value.responseType,
      headers: {
        authorization: getAccessToken(),
      },
      TYPE: getType(value, body),
      onUploadProgress: function (progressEvent) {
        if (showUploadProgress) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showUploadProgress(percentCompleted);
        }
      },
      onDownloadProgress: function (progressEvent) {
        if (showDownloadProgress) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showDownloadProgress(percentCompleted);
        }
      },
    });
}

export { API };
