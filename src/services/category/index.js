import request from "../../utils/request";

const getAllCategory = async () => {
    return request("/categories", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
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

export {getAllCategory,updateCategory,deleteCategory}