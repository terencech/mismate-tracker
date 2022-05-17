import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 1000
});

const ApiService = {
  get(path, config, callback) {
    return axiosInstance.get(path, config)
      .then(res => callback(res))
      .catch(err => Promise.reject(err));
  },
  post(path, data, config, callback) {
    return axiosInstance.post(path, data, config)
      .then(res => callback(res))
      .catch(err => Promise.reject(err));
  },
  delete(path, config, callback) {
    return axiosInstance.delete(path, config)
      .then(res => callback(res))
      .catch(err => Promise.reject(err));
  }
}

export default ApiService;