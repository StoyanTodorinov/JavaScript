function showInfo(text) {
    let infoBox = $('#infoBox');
    switch (text) {
        case "register":
            infoBox.text('REGISTER SUCCESSFUL');
            infoBox.show();
            setInterval(() => infoBox.hide(), 3000);
            break;
        case "login":
            infoBox.text('LOGIN SUCCESSFUL');
            infoBox.show();
            setInterval(() => infoBox.hide(), 3000);
            break;
        case "create":
            infoBox.text('CREATED');
            infoBox.show();
            setInterval(() => infoBox.hide(), 3000);
            break;
        case "edit":
            infoBox.text('EDITED');
            infoBox.show();
            setInterval(() => infoBox.hide(), 3000);
            break;
        case "delete":
            infoBox.text('DELETED');
            infoBox.show();
            setInterval(() => infoBox.hide(), 3000);
            break;
        case "logout":
            infoBox.text('LOGGED OUT');
            infoBox.show();
            setInterval(() => infoBox.hide(), 3000);
            break;
    }
}

function showError(error) {
    let errorBox = $('#errorBox');
    errorBox.text(error.responseJSON.description.toUpperCase());
    errorBox.show();
    setInterval(() => errorBox.hide(), 3000);
}