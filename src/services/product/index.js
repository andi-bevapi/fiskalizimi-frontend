import request from '../../utils/request';
import { buildUrl } from '../../helpers/buildUrl';

const getProducts = async (branchId, query) => {
    const url = buildUrl(query);
    return request(`/product/${branchId}${url}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
}

const getProductsByClientId = async (clientId, query) => {
    const url = buildUrl(query);
    return request(`/product/clientId/${clientId}${url}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
}

const getProductByBarcode = async(barcode, branchId) => {
    return request(`/product/${branchId}?barcode=${barcode}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
}

const createProduct = async (clientId, data) => {
    return request("/product/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: {
            clientId,
            ...data
        }
    })
}

const updateProduct = async (clientId, data) => {
    return request(`/product/update/${data.id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        data: {
            clientId,
            ...data
        }
    })
}

const deleteProduct = (id) => {
    return request(`/product/delete/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" }
    })
}

const returnProductWithBarcode = (barcode) => {
    return request(`/product/barcode/${barcode}`, {
        method: 'GET',
        headers: { "Content-Type" : "application/json" }
    })
}


export { getProducts, getProductByBarcode, createProduct, updateProduct, deleteProduct, returnProductWithBarcode, getProductsByClientId };