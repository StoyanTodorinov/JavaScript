let requester = (() => {
    const APP_KEY = 'kid_SJ7zR4s9f';
    const APP_SECRET = '70f2c8ac65294f7eb4f02770f1707114';
    const BASE_URL = 'https://baas.kinvey.com/';
    const BASIC_AUTH = {
        Authorization: 'Basic ' + btoa(APP_KEY + ':' + APP_SECRET)
    };

    function loadAd(id) {
        let url = BASE_URL + 'appdata/' + APP_KEY + '/ads/' + id;
        let headers = {
            Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')
        };
        return makeRequest('GET', url, headers, null);
    }

    function createAd(data) {
        let url = BASE_URL + 'appdata/' + APP_KEY + '/ads';
        let headers = {
            Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')
        };

        return makeRequest('POST', url, headers, data)
    }

    function updateAd(id, data) {
        let url = BASE_URL + 'appdata/' + APP_KEY + '/ads/' + id;
        let headers = {
            Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')
        };
        return makeRequest('PUT', url, headers, data);
    }

    function deleteAd(id) {
        let url = BASE_URL + 'appdata/' + APP_KEY + '/ads/' + id;
        let headers = {
            Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')
        };
        return makeRequest('DELETE', url, headers, null);
    }

    function loadAds() {
        let url = BASE_URL + 'appdata/' + APP_KEY + '/ads';
        let headers = {
            Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')
        };
        return makeRequest('GET', url, headers, null);
    }

    function loginRequest(data) {
        let url = BASE_URL + 'user/' + APP_KEY + '/login';
        let headers = BASIC_AUTH;
        return makeRequest('POST', url, headers, data);
    }

    function registerRequest(data) {
        let url = BASE_URL + 'user/' + APP_KEY;
        let headers = BASIC_AUTH;
        return makeRequest('POST', url, headers, data);
    }

    function makeRequest(method, url, headers, data) {
        let req = {
            method,
            url,
            headers,
        };
        if (data !== null) {
            req.data = data;
        }

        return $.ajax(req);
    }

    return {
        loginRequest,
        createAd,
        registerRequest,
        loadAds,
        loadAd,
        deleteAd,
        updateAd
    }
})();