import request from "../../utils/request";

const getInvoices = async (branchId, status) => {
    return request(`/invoice/${branchId}/?status=${status}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

const createInvoice = async (data) => {
    return request('/invoice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data
    });
}

const printInvoice = async (data) => {
    return request('/invoice/print', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data
    })
}

export { createInvoice, getInvoices, printInvoice }
