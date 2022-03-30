import request from "../../utils/request";

const submitInvoice = async (data) => {
    return request("/invoice", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        data
    })
}

export { submitInvoice }