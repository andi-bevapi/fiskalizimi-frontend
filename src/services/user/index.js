import request from '../../utils/request';

export async function getCurrentUser() {
    return request('/user/current/info', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
    });
}

export const getUsers = async (clientId) => {
    return request(`/user/${clientId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
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

export const  createUser = async (data) => {
    return request("/user/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data
    })
}

export const  updateUser = async (data) => {
    console.log("User ID------", data.user.id);
    return request(`/user/update/${data.user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        data
    })
}

export const  deleteUser = async (id) => {
    return request(`/user/delete/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    })
}