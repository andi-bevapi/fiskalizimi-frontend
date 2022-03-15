import request from '../../utils/request';

export async function getSellingUnits() {
    return request('/selling-units/', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
    });
}
