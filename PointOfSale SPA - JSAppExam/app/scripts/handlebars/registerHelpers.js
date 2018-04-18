(() => {
    Handlebars.registerHelper('calcTotal', function (quan, price) {
        return (Number(quan) * Number(price)).toFixed(2);
    });

    Handlebars.registerHelper('formatDate', function (date) {
        let dateObj = new Date(date);
        let day = dateObj.getDate();
        let month = dateObj.getMonth() + 1;
        let year = dateObj.getFullYear();
        let hours = dateObj.getHours();
        let minutes = dateObj.getMinutes();

        if (minutes >= 0 && minutes <= 9) {
            minutes = "0" + minutes;
        }
        return day + '.' + month + '.' + year + ' | ' + hours + ':' + minutes;
    });
})();