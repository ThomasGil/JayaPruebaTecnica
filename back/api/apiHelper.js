const axios = require('axios');

module.exports = {

    /**
     * Do a http get request to a url, return data if exist or null if doesnt or error
     */
    simpleGetRequest: async (url) => {
        return await axios({
            url: url,
            method: 'get'
        }).then( response => {
            return response.data;
        }).catch( error => {
            return null;
        });
    }
}