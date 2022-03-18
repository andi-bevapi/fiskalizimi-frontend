import request from '../../utils/request';

const allProduct = async () => {
    return request("/product",{
            method: 'GET',
            headers : {"Content-Type" : "application/json"}
        }
    )
}

const createProduct = async (data) =>{
    return request("product/create",{
        method:"POST",
        headers : {"Content-Type" : "application/json"},
        data:data[0]
    })
}


const updateProduct = async (data) => {
    return request(`/product/update/${data[0].id}`,{
            method: 'PUT',
            headers : {"Content-Type" : "application/json"},
            data:data[0]
        }
    )
}

const deleteProduct = (id) =>{
    return request(`/product/delete/${id}`,{
            method: 'PUT',
            headers : {"Content-Type" : "application/json"}
        }
    )
}

export {allProduct,createProduct,updateProduct,deleteProduct};