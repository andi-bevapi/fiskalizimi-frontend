import request from '../../utils/request';

export async function getCurrentUser() {
    return request('/user/current', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    });
}

const loginService = async (username,password) => {
    console.log("service------",username); 
    const data = await ((username,password) => {
        console.log("await------",username); 
        return null
    })
    return data;
}

export {loginService}