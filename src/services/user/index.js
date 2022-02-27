import request from '../../utils/request';

export async function getCurrentUser() {
    return request('/user/current/info', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
    });
}

export const login = async (data) => {
    return request("/user/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data
    });
}
