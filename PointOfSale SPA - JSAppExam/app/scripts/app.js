$(() => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.get('index.html', (context) => viewController.loadHomePage(context));

        this.post('#/register', (context) => formController.registerSubmit(context));

        this.post('#/login', (context) => formController.loginSubmit(context));

        this.get('#/logout', (context) => formController.logout(context));

        this.get('#/editor', (context) => viewController.loadEditorPage(context));

        this.get('#/overview', (context) => viewController.loadOverviewPage(context));

        this.get('#/details:ID', (context) => viewController.loadDetailsPage(context));

        this.post('#/createReceipt', (context) => formController.updateReceiptSubmit(context));

        this.post('#/createEntry', (context) => formController.createEntrySubmit(context));

        this.get('#/delete:ID', (context) => formController.deleteEntry(context));
    });

    app.run();
});