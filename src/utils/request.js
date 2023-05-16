import axios from "axios";
import { BASE_URL } from "@/constants";
import storage from "@/utils/storage";

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const request = (options) => {
  const requestOptions = options;
  const token = storage.get("AuthToken");

  if (token) {
    requestOptions.headers = {
      ...requestOptions.headers,
      Authorization: `${token}`,
    };
  }

  const onSuccess = (response) => response.data;

  const onError = (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/sign-in";
      storage.remove("AuthToken");
      storage.remove("user");
    }
    return Promise.reject(error.response || error.message);
  };

  return client(requestOptions).then(onSuccess).catch(onError);
};

export default request;
