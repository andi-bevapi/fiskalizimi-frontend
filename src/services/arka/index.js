import request from '../../utils/request';

const getAllArka = async (branchId) => {
  return request(`/arkat/${branchId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const getAllArkabyClientId = async (clientId) => {
  return request(`/arkat/clientId/${clientId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};


const createNewArka = async (clientId, data) => {
  return request(`/arkat/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      clientId,
      ...data
    }
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

const getArkaHistory = async (id) => {
  return request(`/arka-history/todays/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

}

export { getAllArka, createNewArka, getLastAmount, updateSavedAmount, deleteArka, updateArka, getArkaHistory, getAllArkabyClientId};
