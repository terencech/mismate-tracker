const axios = require('axios');

exports.getMismates = () => {
  axios({
    method: 'get',
    url: '/mismates',
    responseType: 'json'
  }).then((res) => {
      return res.data;
  });
};