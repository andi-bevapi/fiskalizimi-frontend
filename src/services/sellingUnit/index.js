import request from '../../utils/request';

const getSellingUnits = (branchId) => {
  return request(`/selling-units/${branchId}`, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('poslaToken'),
    },
  });
};

const getSellingUnitsByClientId = (clientId) => {
  return request(`/selling-units/clientId/${clientId}`, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('poslaToken'),
    },
  });
};

const createSellingUnit = async (clientId, data) => {
  return request('/selling-units/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: {
      clientId,
      ...data
    },
  });
};

const updateSellingUnit = async (branchId, data) => {
  return request(`/selling-units/update/${data.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    data: {
      branchId,
      ...data
    }
  });
};

const deleteSellingUnit = async (id) => {
    return request(`/selling-units/delete/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });
  };
  
export { getSellingUnits, createSellingUnit, updateSellingUnit, deleteSellingUnit, getSellingUnitsByClientId };
