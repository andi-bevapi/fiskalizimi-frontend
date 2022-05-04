import request from '../../utils/request';

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

export { getLastAmount, updateSavedAmount };
