import axios from 'axios';

const baseUrl = '/api';
const getUrl = url => `${baseUrl}${url}`;

class ApiService {
    get(url) { 
        return axios.get(
            getUrl(url),
        );
    }

    post(url, data) {
        return axios.post(
            getUrl(url),
            data
        );
    }
};

export default new ApiService();