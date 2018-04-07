let handler = (() => {
    function handleLoginSubmit(context) {
        auth.showInfo('Logging in...');
        let [username, password] = extractInputFields();

        auth.login(username, password)
            .then((data) => {
                auth.saveSession(data);
                renderer.loadHomePage(context);
            })
            .catch((error) => auth.handleError(error));

        function extractInputFields() {
            let username = context.params.username;
            let password = context.params.password;
            return [username, password];
        }
    }

    function handleRegisterSubmit(context) {
        auth.showInfo('Registering...');
        let [username, password, repeatPassword] = extractInputFields();
        auth.register(username, password, repeatPassword)
            .then((data) => {
                auth.login(username, password)
                    .then(() => {
                        auth.saveSession(data);
                        renderer.loadHomePage(context);
                    })
            }).catch((error) => auth.handleError(error));

        function extractInputFields() {
            let username = context.params.username;
            let password = context.params.password;
            let repeatPassword = context.params.repeatPassword;
            return [username, password, repeatPassword];
        }
    }

    function handleLogout(context) {
        auth.showInfo('Logging out...');
        auth.logout()
            .then((data) => {
                sessionStorage.clear();
                renderer.loadHomePage(context);
            })
            .catch((error) => auth.handleError(error));
    }

    function handleCreateSubmit(context) {
        auth.showInfo('Creating a new team...');
        let [name, comment] = extractInputFields();

        teamsService.createTeam(name, comment)
            .then((data) => {
                location.hash = '#/catalog/:' + data._id;
            })
            .catch((error) => auth.handleError(error));

        function extractInputFields() {
            let name = context.params.name;
            let comment = context.params.comment;
            return [name, comment];
        }
    }

    function handleJoinTeam(context) {
        if (teamsService.userIsInATeam()) {
            auth.showError('Cannot join more than one team!');
            return;
        }
        auth.showInfo('Joining team...');
        let teamId = context.params['ID'].slice(1);
        teamsService.joinTeam(teamId)
            .then((data) => {
                auth.saveSession(data);
                location.hash = '#/catalog/:' + teamId;
            })
            .catch((error) => auth.handleError(error));
    }

    function handleLeaveTeam(context) {
        auth.showInfo('Leaving team...');
        teamsService.leaveTeam()
            .then((data) => {
                auth.saveSession(data);
                history.back();
            })
            .catch((error) => auth.handleError(error));
    }

    function handleEditTeam(context) {
        auth.showInfo('Editing team...');
        let [teamId, newName, newComment] = extractInputFields();

        teamsService.edit(teamId, newName, newComment)
            .then((data) => location.hash = '#/catalog/:' + teamId)
            .catch((error) => auth.handleError(error));

        function extractInputFields() {
            let teamId = context.params['ID'].slice(1);
            let newName = context.params.name;
            let newComment = context.params.comment;
            return [teamId, newName, newComment];
        }
    }

    return {
        handleLoginSubmit,
        handleRegisterSubmit,
        handleLogout,
        handleCreateSubmit,
        handleJoinTeam,
        handleLeaveTeam,
        handleEditTeam
    }
})();