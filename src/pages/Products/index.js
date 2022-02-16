import TableComponent from '../../components/Table';
import { TableCell, TableRow, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButtonComponent from '../../components/Button/IconButton';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  tableCell: {
    padding: '5px 4px',
  },
}));

const Products = () => {
  const tableHeaders = ['Nr.', 'Barcode', 'Name', 'Price', 'Stock', 'Category', 'Actions'];
  const products = [
    { id: 1, barcode: '81767', name: 'vodka', price: '100', stock: '10', category: 'pije' },
  ];
  const classes = useStyles();

  return (
    <div>
      <h1>Products Component</h1>
      <TableComponent tableHeaders={tableHeaders}>
        {products.map((product, index) => (
          <TableRow
            key={index.toString()}
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
            }}
            id={product.id}
          >
            <TableCell className={classes.tableCell}>{index + 1}</TableCell>
            <TableCell className={classes.tableCell}>{product.barcode}</TableCell>
            <TableCell component="th" scope="row" className={classes.tableCell}>
              <TextField
                id={JSON.stringify(product.id)}
                value={product.name}
                // disabled={product.edit}
                inputProps={{ style: { padding: 12, width: 180 } }}
                // onChange={(e) => handleEditField(e, index)}
              />
            </TableCell>
            <TableCell className={classes.tableCell}>
              <TextField
                type="number"
                id={JSON.stringify(product.id)}
                // disabled={product.edit}
                value={product.price}
                // onChange={(e) => handlePrice(e, index)}
                inputProps={{
                  style: { padding: 12, width: 80 },
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                }}
              />
            </TableCell>
            <TableCell className={classes.tableCell}>
              <TextField
                id={JSON.stringify(product.id)}
                // disabled={product.edit}
                value={product.stock}
                // onChange={(e) => handleStock(e, index)}
                inputProps={{
                  style: { padding: 12, width: 80 },
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                }}
              />
            </TableCell>
            <TableCell key={index} className={classes.tableCell}>
              <TextField
                id={JSON.stringify(product.id)}
                value={product.category}
                // disabled={product.edit}
                inputProps={{ style: { padding: 12, width: 180 } }}
                // onChange={(e) => handleEditField(e, index)}
              />
            </TableCell>
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
        ))}
      </TableComponent>
    </div>
  );
};

export default Products;
