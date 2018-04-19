let formController = (() => {
    function loginSubmit(context) {
        let username = context.params['username-login'];
        let password = context.params['password-login'];

        userService.login(username, password)
            .then(userInfo => {
                userService.saveSession(userInfo);
                notification.showInfo('Login successful!');
                location.hash = '#/editor';
            }).catch(notification.handleError);
    }

    function registerSubmit(context) {
        let username = context.params['username-register'];
        let password = context.params['password-register'];
        let passwordRepeat = context.params['password-register-check'];

        userService.register(username, password, passwordRepeat)
            .then((userInfo) => {
                userService.saveSession(userInfo);
                notification.showInfo('Register successful!');
                location.hash = '#/editor';
            }).catch(notification.handleError);
    }

    function logout(context) {
        userService.logout()
            .then(() => {
                sessionStorage.clear();
                location.hash = '';
                notification.showInfo('Logout successful!');
            }).catch(notification.handleError);
    }

    function updateReceiptSubmit(context) {
        let productCount = sessionStorage.getItem('productCount');
        if (productCount === "0") {
            notification.showError('You cannot checkout empty receipt!');
            return;
        }
        let receiptId = sessionStorage.getItem('receiptId');
        let receipt = {
            active: false,
            productCount: productCount,
            total: $('#totalPrice').text()
        };
        receiptService.commitReceipt(receiptId, receipt)
            .then(data => {
                htmlController.clearElementText('active-entries');
                receiptService.createReceipt()
                    .then(receiptInfo => {
                        sessionStorage.setItem('receiptId', receiptInfo._id);
                        sessionStorage.setItem('productCount', receiptInfo.productCount);
                        notification.showInfo('Receipt submitted.');
                        htmlController.clearElementText('totalPrice');
                    })
            }).catch(notification.handleError);
    }

    function deleteEntry(context) {
        let entryId = context.params["ID"].slice(1);
        entryService.deleteEntry(entryId)
            .then(data => {
                notification.showInfo('Deleted entry.');
                location.hash = '#/editor';
            }).catch(notification.handleError);
    }

    function createEntrySubmit(context) {
        let name = context.params.type;
        let quantity = context.params.qty;
        let price = context.params.price;

        if (name.length === 0) {
            notification.showError('Please type a product name.');
            return;
        }

        if (isNaN(Number(quantity)) || quantity.length === 0) {
            notification.showError('Quantity should be a number.');
            return;
        }

        if (isNaN(Number(price)) || price.length === 0) {
            notification.showError('Price should be a number.');
            return;
        }

        let entry = {
            name,
            quantity,
            price,
            receiptId: sessionStorage.getItem('receiptId')
        };

        entryService.addEntry(entry)
            .then(entryInfo => {
                htmlController.generateEntryAndAppendToTarget('active-entries', entryInfo)
                    .then(() => {
                        htmlController.clearInputFields('create-entry-form', 'subTotal');
                        htmlController.addSubtotalToTotal(entryInfo.price, entryInfo.quantity);
                        sessionStorage.setItem('productCount', ''+(Number(sessionStorage.getItem('productCount')) + 1));
                        notification.showInfo('Entry created.');
                    }).catch(notification.handleError);
            }).catch(notification.handleError);
    }

    return {
        loginSubmit,
        registerSubmit,
        logout,
        createEntrySubmit,
        updateReceiptSubmit,
        deleteEntry
    };
})();