import request from "../../utils/request";


const configure = async(data) =>{
    console.log("data-----",data);
    return request("/configuration",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            ...data
        }
    })
}

export {configure};