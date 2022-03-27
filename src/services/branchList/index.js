import request from "../../utils/request";

const getAllBranch = async (clientId) => {
    return request(`/branch/${clientId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

const createBranchList = async(clientId, data) =>{
    return request("/branch/create",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            clientId,
            ...data
        }
    })
}

const updateBranchList = async(clientId, data) => {
    return request(`/branch/update/${data.id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        data: {
            clientId,
            ...data
        }
    })
};

const deleteBranchList = async(id) => {
    return request(`/branch/delete/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" }
    })
}

export {getAllBranch,createBranchList,updateBranchList,deleteBranchList}