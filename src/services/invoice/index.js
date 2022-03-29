import request from "../../utils/request";

const createInvoice = async (data) => {
    return request(`/invoice`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data
    });
}

export { createInvoice }