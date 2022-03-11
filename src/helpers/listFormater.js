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
