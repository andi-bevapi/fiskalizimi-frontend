import request from '../../utils/request';

export const getPermissions = async () => {
    return request(`/permission/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}