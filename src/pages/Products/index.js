import TableComponent from '../../components/Table';
import { TableCell, TableRow, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButtonComponent from '../../components/Button/IconButton';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';

const useStyles = makeStyles(() => ({
  tableCell: {
    padding: '5px 4px',
  },
}));

const Products = () => {
  const tableHeaders = ['Nr.', 'Image', 'Barcode', 'Name', 'Price', 'Stock', 'Category', 'Actions'];
  const [dataFromComponent, setDataFromComponent] = useState([
    { id: 1, image: "foto", barcode: '81767', name: 'vodka', price: '100', stock: '10', category: 'pije' },
    { id: 2, image: "foto", barcode: '817s367', name: 'uje', price: '100', stock: '10', category: 'pije' },
    { id: 3, image: "foto", barcode: '817', name: 'birra', price: '100', stock: '10', category: 'pije' },
  ]);
  const classes = useStyles();

  const [element, setElement] = useState({});


  console.log("The element is this *-*-*-*-*-*-*-", element)

  return (
    <div>
      <h1>Products Component</h1>
      <TableComponent
        tableHeaders={tableHeaders}
        dataFromComponent={dataFromComponent}
        setData={setDataFromComponent}
        element={element}
        setElement={setElement}
      >
        {/* {dataFromComponent.map((subDataFromComponent, index) => (
          <TableRow
            key={index.toString()}
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
            }}
            id={subDataFromComponent.id}
          >
            {Object.keys(subDataFromComponent).map((key, index) => {
              return (
                <TableCell key={index}>
                  <TextField
                    id={index}
                    value={subDataFromComponent[key]}
                    // disabled={product.edit}
                    inputProps={{ style: { padding: 12, width: 180 } }}
                    // onChange={(e) => handleEditField(e, index)}
                  />
                </TableCell>
              );
            })}

            <TableCell className={classes.tableCell}>
              <div>
                <IconButtonComponent
                  style={{
                    backgroundColor: '#ffa500',
                    marginRight: '10px',
                  }}
                  icon={<EditIcon />}
                  //   disabled={editing}
                  iconColor={{
                    color: 'white',
                  }}
                  //   onClick={(e) => handleEditButton(e, index)}
                />
                <IconButtonComponent
                  style={{
                    backgroundColor: '#f05050',
                    marginRight: '10px',
                  }}
                  icon={<DeleteForeverIcon />}
                  iconColor={{ color: 'white' }}
                  //   onClick={(e) => handleAsk(product.id)}
                />
              </div>
            </TableCell>
          </TableRow>
        ))} */}
      </TableComponent>
    </div>
  );
};

export default Products;
