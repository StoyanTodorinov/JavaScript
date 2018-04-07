let renderer = (() => {
    function loadHomePage(context) {
        auth.showInfo('Loading home page...');
        attachTemplateRequirements(context);

        context.loadPartials({
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs"
        }).then(function () {
            this.partial("./templates/home/home.hbs")
        });

        function attachTemplateRequirements(context) {
            context.username = sessionStorage.getItem('username');
            context.loggedIn = sessionStorage.getItem('authtoken');
        }
    }

    function loadAboutPage(context) {
        auth.showInfo('Loading about page...');
        attachTemplateRequirements(context);

        context.loadPartials({
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs"
        }).then(function () {
            this.partial("./templates/about/about.hbs")
        });

        function attachTemplateRequirements(context) {
            context.username = sessionStorage.getItem('username');
            context.loggedIn = sessionStorage.getItem('authtoken');
        }
    }

    function loadLoginPage(context) {
        auth.showInfo('Loading login page...');

        context.loadPartials({
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs",
            loginForm: "./templates/login/loginForm.hbs"
        }).then(function () {
            this.partial("./templates/login/loginPage.hbs")
        });
    }

    function loadRegisterPage(context) {
        auth.showInfo('Loading register page...');

        context.loadPartials({
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs",
            registerForm: "./templates/register/registerForm.hbs"
        }).then(function () {
            this.partial("./templates/register/registerPage.hbs")
        });
    }

    async function loadCatalogPage(context) {
        auth.showInfo('Loading catalog page...');
        await attachTemplateRequirements(context);

        context.loadPartials({
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs",
            team: "./templates/catalog/team.hbs"
        }).then(function () {
            this.partial("./templates/catalog/teamCatalog.hbs")
        });

        async function attachTemplateRequirements(context) {
            context.username = sessionStorage.getItem('username');
            context.loggedIn = sessionStorage.getItem('authtoken');
            context.hasNoTeam = sessionStorage.getItem('teamId');
            let teams = await teamsService.loadTeams();
            context.teams = teams;
        }
    }

    function loadCreatePage(context) {
        auth.showInfo('Loading create page...');
        attachTemplateRequirements(context);

        context.loadPartials({
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs",
            createForm: "./templates/create/createForm.hbs"
        }).then(function () {
            this.partial("./templates/create/createPage.hbs")
        });

        function attachTemplateRequirements(context) {
            context.username = sessionStorage.getItem('username');
            context.loggedIn = sessionStorage.getItem('authtoken');
        }
    }

    async function loadDetailsPage(context) {
        auth.showInfo('Loading details page...');
        await attachTemplateRequirements(context);

        context.loadPartials({
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs",
            teamControls: "./templates/catalog/teamControls.hbs",
            teamMember: "./templates/catalog/teamMember.hbs"
        }).then(function () {
            this.partial("./templates/catalog/details.hbs")
        });

        async function attachTemplateRequirements(context) {
            context.username = sessionStorage.getItem('username');
            context.loggedIn = sessionStorage.getItem('authtoken');
            let teamId = context.params['ID'].slice(1);
            let details = await teamsService.loadTeamDetails(teamId);
            let query = '?query={"teamId":"' + teamId + '"}';
            let members = await requester.get('user', query, 'Kinvey');
            context.name = details.name;
            context.comment = details.comment;
            context.members = members;
            context.isOnTeam = teamId === sessionStorage.getItem('teamId');
            context.isAuthor = details._acl.creator === sessionStorage.getItem('userId');
            context.teamId = teamId;
        }
    }

    async function loadEditInfoPage(context) {
        auth.showInfo('Loading edit page...');
        await attachTemplateRequirements(context);

        context.loadPartials({
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs",
            editForm: "./templates/edit/editForm.hbs",
        }).then(function () {
            this.partial("./templates/edit/editPage.hbs")
        });

        async function attachTemplateRequirements(context) {
            context.username = sessionStorage.getItem('username');
            context.loggedIn = sessionStorage.getItem('authtoken');
            let teamId = context.params['ID'].slice(1);
            let teamDetails = await teamsService.loadTeamDetails(teamId);
            context.name = teamDetails.name;
            context.comment = teamDetails.comment;
            context.teamId = teamId;
        }
    }

    return {
        loadHomePage,
        loadAboutPage,
        loadLoginPage,
        loadRegisterPage,
        loadCatalogPage,
        loadCreatePage,
        loadDetailsPage,
        loadEditInfoPage
    }
})();