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
import BootstrapInputField from '../../components/InputFields/BootstrapTextField';

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
    props.setOpenForm();
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
                  ) : key.toLowerCase().includes('date') ? (
                    <TextField
                      key={idx}
                      value={new Date(subDataFromComponent[key]).toLocaleString()}
                      disabled={subDataFromComponent.id == props.element.id ? false : true}
                      inputProps={{ style: { padding: 12, width: 160, height: 10 } }}
                    />
                  ) : (
                    <BootstrapInputField
                      defaultValue={subDataFromComponent[key]}
                      disabled={true}
                      placeholder="Name"
                      id="name"
                      style={{margin: 0}}
                    />
                  )}
                </TableCell>
              ))}
              <TableCell className={classes.tableCell}>
                <div className={classes.btnContainer}>
                  <IconButtonComponent
                    style={{
                      backgroundColor: '#ffa500',
                      marginRight: '10px',
                    }}
                    icon={<EditIcon />}
                    iconColor={{
                      color: 'white',
                    }}
                    onClick={(e) => handleEditButton(e, subDataFromComponent.id)}
                  />
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
