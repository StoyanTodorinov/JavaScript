function addProduct() {
    let labels = $('#add-product label input');
    let name = $(labels[0]).val();
    let price = $(labels[1]).val();
    if (name && price) {
        let element = $(`<tr>
            <td>${name}</td>
        <td>${Number(price)}</td>
        </tr>`);
        $('#product-list').append(element);
        let total = $('#bill tfoot tr td')[1];
        total = $(total);
        total.text(Number(total.text()) + Number(price));
    }
    $(labels[0]).val('');
    $(labels[1]).val('')
}