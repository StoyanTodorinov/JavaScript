let adService = (() => {
    function del(id) {
        return requester.deleteAd(id);
    }

    function edit() {
        helper.showLoading();
        let form = $('#main');
        let title = form.find('input[name="title"]');
        let description = form.find('textarea');
        let date = form.find('input[name="datePublished"]');
        let price = form.find('input[name="price"]');

        let data = {
            publisher: sessionStorage.getItem('username'),
            title: title.val(),
            description: description.val(),
            date: date.val(),
            price: Number(price.val()),
        };

        let id = location.hash.replace('#/edit:', '');
        requester.updateAd(id, data)
            .then(editSuccess)
            .catch(helper.handleError);

        function editSuccess() {
            helper.showLoading();
            location.hash = '#/ads';
        }
    }

    function loadAll() {
        return requester.loadAds();
    }

    function load(id) {
        return requester.loadAd(id);
    }

    function create() {
        helper.showLoading();
        let form = $('#formCreateAd');
        let title = form.find('input[name="title"]').val();
        let description = form.find('textarea').val();
        let date = form.find('input[name="datePublished"]').val();
        let price = Number(form.find('input[name="price"]').val());

        let data = {
            title,
            description,
            date,
            price,
            publisher: sessionStorage.getItem('username')
        };

        requester.createAd(data)
            .then(createSuccess)
            .catch(helper.handleError);

        function createSuccess() {
            helper.hideLoading();
            location.hash = '#/ads';
        }
    }

    return {
        load,
        edit,
        create,
        loadAll,
        del,
    }
})();