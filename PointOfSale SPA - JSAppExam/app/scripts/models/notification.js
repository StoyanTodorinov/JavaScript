let notification = (() => {
    function handleError(error) {
        if (error.responseJSON.description) {
            showError(error.responseJSON.description);
        } else {
            showError(error);
        }
    }

    function showInfo(text) {
        htmlController.showInfo(text);
    }

    function showError(error) {
        htmlController.showError(error);
    }

    htmlController.attachLoadingEvents();

    return {
        showInfo,
        handleError,
        showError
    }
})();