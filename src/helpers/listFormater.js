export const listFormat = (data, tableHeaders) => {
  tableHeaders = tableHeaders.map((h) => h.toLowerCase());
  const newList = data.map((_arrayElement) => Object.assign({}, _arrayElement));
  newList.forEach((el) => {
    Object.keys(el).forEach((item) => {
      if (!tableHeaders.includes(item.toLowerCase())) delete el[item];
      if (typeof el[item] === 'object') el[item] = el[item].name;
    });
  });
  return newList;
};

export const permissionFormat = (permissions) => {
  let newPermissions = {};
  permissions.map((permission) => {
    let entity = permission.name.split('.')[1];
    if (!newPermissions.hasOwnProperty(entity)) {
      permission.label = 'Shiko';
      let entityObj = {
        label: entity,
        permissions: [permission],
      };
      newPermissions[entity] = entityObj;
    } else {
      if (permission.name.includes('create')) {
        permission.label = 'Krijo';
      } else if (permission.name.includes('update')) {
        permission.label = 'Perditeso';
      } else {
        permission.label = 'Fshi';
      }
      newPermissions[entity].permissions.push(permission);
    }
  });
  return newPermissions;
};
