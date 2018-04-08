let userService = (() => {
    function login() {
        helper.showLoading();
        let form = $('#formLogin');
        let username = form.find('input[name="username"]').val();
        let password = form.find('input[name="passwd"]').val();
        form.find('input[name="passwd"]').val('');

        let data = {
            username,
            password
        };

        requester.loginRequest(data)
            .then(loginSuccess)
            .catch(helper.handleError);

        function loginSuccess(data) {
            saveSession(data);
            helper.hideLoading();
            location.hash = '#/home';
        }
    }

    function register() {
        helper.showLoading();
        let form = $('#formRegister');
        let username = form.find('input[name="username"]').val();
        let password = form.find('input[name="passwd"]').val();

        form.find('input[name="passwd"]').val('');

        let data = {
            username,
            password
        };

        requester.registerRequest(data)
            .then(registerSuccess)
            .catch(helper.handleError);

        function registerSuccess(data) {
            saveSession(data);
            helper.hideLoading();
            location.hash = '#/home';
        }
    }

    function logout() {
        sessionStorage.clear();
        location.hash = '#/home';
    }

    function saveSession(userData) {
        sessionStorage.setItem('userId', userData._id);
        sessionStorage.setItem('username', userData.username);
        sessionStorage.setItem('authToken', userData._kmd.authtoken);
    }

    return {
        login,
        register,
        logout
    }
})();