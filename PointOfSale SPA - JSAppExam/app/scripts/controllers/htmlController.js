let htmlController = (() => {
    function dynamicFormCalculation() {
        let quan = $('#inputQuan').val();
        let price = $('#inputPrice').val();
        $('#subTotal').text((Number(quan) * Number(price)).toFixed(2));
    }

    function attachLoadingEvents() {
        $(document).on({
            ajaxStart: () => $('#loadingBox').show(),
            ajaxStop: () => $('#loadingBox').fadeOut()
        });
    }

    function showInfo(text) {
        let infoBox = $('#infoBox');
        infoBox.find('span').text(text);
        infoBox.show();
        setInterval(() => infoBox.hide(), 3000);
    }

    function showError(error) {
        let errorBox = $('#errorBox');
        errorBox.find('span').text(error);
        errorBox.show();
        setInterval(() => errorBox.hide(), 3000);
    }

    function clearElementText(target) {
        $('#' + target).text('');
    }

    async function generateEntryAndAppendToTarget(target, entryInfo) {
        let source = await $.get('./templates/common/entry.hbs');
        let template = Handlebars.compile(source);
        $('#' + target).append(template(entryInfo));
    }

    function clearInputFields(formTarget, totalTarget) {
        $('#' + formTarget)[0].reset();
        $('#' + totalTarget).text('Sub-total');
    }

    function addSubtotalToTotal(price, quantity) {
        let element = $('#totalPrice');
        let curTotal = Number(element.text());
        let total = curTotal + (Number(price) * Number(quantity));
        element.text(total.toFixed(2));
    }

    return {
        dynamicFormCalculation,
        attachLoadingEvents,
        showInfo,
        showError,
        clearElementText,
        generateEntryAndAppendToTarget,
        clearInputFields,
        addSubtotalToTotal
    }
})();