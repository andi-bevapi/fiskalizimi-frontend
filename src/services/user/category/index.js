import request from "../../../utils/request";

const getAllCategory = async () => {
    return request("/categories", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export {getAllCategory}