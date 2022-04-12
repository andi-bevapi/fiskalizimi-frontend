export const formatDate = (date) => {
    let formatedDate = new Date(date).toISOString().replace('-', '-').split('T')[0].replace('-', '-');
    return formatedDate;
}