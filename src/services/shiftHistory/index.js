import request from '../../utils/request';

const getTodayShift = async (userId) => {
  return request(`/shift-history/${userId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
};

const updateShift = async (userId) => {
  return request(`/shift-history/update/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  });
};

export { updateShift, getTodayShift };
