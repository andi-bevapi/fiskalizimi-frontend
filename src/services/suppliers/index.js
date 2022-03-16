import request from '../../utils/request';

export async function getSuppliersList() {
  return request('/supplier', {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });
}
