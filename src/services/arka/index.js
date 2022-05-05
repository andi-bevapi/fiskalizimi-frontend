import request from '../../utils/request';

const getAllArka = async (branchId) => {
  return request(`/arkat/${branchId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const createNewArka = async (data) => {
  console.log("====", data);
  return request(`/arkat/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  });
};

const deleteArka = async (id) => {
  return request(`/arkat/delete/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const updateArka = async (data) => {
  return request(`/arkat/update/${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  });
};

const getLastAmount = async (arkaId) => {
  return request(`/arka-history/${arkaId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const updateSavedAmount = async (data) => {
  return request('/arka-history/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
};

export { getAllArka, createNewArka, getLastAmount, updateSavedAmount, deleteArka, updateArka};
