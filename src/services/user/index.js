import request from '../../utils/request';

export async function getCurrentUser() {
    return request('/user/current', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    });
}