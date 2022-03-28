import request from '../../utils/request';
import { buildUrl } from '../../helpers/buildUrl';

const getProducts = async (branchId, query) => {
    const url = buildUrl(query);
    return request(`/product/${branchId}${url}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
}

const createProduct = async (data) => {
    return request("/product/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data
    })
}

const updateProduct = async (data) => {
    return request(`/product/update/${data.id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        data
    })
}

const deleteProduct = (id) => {
    return request(`/product/delete/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" }
    })
}

export { getProducts, createProduct, updateProduct, deleteProduct };