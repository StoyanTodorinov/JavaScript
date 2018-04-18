$(() => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.get('index.html', (context) => renderer.loadHomePage(context));

        this.get('#/register', (context) => renderer.loadRegisterPage(context));
        this.post('#/register', (context) => handler.registerSubmit(context));

        this.get('#/login', (context) => renderer.loadLoginPage(context));
        this.post('#/login', (context) => handler.loginSubmit(context));

        this.get('#/logout', (context) => handler.logout(context));

        this.get('#/editor', (context) => renderer.loadEditorPage(context));

        this.get('#/overview', (context) => renderer.loadOverviewPage(context));

        this.get('#/details:ID', (context) => renderer.loadDetailsPage(context));

        this.post('#/createReceipt', (context) => handler.updateReceiptSubmit(context));

        this.post('#/createEntry', (context) => handler.createEntrySubmit(context));

        this.get('#/delete:ID', (context) => handler.deleteEntry(context));
    });

    app.run();
});