import axios from 'axios';
import { USER } from '../config';

axios.defaults.baseURL = 'http://localhost:3000/';

// const AUTH_TOKEN = localStorage.getItem('token');
axios.defaults.headers.common['user'] = USER
// axios.defaults.headers.post['Content-Type'] = "application/json"
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const callApi = async (method, url, customConfig = {}) => {
    return axios[method](url, customConfig)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error
        });
}
