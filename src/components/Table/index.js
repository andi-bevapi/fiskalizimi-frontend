import { useState } from 'react';
import {Table,TableBody,TableCell, TableContainer,TableHead,TableRow,Typography} from '@mui/material';
import { TextField } from '@mui/material';
import IconButtonComponent from '../Button/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { makeStyles } from '@mui/styles';
import { SidebarACtion } from '../../components/SidebarAction';

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
  const [element, setElement] = useState({ id: 0 });
  const [openSideBar , setOpenSideBar] = useState(false);
  const [dataToEdit,setDataToEdit] = useState([]);

  const handleChanges = (e, index, key) => {
    props.setData((prevState) => {
      prevState[index][`${key}`] = e.target.value;
      return [...prevState];
    });
  };

  const handleEditButton = (e, id) => {
    const item = props.data.filter((el) => el.id === id);
    setElement({ ...item[0] });
    setOpenSideBar(true);
    setDataToEdit(item);
  };

  const handleSubmitElement = (e,id) =>{
    const item = props.data.filter((el) => el.id === id);
    setElement({ ...item[0] });
  }

  const handleAsk = (id) => {
    
  };

  console.log("element----",element);

  return (
    <>
    <SidebarACtion open={openSideBar} setState={setOpenSideBar} data={dataToEdit} element={setElement}/>
    <TableContainer sx={{ fontSize: '14px' }}>
      <Table stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell}>Nr</TableCell>
            {props.tableHeaders.map((header, index) => {
                if(header !== "Id")
                return(<TableCell key={index} className={classes.tableCell}>{header} </TableCell>)
              }
            )}
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
              <TableCell className={classes.tableCell}>{index + 1}</TableCell>
              {Object.keys(subDataFromComponent).map((key, idx) => {
                  if(key !== 'id'){
                    return(
                      <TableCell key={idx}>
                        {key !== 'id' && <Typography>key {key}</Typography>}
                        {key === 'imageVirtualPath' ? (
                          <img src={subDataFromComponent[key]}/>
                        ) : (
                          <TextField
                            key={idx}
                            value={subDataFromComponent[key]}
                            // disabled={subDataFromComponent.id == element.id ? false : true}
                            disabled={true}
                            onChange={(e) => {
                              handleChanges(e, index, key);
                            }}
                            inputProps={{ style: { padding: 12, width: 160, height: 10 } }}
                          />
                        )}
                      </TableCell>
                  )}
              })}
              <TableCell className={classes.tableCell}>
                <div className={classes.btnContainer}>
                  {subDataFromComponent.id !== element.id ? (
                    <IconButtonComponent
                    style={{
                      backgroundColor: element.id != 0 ? 'rgba(0, 0, 0, 0.08)' : '#ffa500',
                      marginRight: '10px',
                    }}
                    icon={<EditIcon />}
                    disabled={element.id == 0 ? false : true}
                    iconColor={{
                      color: element.id != 0 ? 'grey' : 'white',
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
                      onClick={(e) => handleSubmitElement(e,subDataFromComponent.id)}
                    />
                  )}
                  <IconButtonComponent
                    style={{
                      backgroundColor: '#f05050',
                      marginRight: '10px',
                    }}
                    icon={<DeleteForeverIcon />}
                    iconColor={{ color: 'white' }}
                    onClick={(e) => handleAsk(subDataFromComponent.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default TableComponent;
