let userService = (() => {
    function saveSession(userInfo) {
        let userAuth = userInfo._kmd.authtoken;
        sessionStorage.setItem('authtoken', userAuth);
        let userId = userInfo._id;
        sessionStorage.setItem('userId', userId);
        let username = userInfo.username;
        sessionStorage.setItem('username', username);
    }

    function saveReceipt(receiptId, receipt) {
        sessionStorage.setItem('receiptId', receiptId);
        sessionStorage.setItem('receipt', JSON.stringify(currentReceipt));
    }

    // user/login
    function login(username, password) {
        let userData = {
            username,
            password
        };

        return requester.post('user', 'login', 'basic', userData);
    }

    // user/register
    function register(username, password, repeatPass) {
        if (username.length < 5) {
            notification.showError('Username must be at least 5 symbols long.');
            return;
        }
        if (password !== repeatPass) {
            notification.showError("Passwords don't match!");
            return;
        }

        let userData = {
            username,
            password,
        };

        return requester.post('user', '', 'basic', userData);
    }

    // user/update
    function update(userID, data) {
        return requester.update('user', userID, 'kinvey', data);
    }

    // user/info
    function listUser(userID) {
        return requester.get('user', userID);
    }

    // user/logout
    function logout() {
        let logoutData = {
            authtoken: sessionStorage.getItem('authtoken')
        };

        return requester.post('user', '_logout', 'kinvey', logoutData);
    }

    return {
        login,
        register,
        logout,
        saveSession,
        saveReceipt
    }
})();