const pageWidth = (elements, property) => {
  //console.log("elements-----",elements);
  //console.log("property-------",property);

  // return {
  //     field: elements,
  //     headerName: elements,
  //     //width : el === "price" ? 20 : 140
  //     //width: props.product ? 120 : 200,
  //     width: 120
  //   }
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
    default:
      customWidth = 120;
  }
  return Object.assign({}, { field: elements, headerName: elements, width: customWidth });
};

export default pageWidth;
