export const formatDate = (date) => {
    if(!date) return;
    let formatedDate = new Date(date.toString().split(/\+|-/)[0]).toISOString().split('T')[0];
    return formatedDate;
}