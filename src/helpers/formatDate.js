export const formatDate = (date) => {
    if(!date) return;
    let formatedDate = new Date(date.toString().split(/\+|-/)[0]).toISOString().split('T')[0];
    return formatedDate;
}

export const dateFormatInvoiceFiscalized = () =>{
    const date = new Date().toISOString().replace('Z', '').substring(0,20).replace('.', '+01:00');
    return date;
}