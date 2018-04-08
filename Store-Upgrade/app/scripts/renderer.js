let renderer = (() => {
    function respond(partialName) {
        let context = headerAuthorizationInfo();

        switch (partialName) {
            case "logout":
                userService.logout();
                break;
            case "login":
                context.login = true;
            case "register":
                loadPage('authentication', context);
                break;
            case "ads":
                helper.showLoading();
                extractAdsInfoAndLoad(context);
                break;
            case "home":
                loadPage('home', context);
                break;
            case "create":
                context.isCreate = true;
                loadPage('adForm', context);
                break;
            case "delete":
                let deleteId = location.hash.replace('#/delete:', '');
                adService.del(deleteId);
                location.hash = '#/home';
                break;
            default:
                let editId = location.hash.replace('#/edit:', '');
                extractEditInfoAndLoad(editId, context);
                break;
        }
    }

    function headerAuthorizationInfo() {
        return {
            isLogged: sessionStorage.getItem('username') !== null,
            username: sessionStorage.getItem('username')
        };
    }

    function extractAdsInfoAndLoad(context) {
        adService.loadAll()
            .then((data) => {
                data.forEach(ad => ad.publisher === sessionStorage.getItem('username')
                    ? ad.isCreator = true : ad.Creator = false);
                context.ads = data;
                loadAdsPage('ads', context);
            }).catch(helper.handleError);
    }

    function extractEditInfoAndLoad(editId, context) {
        adService.load(editId)
            .then((data) => {
                context.title = data.title;
                context.description = data.description;
                context.date = data.date;
                context.price = data.price;
                loadPage('adForm', context);
            });
        helper.hideLoading();
    }

    async function loadAdsPage(partialName, context) {
        let headerSource = $.get('./templates/partials/header.html');
        let footerSource = $.get('./templates/partials/footer.html');
        let tableRowSource = $.get('./templates/partials/tableRow.html');
        let homeSource = $.get('./templates/' + partialName + '.html');
        let [header, footer, tr, home] = await Promise.all([headerSource, footerSource, tableRowSource, homeSource]);
        Handlebars.registerPartial({
            header: header,
            footer: footer,
            tableRow: tr
        });
        let homeTemplate = Handlebars.compile(home);
        $('#main').html(homeTemplate(context));
    }

    async function loadPage(partialName, context) {
        let headerSource = $.get('./templates/partials/header.html');
        let footerSource = $.get('./templates/partials/footer.html');
        let homeSource = $.get('./templates/' + partialName + '.html');
        let [header, footer, home] = await Promise.all([headerSource, footerSource, homeSource]);
        Handlebars.registerPartial({
            header: header,
            footer: footer
        });
        let homeTemplate = Handlebars.compile(home);
        $('#main').html(homeTemplate(context));

        attachButtonEvents();
    }

    function attachButtonEvents() {
        $('#buttonRegisterUser').on('click', userService.register);
        $('#buttonLoginUser').on('click', userService.login);
        $('#buttonCreateAd').on('click', adService.create);
        $('#buttonEditAd').on('click', adService.edit);
    }

    return {
        respond
    }
})();