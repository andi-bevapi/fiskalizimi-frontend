import request from "../../utils/request";

const getConfiguration = async(id) =>{
    return request(`/configuration/${id}`,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

const configure = async(data) =>{
    return request("/configuration",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        data
    })
}

export {configure,getConfiguration};