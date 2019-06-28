import { Message } from '@alifd/next';
import axios from 'axios';
// import { push } from 'react-router-redux';


axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;
axios.defaults.timeout = 15000;
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';


const timezone = (new Date()).getTimezoneOffset() / -60;
axios.interceptors.request.use((config) => {
  config.headers.TIMEZONE = timezone;
  config.headers['Content-Type'] = 'application/json';
  return config;
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  const { status, statusText, data = {} } = error.response || {};
  const code = data.code || data.status || status;
  const text = data.message || data.detail || statusText;
  console.error(text);
  Message.error(`${code}: ${text}`);
  if (code === 403) {
    localStorage.clear();
    // push('/user/login');
    window.location.href = '/#/user/login';
  }
  return Promise.reject(error);
});
