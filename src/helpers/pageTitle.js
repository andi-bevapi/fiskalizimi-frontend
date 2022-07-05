const pageTitle = (value) => {

    const {dateTime,invoiceCode} = value
    const date = new Date(dateTime).toISOString().slice(0, 10);
    const orderNumber = invoiceCode.split('/')[0];
    return "Fat." + orderNumber + "_Dt." + date;
};
export default pageTitle;