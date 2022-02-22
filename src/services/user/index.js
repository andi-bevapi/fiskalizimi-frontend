import request from '../../utils/request';

export async function getCurrentUser() {
    return request('/user/current', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    });
}

const loginService = async (username,password) => {
    
    const data = await ((username,password) => {
        
        return null
    })
    return data;
}

export {loginService}