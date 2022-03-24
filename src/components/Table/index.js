import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import SidebarAction from '../../components/SidebarAction';
import IconButtonComponent from '../Button/IconButton';
import { SwalModal } from '../Modal/SwalModal';
import SnackbarComponent from '../Snackbar';
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles(() => ({
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  tableCell: {
    padding: '5px 4px',
  },
  btnContainer: {
    display: 'flex',
  },
  spinContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 40
  }
}));

const TableComponent = (props) => {
  const classes = useStyles();
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState({ status: false, message: "" });
  const [editItem, setEditItem] = useState(null);

  const handleEditButton = (id) => {
    setOpenSideBar(true);
    const foundItem = props.fullList.find(item => item.id === id);
    setEditItem(foundItem);
  };

  const handleSnackBarClose = () => {
    setOpenSnackBar({ status: false });
  }

  const confirmDelete = async (id) => {
    const response = await props.delete(id);
    setOpenSnackBar({ status: true, message: response.message });
  }

  const handleDelete = async (id) => {
    return SwalModal(
      "Deshironi ta fshini?",
      "",
      "warning",
      "JO",
      "PO",
      () => { },
      () => confirmDelete(id),
      id
    );
  };

  const handleCreate = () => {
    setOpenSideBar(true);
  }

  return (
    <>
      <SnackbarComponent
        message={openSnackBar.message}
        open={openSnackBar.status}
        handleSnackBarClose={handleSnackBarClose}
        severity={"success"}
      />

      <SidebarAction
        open={openSideBar}
        setOpenSideBar={setOpenSideBar}
        formFields={props.formFields}
        validationSchema={props.validationSchema}
        create={props.create}
        update={props.update}
        editItem={editItem}
        setEditItem={setEditItem}
        contexts={props.contexts}
      />

      <div className={classes.headerContainer}>
        <h1>{props.title}</h1>
        <Button variant="contained" onClick={handleCreate}>Shto <AddIcon /></Button>
      </div>

      {props.isLoading ? (
        <div className={classes.spinContainer}>
          <CircularProgress />
        </div>
      ) : (
        <TableContainer sx={{ fontSize: '14px' }}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableCell}>Nr</TableCell>
                {props.tableHeaders.map((header, index) => {
                  if (header !== 'Id') return <TableCell key={index} className={classes.tableCell}>{header} </TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data.map((item, index) => (
                <TableRow
                  key={item.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                  id={item.id}
                >
                  <TableCell className={classes.tableCell}>{index + 1}</TableCell>
                  {Object.keys(item).map((key, idx) => {
                    if (key !== 'id') return <TableCell key={idx}>{item[key]}</TableCell>
                  })}

                  <TableCell className={classes.tableCell}>
                    <div className={classes.btnContainer}>
                      <IconButtonComponent
                        style={{
                          backgroundColor: '#ffa500',
                          marginRight: '10px',
                        }}
                        icon={<EditIcon />}
                        iconColor={{ color: 'white' }}
                        onClick={(e) => handleEditButton(item.id)}
                      />

                      <IconButtonComponent
                        style={{
                          backgroundColor: '#f05050',
                          marginRight: '10px',
                        }}
                        icon={<DeleteForeverIcon />}
                        iconColor={{ color: 'white' }}
                        onClick={(e) => handleDelete(item.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default TableComponent;
