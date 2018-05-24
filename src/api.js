import axios from 'axios';

const instance = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Content-Type': 'application/json',
  },
  transformRequest: data => JSON.stringify(data),
});

export default instance;