import request from '../../utils/request';

const allProduct = async () => {
    return request.get("/product",{
            method: 'GET',
            headers : {"Content-Type" : "application/json"}
        }
    )
}

export {allProduct};