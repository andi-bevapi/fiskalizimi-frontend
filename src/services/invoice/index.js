import request from "../../utils/request";

const getInvoices = async (branchId, status) => {
    return request(`/invoice/${branchId}/?status=${status}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

const createInvoice = async (data, userId) => {
    return request('/invoice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            ...data,
            userId
        }
    });
}

const deleteInvoiceById = async (id) => {
    return request(`/invoice/delete/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export { createInvoice, getInvoices, deleteInvoiceById }
