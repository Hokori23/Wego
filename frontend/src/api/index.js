import axios from 'axios'
axios.defaults.baseURL = 'https://api.hokori.online/wego'
export default {
    getApplicationList: () => {
        return axios.get('/get-applicationlist');
    }
}