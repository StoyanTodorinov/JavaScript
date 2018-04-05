function startApp() {
    //DATABASE DETAILS
    const APP_KEY = 'kid_SJ7zR4s9f';
    const APP_SECRET = '70f2c8ac65294f7eb4f02770f1707114';
    const BASE_URL = 'https://baas.kinvey.com/';
    const BASIC_AUTH = {
        Authorization: 'Basic ' + btoa(APP_KEY + ':' + APP_SECRET)
    };
    //LINKS REFERENCES
    const homeLink = $('#linkHome');
    const loginLink = $('#linkLogin');
    const registerLink = $('#linkRegister');
    const linkListAds = $('#linkListAds');
    const linkCreateAd = $('#linkCreateAd');
    const linkLogout = $('#linkLogout');

    function attachViewEvents() {
        homeLink.on('click', () => renderView('Home'));
        registerLink.on('click', () => renderView('Register'));
        loginLink.on('click', () => renderView('Login'));
        linkCreateAd.on('click', () => renderView('CreateAd'));
        linkLogout.on('click', () => {
            logoutUser();
            renderView('Home');
        });
        linkListAds.on('click', () => renderView('Ads'));
    }

    function attachButtonEvents() {
        $('#buttonRegisterUser').on('click', registerUser);
        $('#buttonLoginUser').on('click', loginUser);
        $('#buttonCreateAd').on('click', createAd);
    }

    function adjustNavBar() {
        if (sessionStorage.getItem('authToken') === null) {
            homeLink.show();
            loginLink.show();
            registerLink.show();
            linkListAds.hide();
            linkCreateAd.hide();
            linkLogout.hide();
        } else {
            homeLink.show();
            loginLink.hide();
            registerLink.hide();
            linkListAds.show();
            linkCreateAd.show();
            linkLogout.show()
        }
    }

    function renderView(link) {
        $('main > section').hide();
        $('#view' + link).show();
    }

    function registerUser() {
        let form = $('#formRegister');
        let username = form.find('input[name="username"]').val();
        let password = form.find('input[name="passwd"]').val();

        form.find('input[name="passwd"]').val('');

        let data = {
            username,
            password
        };
        let url = BASE_URL + 'user/' + APP_KEY;
        let headers = BASIC_AUTH;

        requester('POST', url, headers, data)
            .then(registerSuccess)
            .catch(handleError);

        function registerSuccess(data) {
            renderView('Home');
            sessionStorage.setItem('userId', data._id);
            sessionStorage.setItem('username', data.username);
            sessionStorage.setItem('authToken', data._kmd.authtoken);
            form.find('input[name="passwd"]').val('');
            form.find('input[name="username"]').val('');
            adjustNavBar();
            listAds();
            showInfo('register');
        }
    }

    function loginUser() {
        let form = $('#formLogin');
        let username = form.find('input[name="username"]').val();
        let password = form.find('input[name="passwd"]').val();
        form.find('input[name="passwd"]').val('');

        let data = {
            username,
            password
        };
        let url = BASE_URL + 'user/' + APP_KEY + '/login';
        let headers = BASIC_AUTH;

        requester('POST', url, headers, data)
            .then(loginSuccess)
            .catch(handleError);

        function loginSuccess(data) {
            renderView('Home');
            sessionStorage.setItem('userId', data._id);
            sessionStorage.setItem('username', data.username);
            sessionStorage.setItem('authToken', data._kmd.authtoken);
            form.find('input[name="passwd"]').val('');
            form.find('input[name="username"]').val('');
            adjustNavBar();
            listAds();
            showInfo('login');
        }
    }

    function logoutUser() {
        showInfo('logout');
        sessionStorage.clear();
        adjustNavBar();
    }

    function createAd() {
        let form = $('#formCreateAd');
        let title = form.find('input[name="title"]').val();
        let description = form.find('textarea').val();
        let date = new Date(form.find('input[name="datePublished"]').val());
        let price = Number(form.find('input[name="price"]').val());

        let data = {
            title,
            description,
            date,
            price,
            publisher: sessionStorage.getItem('username')
        };
        let url = BASE_URL + 'appdata/' + APP_KEY + '/ads';
        let headers = {
            Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')
        };

        requester('POST', url, headers, data)
            .then(createSuccess)
            .catch(handleError);

        function createSuccess(data) {
            form.find('input[name="title"]').val('');
            form.find('textarea').val('');
            form.find('input[name="datePublished"]').val('');
            form.find('input[name="price"]').val('');
            renderView('Ads');
            listAds();
            showInfo('create');
        }
    }

    function listAds() {
        let url = BASE_URL + 'appdata/' + APP_KEY + '/ads';
        let headers = {
            Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')
        };
        requester('GET', url, headers, null)
            .then(listSuccess)
            .catch(handleError);

        function listSuccess(data) {
            let table = $('#tableBody');
            table.empty();
            for (let ad of data) {
                let tr =
                    $(`<tr>
                    <td>${ad.title}</td>
                    <td>${ad.publisher}</td>
                    <td>${ad.description}</td>
                    <td>${Number(ad.price)}</td>
                    <td>${new Date(ad.date).toLocaleDateString()}</td>
                </tr>`);
                if (ad.publisher === sessionStorage.getItem('username')) {
                    let td = $('<td>');
                    let delLink = $('<a href="#">[Delete]</a>');
                    let editLink = $('<a href="#">[Edit]</a>');

                    delLink.on('click', () => removeAd(tr, ad._id));
                    editLink.on('click', () => {
                        renderView('EditAd');
                        edit(tr, ad)
                    });

                    td.append(delLink).append(editLink);
                    tr.append(td);
                }
                table.append(tr);
            }
        }
    }

    function edit(tr, item) {
        $('#buttonEditAd').on('click', editAd);
        let form = $('#formEditAd');
        let title = form.find('input[name="title"]');
        let description = form.find('textarea');
        let date = form.find('input[name="datePublished"]');
        let price = form.find('input[name="price"]');
        title.val(item.title);
        description.val(item.description);

        function editAd() {
            let data = {
                publisher: item.publisher,
                title: title.val(),
                description: description.val(),
                date: new Date(date.val()),
                price: price.val(),
            };
            let url = BASE_URL + 'appdata/' + APP_KEY + '/ads/' + item._id;
            let headers = {
                Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')
            };

            requester('PUT', url, headers, data)
                .then(editSuccess)
                .catch(handleError);

            function editSuccess() {
                listAds();
                renderView('Ads');
                showInfo('edit')
            }
        }
    }

    function removeAd(tableRow, id) {
        let url = BASE_URL + 'appdata/' + APP_KEY + '/ads/' + id;
        let headers = {
            Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')
        };
        requester('DELETE', url, headers, null)
            .then(() => {
                tableRow.remove();
                showInfo('delete')
            })
            .catch(handleError);

    }

    function handleError(error) {
        showError(error);
    }

    attachButtonEvents();
    attachViewEvents();
    adjustNavBar();
    renderView('Home');
}