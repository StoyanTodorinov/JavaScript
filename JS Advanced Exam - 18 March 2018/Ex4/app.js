class PaymentManager {
    constructor(title) {
        this.title = title;
        this.id = 0;
    }

    async render(target) {
        let tableSource = await $.get('table.html');
        let tableTemp = Handlebars.compile(tableSource);
        let table = tableTemp(this);
        let targetDiv = $('#' + target);
        targetDiv.append(table);

        let button = targetDiv.find('button')[0];
        $(button).on('click', addNewPayment);

        async function addNewPayment() {
            let table = $('#' + target);
            let tableBody = table.find('.payments');

            let name = $(table.find('input[name="name"]'));
            let cat = $(table.find('input[name="category"]'));
            let price = $(table.find('input[name="price"]'));

            if (name.val() === '' || cat.val() === '' || price.val() === '') {
                return;
            }

            let context = {
                name: name.val(),
                category: cat.val(),
                price: price.val()
            };

            let tableRowSource = await $.get('tableRow.html');
            let tableRowTemp = Handlebars.compile(tableRowSource);
            let trString = tableRowTemp(context);
            let tr = $(trString);
            let delBtn = $(tr.find('button')[0]);
            tableBody.append(tr);

            name.val('');
            price.val('');
            cat.val('');

            delBtn.on('click', function () {
                tr.remove();
            });
        }
    }
}