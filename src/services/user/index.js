import request from '../../utils/request';

export async function getCurrentUser() {
    return request('/user/current/info', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('poslaToken')
        },
    });
}

export const getUsers = async (branchId) => {
    return request(`/user/${branchId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export const getUsersByClientId = async (clientId) => {
    return request(`/user/clientId/${clientId}`, {
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

export const createUser = async (data) => {
    return request("/user/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data
    })
}

export const updateUser = async (id, data) => {
    return request(`/user/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        data
    })
}

export const deleteUser = async (id) => {
    return request(`/user/delete/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    })
}

export const checkFirstTimeLogin = async (id) => {
    return request(`/user/checkFirstTimeLogin/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    })
}