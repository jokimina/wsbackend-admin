import axios from 'axios';


export async function reloadWaste() {
  return axios({
    url: '/api/waste/reload',
    method: 'get',
  }).then(response => {
    return response.data;
  });
}

export async function fetchWaste(params) {
  return axios({
    url: '/api/waste',
    method: 'get',
    params,
  }).then(response => {
    return response.data;
  });
}

export async function addWaste(data) {
  return axios({
    url: '/api/waste',
    method: 'post',
    data,
  }).then(response => {
    return response.data;
  });
}

export async function updateWaste(data) {
  return axios({
    url: `/api/waste/${data.ID}`,
    method: 'post',
    data,
  }).then(response => {
    return response.data;
  });
}

export async function auditWaste(data) {
  return axios({
    url: '/api/audit/waste',
    method: 'post',
    data,
  }).then(response => {
    return response.data;
  });
}
