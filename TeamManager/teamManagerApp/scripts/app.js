$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.get('index.html', (context) => renderer.loadHomePage(context));

        this.get('#/home', (context) =>renderer. loadHomePage(context));

        this.get('#/about', (context) => renderer.loadAboutPage(context));

        this.get('#/login', (context) => renderer.loadLoginPage(context));
        this.post('#/login', (context) => handler.handleLoginSubmit(context));

        this.get('#/register', (context) => renderer.loadRegisterPage(context));
        this.post('#/register', (context) => handler.handleRegisterSubmit(context));

        this.get('#/logout', (context) => handler.handleLogout(context));

        this.get('#/catalog', (context) => renderer.loadCatalogPage(context));

        this.get('#/create', (context) => renderer.loadCreatePage(context));
        this.post('#/create', (context) => handler.handleCreateSubmit(context));

        this.get('#/catalog/:ID', (context) => renderer.loadDetailsPage(context));

        this.get('#/join/:ID', (context) => handler.handleJoinTeam(context));

        this.get('#/leave', (context) => handler.handleLeaveTeam(context));

        this.get('#/edit/:ID', (context) => renderer.loadEditInfoPage(context));
        this.post('#/edit/:ID', (context) => handler.handleEditTeam(context));
    });

    app.run();
});