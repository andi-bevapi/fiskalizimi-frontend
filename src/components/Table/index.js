import { useState } from 'react';
import {Table,TableBody,TableCell, TableContainer,TableHead,TableRow,Typography} from '@mui/material';
import { TextField } from '@mui/material';
import IconButtonComponent from '../Button/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { makeStyles } from '@mui/styles';
import { SidebarAction } from '../../components/SidebarAction';

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

  const handleChanges = (e, index, key) => {
    props.setData((prevState) => {
      prevState[index][`${key}`] = e.target.value;
      return [...prevState];
    });
  };

  const handleEditButton = (e, id) => {
    const item = props.data.filter((el) => el.id === id);
    setDataToEdit(item);
    setOpenSideBar(true);
  };

  const handleSubmitElement = (e,id) =>{
    const item = props.data.filter((el) => el.id === id);
  }

  const handleAsk = (id) => {
    
  };

  return (
    <>
    <SidebarAction open={openSideBar} setState={setOpenSideBar} data={dataToEdit} categories={props.categories} set={props.setData}/>
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
