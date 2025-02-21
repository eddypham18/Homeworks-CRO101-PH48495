import axios from 'axios';
import { Platform } from 'react-native';

const commonConfigs = {
  baseURL: 'http://10.0.2.2:3000/',
  timeout: 10000,
  headers: {
    buildversion: '1.0.0',
    buildnumber: 1,
    platform: Platform.OS,
  },
};

const instance = axios.create(commonConfigs);

instance.interceptors.request.use(
  (res: any) => res,
  (error: any) => {
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

const responseBody = (response: any) => response;
const responseError = (response: any) => ({ isError: true, message: response });

export const api = {
  get: (url: string, config: any) =>
    instance.get(url, config).then(responseBody).catch(responseError),
  post: (url: string, data: any, config: any) =>
    instance.post(url, data, config).then(responseBody).catch(responseError),
  put: (url: string, data: any, config: any) =>
    instance.put(url, data, config).then(responseBody).catch(responseError),
  delete: (url: string, config: any) =>
    instance.delete(url, config).then(responseBody).catch(responseError),
  patch: (url: string, data: any, config: any) =>
    instance.patch(url, data, config).then(responseBody).catch(responseError),
};

export default api;
