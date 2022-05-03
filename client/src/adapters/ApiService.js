import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 1000
});

const ApiService = {
  get(path, callback) {
    return axiosInstance.get(path)
      .then(res => callback(res))
      .catch(err => Promise.reject(err));
  },
  post(path, data, callback) {
    return axiosInstance.post(path, data)
      .then(res => callback(res))
      .catch(err => Promise.reject(err));
  }
}

export default ApiService;