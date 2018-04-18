let renderer = (() => {
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
            let receipt = await receiptService.getActiveReceipt(sessionStorage.getItem('userId'));
            if (receipt.length === 0) {
                receipt = [{
                    active: true,
                    productCount: 0,
                    total: 0
                }];
                await receiptService.createReceipt([receipt[0]]);
            }
            let receiptId = receipt[0]._id;
            let entries = await entryService.getEntriesByReceiptId(receiptId);

            let totalPrice = 0;
            for (let entry of entries) {
                totalPrice += Number(entry.price) * Number(entry.quantity);
            }

            context.totalPrice = totalPrice.toFixed(2);
            context.entries = entries;
            context.receipt = receipt;
            context.username = sessionStorage.getItem('username');

            let currentReceipt = {
                total: totalPrice.toFixed(2),
                active: "true",
                productCount: entries.length,
            };

            sessionStorage.setItem('receiptId', receiptId);
            sessionStorage.setItem('receipt', JSON.stringify(currentReceipt));
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
            context.username = sessionStorage.getItem('username');
            let receipts = await receiptService.getMyReceipts(sessionStorage.getItem('userId'));
            let totalPrice = 0;
            for (let receipt of receipts) {
                totalPrice += Number(receipt.total);
            }
            context.totalPrice = totalPrice.toFixed(2);
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
            let entries = await entryService.getEntriesByReceiptId(receiptId);
            context.entries = entries;
        }
    }

    return {
        loadHomePage,
        loadEditorPage,
        loadOverviewPage,
        loadDetailsPage
    };
})();