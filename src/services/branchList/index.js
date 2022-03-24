import request from "../../utils/request";

const getAllBranch = async () => {
    return request("/branch", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

const createBranchList = async(data) =>{
    return request("/branch/create",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        data
    })
}

const updateBranchList = async(data) => {
    return request(`/branch/update/${data.id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        data
    })
};

const deleteBranchList = async(id) => {
    return request(`/branch/delete/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" }
    })
}

export {getAllBranch,createBranchList,updateBranchList,deleteBranchList}