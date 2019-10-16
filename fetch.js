const axios = require("axios");

axios.interceptors.request.use(config => {
  return config;
});

axios.interceptors.response.use(res => {
  return res.data;
});

const fetch = opts => {
  return axios(opts);
};

module.exports = { fetch };
