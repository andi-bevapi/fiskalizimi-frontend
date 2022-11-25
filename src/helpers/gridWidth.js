import i18n from 'i18next';
const pageWidth = (elements, property) => {
  let customWidth = 0;
  switch (elements) {
    case 'name':
      customWidth = 150;
      break;
    case 'price':
      customWidth = 80;
      break;
    case 'barcode':
      customWidth = 130;
      break;
    case 'stock':
      customWidth = 80;
      break;
    case 'category':
      customWidth = 150;
      break;
      case 'supplier':
        customWidth = 150;
        break;
      case 'serialNumber':
        customWidth = 220;
        break;
    default:
      customWidth = 120;
  }
  return Object.assign({}, { field: elements, headerName: i18n.t(elements), width: customWidth });
};

export default pageWidth;
