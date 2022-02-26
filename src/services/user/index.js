import request from '../../utils/request';

export async function getCurrentUser() {
    return request('/user/current', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    });
}

const loginService = async (user) => {
    const data = await request.get("/client/",{
        headers:{
            'Content-Type': 'application/json',
        }
    });
    return data;
}

export {loginService}