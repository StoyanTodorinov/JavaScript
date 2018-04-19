let viewController = (() => {
    function loadHomePage(context) {
        if (sessionStorage.getItem('authtoken') !== null) {
            location.hash = '#/editor';
        }
        context.loadPartials({
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs"
        }).then(function () {
            this.partial("./templates/welcome.hbs");
        });
    }

    function loadEditorPage(context) {
        attachDependencies(context).then(data => {
            context.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs",
                entry: "./templates/common/entry.hbs"
            }).then(function () {
                this.partial("./templates/editor.hbs");
            });
        }).catch(notification.handleError);

        async function attachDependencies(context) {
            let [receipt] = await receiptService.getActiveReceipt(sessionStorage.getItem('userId'));
            if (!receipt) {
                receipt = await receiptService.createReceipt();
            }
            let receiptId = receipt._id;
            let entries = await entryService.getEntriesByReceiptId(receiptId);

            context.totalPrice = calculateTotalPrice('entries', entries);
            context.entries = entries;
            context.receipt = receipt;
            context.username = sessionStorage.getItem('username');

            sessionStorage.setItem('receiptId', receiptId);
            sessionStorage.setItem('productCount', entries.length);
        }
    }

    function loadOverviewPage(context) {
        attachDependencies(context)
            .then(data => {
                context.loadPartials({
                    header: "./templates/common/header.hbs",
                    footer: "./templates/common/footer.hbs",
                    tableRow: "./templates/common/tableRow.hbs"
                }).then(function () {
                    this.partial("./templates/overview.hbs");
                });
            }).catch(notification.handleError);

        async function attachDependencies(context) {
            let receipts = await receiptService.getMyReceipts(sessionStorage.getItem('userId'));
            context.username = sessionStorage.getItem('username');
            context.totalPrice = calculateTotalPrice('receipts', receipts);
            context.receipts = receipts;
        }
    }

    function loadDetailsPage(context) {
        attachDependencies(context)
            .then(data => {
                context.loadPartials({
                    header: "./templates/common/header.hbs",
                    footer: "./templates/common/footer.hbs",
                    tableRowDetails: "./templates/common/tableRowDetails.hbs"
                }).then(function () {
                    this.partial("./templates/details.hbs");
                });
            }).catch(notification.handleError);

        async function attachDependencies(context) {
            let receiptId = context.params['ID'].slice(1);
            context.username = sessionStorage.getItem('username');
            context.entries = await entryService.getEntriesByReceiptId(receiptId);
        }
    }

    function calculateTotalPrice(type, data) {
        let totalPrice = 0;
        if (type === 'receipts') {
            for (let receipt of data) {
                totalPrice += Number(receipt.total);
            }
        } else {
            for (let entry of data) {
                totalPrice += Number(entry.price) * Number(entry.quantity);
            }
        }
        return totalPrice.toFixed(2);
    }

    return {
        loadHomePage,
        loadEditorPage,
        loadOverviewPage,
        loadDetailsPage
    };
})();