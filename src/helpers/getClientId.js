export const getClientId = (currentUser) => {
  if (currentUser?.clientId === 0) return +localStorage.getItem('clientId');
  return currentUser.clientId;
};
