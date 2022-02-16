import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { TextField, Typography } from '@mui/material';
import IconButtonComponent from '../Button/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  tableCell: {
    padding: '5px 4px',
  },
  chooseBtn: {
    backgroundColor: ' #5d9cec',
    color: 'white',
    borderRadius: '3px',
    boxShadow: 'none',
    textTransform: 'none',
    padding: '1.4px',
    display: 'none',
  },
  filtersContainer: {
    display: 'flex',
  },
}));

const TableComponent = (props) => {
  const classes = useStyles();

  const handleChanges = (e, id, index, key) => {
    console.log(id);
    console.log("INDEX", index);
    const item = props.dataFromComponent.filter((el) => el.id === id);
    props.setElement(item[0]);
    props.setData((prevState) => {
      console.log(prevState[index]);
      prevState[index] [`${key}`] = e.target.value;
      return [...prevState];
    });
  };

  return (
    <TableContainer sx={{ fontSize: '14px' }}>
      <Table stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            {props.tableHeaders.map((header, index) => (
              <TableCell key={index} className={classes.tableCell}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.dataFromComponent.map((subDataFromComponent, index) => (
            <TableRow
              key={index.toString()}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
              id={subDataFromComponent.id}
            >
              {/* <TableCell key={index}>{index}</TableCell> */}
              {Object.keys(subDataFromComponent).map((key, idx) => (
                <>
                  {key === 'image' ? (
                    <TableCell key={idx}>photo</TableCell>
                  ) : (
                    <TableCell key={idx}>
                      <TextField
                        id={idx}
                        value={subDataFromComponent[key]}
                        onChange={(e) => {
                          handleChanges(e, subDataFromComponent.id, index, key);
                        }}
                        inputProps={{ style: { padding: 12, width: 180 } }}
                      />
                    </TableCell>
                  )}
                </>
                // return (
                //   <TableCell key={index}>
                //     <TextField
                //       id={index}
                //       value={subDataFromComponent[key]}
                //       // disabled={product.edit}
                //       inputProps={{ style: { padding: 12, width: 180 } }}
                //       // onChange={(e) => handleEditField(e, index)}
                //     />
                //   </TableCell>
                // );
              ))}
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
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
