import request from "../../utils/request";

const getAllCategory = async (branchId) => {
    return request(`/categories/${branchId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

const createCategory = async(branchId, data) =>{
    return request("/categories/create",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            branchId,
            ...data
        }
    })
}

const updateCategory = async (branchId, data) => {
    return request(`/categories/update/${data.id}`,{
        method:"PUT",
        headers:{
            'Content-Type': 'application/json',
        },
        data: {
            branchId,
            ...data
        }
    })
}

const deleteCategory = async(id) => {
    return request(`/categories/delete/${id}`,{
        method:"PUT",
        headers:{
            'Content-Type': 'application/json',
        }
    })
}

export {createCategory,getAllCategory,updateCategory,deleteCategory}