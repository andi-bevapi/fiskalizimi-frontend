import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { TextField } from '@mui/material';
import IconButtonComponent from '../Button/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  tableCell: {
    padding: '5px 4px',
  },
  btnContainer: {
    display: 'flex',
  },
}));

const TableComponent = (props) => {
  const classes = useStyles();

  const handleChanges = (e, index, key) => {
    props.setData((prevState) => {
      prevState[index][`${key}`] = e.target.value;
      return [...prevState];
    });
  };

  const handleEditButton = (e, id) => {
    const item = props.data.filter((el) => el.id === id);
    props.setElement({ ...item[0] });
  };

  props.data.map((body, index) => {
    //  console.log("header-----",index);
  })

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
          {props.data.map((subDataFromComponent, index) => (
            <TableRow
              key={index}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
              id={subDataFromComponent.id}
            >
              {Object.keys(subDataFromComponent).map((key, idx) => (
                <TableCell key={idx}>
                  {key === 'id' ? (
                    <Typography>{index + 1}</Typography>
                  ) : key === 'image' ? (
                    <Typography>photo</Typography>
                  ) : (
                    <TextField
                      key={idx}
                      value={subDataFromComponent[key]}
                      disabled={subDataFromComponent.id == props.element.id ? false : true}
                      onChange={(e) => {
                        handleChanges(e, index, key);
                      }}
                      inputProps={{ style: { padding: 12, width: 160, height: 10} }}
                    />
                  )}
                </TableCell>
              ))}
              <TableCell className={classes.tableCell}>
                <div className={classes.btnContainer}>
                  {subDataFromComponent.id != props.element.id || props.element.id == 0 ? (
                    <IconButtonComponent
                      style={{
                        backgroundColor: props.element.id != 0 ? 'rgba(0, 0, 0, 0.08)' : '#ffa500',
                        marginRight: '10px',
                      }}
                      icon={<EditIcon />}
                      disabled={props.element.id == 0 ? false : true}
                      iconColor={{
                        color: props.element.id != 0 ? 'grey' : 'white',
                      }}
                      onClick={(e) => handleEditButton(e, subDataFromComponent.id)}
                    />
                  ) : (
                    <IconButtonComponent
                      style={{
                        backgroundColor: 'green',
                        marginRight: '10px',
                      }}
                      icon={<CheckIcon />}
                      iconColor={{ color: 'white' }}
                      onClick={props.handleEditElement}
                    />
                  )}
                  <IconButtonComponent
                    style={{
                      backgroundColor: '#f05050',
                      marginRight: '10px',
                    }}
                    icon={<DeleteForeverIcon />}
                    iconColor={{ color: 'white' }}
                    onClick={(e) => props.handleAsk(subDataFromComponent.id)}
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
