let helper = (() => {
    function handleError(error) {
        hideLoading();
        showError(error);
    }

    function showInfo(text) {
        let infoBox = $('#infoBox');
        switch (text) {
            case "register":
                infoBox.text('Registered');
                infoBox.show();
                setInterval(() => infoBox.hide(), 3000);
                break;
            case "login":
                infoBox.text('Logged in');
                infoBox.show();
                setInterval(() => infoBox.hide(), 3000);
                break;
            case "create":
                infoBox.text('Created');
                infoBox.show();
                setInterval(() => infoBox.hide(), 3000);
                break;
            case "edit":
                infoBox.text('Edited');
                infoBox.show();
                setInterval(() => infoBox.hide(), 3000);
                break;
            case "delete":
                infoBox.text('Deleted');
                infoBox.show();
                setInterval(() => infoBox.hide(), 3000);
                break;
            case "logout":
                infoBox.text('Logged out');
                infoBox.show();
                setInterval(() => infoBox.hide(), 3000);
                break;
        }
    }

    function showError(error) {
        let errorBox = $('#errorBox');
        errorBox.text(error.responseJSON.description);
        errorBox.show();
        setInterval(() => errorBox.hide(), 4000);
    }

    function showLoading() {
        let loadingBox = $('#loadingBox');
        loadingBox.show();
    }

    function hideLoading() {
        let loadingBox = $('#loadingBox');
        loadingBox.hide();
    }

    return {
        showInfo,
        showLoading,
        hideLoading,
        handleError
    }
})();