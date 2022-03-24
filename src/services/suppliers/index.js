import request from '../../utils/request';

const getSuppliersList = () => {
  return request('/supplier', {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });
};

const createSupplier = async (data) => {
  return request('/supplier/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data,
  });
};

const updateSupplier = async (data) => {
  return request(`/supplier/update/${data.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    data,
  });
};

export { getSuppliersList, createSupplier, updateSupplier };
