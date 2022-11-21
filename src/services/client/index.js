import request from '../../utils/request';

const getAllClients = async () => {
  return request(`/client/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const createClient = async (data) => {
  return request('/client/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
};

const deleteClient = async (id) => {
  return request(`/client/delete/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const updateClient = async (data) => {
  return request(`/client/update/${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
};

const getClient = async (id) => {
  return request(`/client/get/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export { getAllClients, createClient, updateClient, deleteClient ,getClient};
