import request from '../../utils/request';

const getSellingUnits = () => {
  return request('/selling-units/', {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });
};

const createSellingUnit = async (data) => {
  return request('/selling-units/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data,
  });
};

const updateSellingUnit = async (data) => {
  return request(`/selling-units/update/${data.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    data,
  });
};

const deleteSellingUnit = async (id) => {
    return request(`/selling-units/delete/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });
  };
  
export { getSellingUnits, createSellingUnit, updateSellingUnit, deleteSellingUnit };
