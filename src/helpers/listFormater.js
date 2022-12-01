import i18n from 'i18next';

export const listFormat = (data, tableHeaders) => {
  tableHeaders = tableHeaders.map((h) => h.toLowerCase());
  const newList = data.map((_arrayElement) => {

    if(_arrayElement.TCRCODE){
      Object.keys(_arrayElement).forEach((item) => {
        if (typeof _arrayElement[item] === 'object'){
         let initialState = _arrayElement[item].find((el,index)=>{
            return el.action === "INITIAL";
         });
         let currentSume = 0;
         _arrayElement[item].forEach((el) =>{
          if(el.action === "WITHDRAW"){
            currentSume = initialState.totalAmount - el.totalAmount;
            } else if(el.action === "DEPOSIT"){
              currentSume = initialState.totalAmount - el.totalAmount;
            }
        });
          _arrayElement[item] = currentSume;
        }
      });
    }
    return Object.assign({}, _arrayElement);
  });

  newList.forEach((el) => {
    Object.keys(el).forEach((item) => {
      if (!tableHeaders.includes(item.toLowerCase())) delete el[item];
      if (typeof el[item] === 'object') el[item] = el[item].name;

      if (item === 'vat') {
        switch (el[item]) {
          case 0:
            el[item] = i18n.t('excludedFromVat');
            break;
          case 1:
            el[item] = i18n.t('vat_6');
            break;
          case 2:
            el[item] = i18n.t('vat_20');
            break;
          case 3:
            el[item] = i18n.t('no_vat');
            break;
          default:
            el[item] = 'default';
        }
      } else if(item === "validFrom" || item === "validTo"){
        el[item] = new Date(el[item]).toISOString().slice(0, 10);
      }
    });
  });
  return newList;
};

export const permissionFormat = (permissions) => {
  let newPermissions = {};
  permissions.map((permission) => {
    let entity = permission.name.split('.')[1];
    if (!newPermissions.hasOwnProperty(entity)) {
      permission.label = i18n.t('view');
      let entityObj = {
        label: entity,
        permissions: [permission],
      };
      newPermissions[entity] = entityObj;
    } else {
      if (permission.name.includes('create')) {
        permission.label = i18n.t('create');
      } else if (permission.name.includes('update')) {
        permission.label = i18n.t('update');
      } else {
        permission.label = i18n.t('delete');
      }
      newPermissions[entity].permissions.push(permission);
    }
  });
  return newPermissions;
};
