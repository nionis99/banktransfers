const axios = require('axios');

class Request {
    constructor() {
    }

    axiosCall(url) {
        return axios.get(url)
            .then(response => response.data)
            .catch(error => error);
    }
}

module.exports = Request;