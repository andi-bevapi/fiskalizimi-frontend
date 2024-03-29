import request from '../../utils/request';

const getSuppliersList = (branchId) => {
  return request(`/supplier/${branchId}`, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('poslaToken'),
    },
  });
};

const getSuppliersListByClientId = (clientId) => {
  return request(`/supplier/clientId/${clientId}`, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('poslaToken'),
    },
  });
};

const createSupplier = async (clientId, data) => {
  return request('/supplier/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: {
      clientId,
      ...data
    },
  });
};

const updateSupplier = async (branchId, data) => {
  return request(`/supplier/update/${data.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    data: {
      branchId,
      ...data
    }
  });
};

const deleteSupplier = async (id) => {
  return request(`/supplier/delete/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  });
};

export { getSuppliersList, createSupplier, updateSupplier, deleteSupplier, getSuppliersListByClientId };
