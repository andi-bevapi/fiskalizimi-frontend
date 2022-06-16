import { extend } from 'umi-request';

const codeMessage = {
    200: 'The server successfully returned the requested data. ',
    201: 'Create or modify data successfully. ',
    202: 'A request has entered the background queue (asynchronous task). ',
    204: 'Delete data successfully. ',
    400: 'The request sent has an error, and the server has not performed any new or modified data operations. ',
    401: 'The user does not have permission (the token, username, password are wrong). ',
    403: 'The user is authorized, but access is forbidden. ',
    404: 'The request sent is for a record that does not exist, and the server is not operating. ',
    406: 'The requested format is not available. ',
    410: 'The requested resource has been permanently deleted and will no longer be available. ',
    422: 'When creating an object, a validation error occurred. ',
    500: 'An error occurred in the server, please check the server. ',
    502: 'Gateway error. ',
    503: 'The service is unavailable, and the server is temporarily overloaded or maintained. ',
    504: 'The gateway has timed out. ',
};

const errorHandler = (error) => {
    const { response } = error;
    if (response && response.status == 401) {
        localStorage.removeItem('poslaToken');
    }
    return response;
};

const request = extend({
    prefix: 'https://fiskalizimi-dev-api.herokuapp.com/api',
    errorHandler
});

export default request;
