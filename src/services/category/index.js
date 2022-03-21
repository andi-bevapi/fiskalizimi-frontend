import request from "../../utils/request";

const getAllCategory = async () => {
    return request("/categories", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

const createCategory = async(data) =>{
    return request("/categories/create",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        data
    })
}

const updateCategory = async (data) => {
    return request(`/categories/update/${data.id}`,{
        method:"PUT",
        headers:{
            'Content-Type': 'application/json',
        },
        data:{name: data.name}
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