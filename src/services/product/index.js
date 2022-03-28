import request from '../../utils/request';

const getProducts = async (branchId) => {
    return request(`/product/${branchId}`, {
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


export { getProducts, getProductByBarcode, createProduct, updateProduct, deleteProduct };