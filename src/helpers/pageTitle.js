const pageTitle = (props) => {
    const {dateTime,invoiceCode} = props.data
    const date = new Date(dateTime).toISOString().split('.')[0].concat('+01:00');
    const orderNumber = invoiceCode.split('/')[0];
    return orderNumber + '__' + date;
};
export default pageTitle;