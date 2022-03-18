import { useState } from 'react';
import {Table,TableBody,TableCell, TableContainer,TableHead,TableRow,Typography} from '@mui/material';
import { TextField } from '@mui/material';
import IconButtonComponent from '../Button/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { makeStyles } from '@mui/styles';
import { SidebarAction } from '../../components/SidebarAction';
import { Snackbar } from '@mui/material';
import { SwalModal } from '../Modal/SwalModal';

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
  const [openSideBar , setOpenSideBar] = useState(false);
  const [dataToEdit,setDataToEdit] = useState([]);
  const [openSnackBar, setOpenSnackBar] = useState({status:false,message:""});

  const handleChanges = (e, index, key) => {
    props.setData((prevState) => {
      prevState[index][`${key}`] = e.target.value;
      return [...prevState];
    });
  };

  const handleEditButton = (e, id) => {
    props.setFromCreate(false);
    const item = props.data.filter((el) => el.id === id);
    setDataToEdit(item);
    setOpenSideBar(true);
  };

  const handleSnackBarClose = () =>{
    setOpenSnackBar({status:false});
  }

  const handleClose = () => {};


  const confirmDelete =  async(id) => {
    props.setData((prevState) =>{
      const tmp = prevState.filter((el)=> el.id !== id);
      return [...tmp];
    })
    const deleteItem =  await props.delete(id);
    setOpenSnackBar({status:true , message:deleteItem.message});
    return deleteItem;
  }

  const handleAsk = async(id) => {
    SwalModal(
      "Deshironi ta fshini ?",
      "kete produkt",
      "warning",
      "jo",
      "po",
      handleClose,
      confirmDelete,
      id
    );
    return;
  };

  return (
    <>
    <Snackbar
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
        }}
        message={openSnackBar.message}
        open={openSnackBar.status}
        autoHideDuration={8000}
        onClose={handleSnackBarClose}>
        </Snackbar>

      { 
          props.fromCreate === true ?(<SidebarAction open={props.openSidebarOnCreate} onCreate={"onCreate"} setState={props.setOpnSideOnCreate} headers={props.tableHeaders}/>) :
          ( <SidebarAction open={openSideBar} setState={setOpenSideBar} data={dataToEdit} categories={props.categories} set={setDataToEdit} update={props.update}/>)
         
      }
    <TableContainer sx={{ fontSize: '14px' }}>
      <Table stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell}>Nr</TableCell>
            {props.tableHeaders.map((header, index) => {
                if(header !== "Id" && header !== "branchId")
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
                  if(key !== 'id' && key !== "branchId"){
                    return(
                      <TableCell key={idx}>
                        {key !== 'id' && <Typography>key {key}</Typography>}
                        {key === 'imageVirtualPath' ? (
                          <img src={subDataFromComponent[key]}/>
                        ) : (
                          <TextField
                            key={idx}
                            value={subDataFromComponent[key]}
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
                    <IconButtonComponent
                    style={{
                      backgroundColor:'#ffa500',
                      marginRight: '10px',
                    }}
                    icon={<EditIcon />}
                    iconColor={{color:'white'}}
                    onClick={(e) => handleEditButton(e, subDataFromComponent.id)}
                  />
                
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
