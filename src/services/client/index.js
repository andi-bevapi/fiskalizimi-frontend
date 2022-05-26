import request from "../../utils/request";

const getAllClients = async () => {
  return request(`/client/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export { getAllClients };
