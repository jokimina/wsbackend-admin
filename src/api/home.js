import axios from 'axios';

export async function fetchWaste(params) {
  return axios({
    url: '/api/waste',
    method: 'get',
    params, 
  }).then(response => {
    return response.data;
  });
}

export async function UpdateWaste(data) {
  return axios({
    url: `/api/waste/${data.ID}`,
    method: 'post',
    data,
  }).then(response => {
    return response.data;
  });
}
