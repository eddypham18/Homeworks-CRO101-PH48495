import axios from 'axios';
import { Platform } from 'react-native';

const commonConfigs = {
  baseURL: 'https://67ad9a393f5a4e1477de3e32.mockapi.io/lab6/api',
  timeout: 10000,
  headers: {
    buildversion: '1.0.0',
    buildnumber: 1,
    platform: Platform.OS,
  },
};

const instance = axios.create(commonConfigs);

instance.interceptors.request.use(
  (res) => res,
  (error) => {
    const { data, status } = error.response || {};
    switch (status) {
      case 401:
        console.log('Unauthorized');
        break;
      case 403:
        console.log('Forbidden');
        break;
      case 404:
        console.log('Not Found');
        break;
      case 500:
        console.log('Internal Server Error');
        break;
      default:
        console.log('Unknown Error');
    }
    return Promise.reject(error);
  }
);

const responseBody = (response) => response.data;
const responseError = (response) => ({ isError: true, message: response });

export const api = {
  get: (url, config) =>
    instance.get(url, config).then(responseBody).catch(responseError),
  post: (url, data, config) =>
    instance.post(url, data, config).then(responseBody).catch(responseError),
  put: (url, data, config) =>
    instance.put(url, data, config).then(responseBody).catch(responseError),
  delete: (url, config) =>
    instance.delete(url, config).then(responseBody).catch(responseError),
};
