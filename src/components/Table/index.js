import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import SidebarAction from '../../components/SidebarAction';
import IconButtonComponent from '../Button/IconButton';
import { SwalModal } from '../Modal/SwalModal';
import SnackbarComponent from '../Snackbar';
import { Access, useAccess } from 'umi';

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
    justifyContent: 'flex-end'
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
  const { t } = useTranslation();
  const access = useAccess();

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
        user={props.user}
        permissions={props.permissions}
        setPermissions={props.setPermissions}
        contexts={props.contexts}
      />

      <div className={classes.headerContainer}>
        <h1>{props.title}</h1>
        <Access accessible={access[props.acceses['create']]}>
          <Button variant="contained" onClick={handleCreate}>Shto <AddIcon /></Button>
        </Access>
      </div>

      {props.isLoading ? (
        <div className={classes.spinContainer}>
          <CircularProgress />
        </div>
      ) : (
        <TableContainer sx={{ fontSize: '14px' }}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  'th': { padding: '16px 6px' },
                }}
              >
                <TableCell className={classes.tableCell}>Nr</TableCell>
                {props.tableHeaders.map((header, index) => {
                  if (header !== 'Id') return <TableCell key={index} className={classes.tableCell} style={index === props.tableHeaders.length - 1 ? { textAlign: 'right', paddingRight: 20 } : {}}>{t(header)}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data.map((item, index) => (
                <TableRow
                  key={item.id}
                  sx={{
                    'td': { padding: '16px 6px'},
                  }}
                  id={item.id}
                >
                  <TableCell className={classes.tableCell}>{index + 1}</TableCell>
                  {Object.keys(item).map((key, idx) => {
                    if (key !== 'id') return <TableCell key={idx}>{item[key]}</TableCell>
                  })}

                  <TableCell className={classes.tableCell}>
                    <div className={classes.btnContainer}>
                      <Access accessible={access[props.acceses['update']]}>
                        <IconButtonComponent
                          style={{
                            backgroundColor: '#ffa500',
                            marginRight: '10px',
                          }}
                          icon={<EditIcon />}
                          iconColor={{ color: 'white' }}
                          onClick={(e) => handleEditButton(item.id)}
                        />
                      </Access>

                      <Access accessible={access[props.acceses['delete']]}>
                        <IconButtonComponent
                          style={{
                            backgroundColor: '#f05050',
                            marginRight: '10px',
                          }}
                          icon={<DeleteForeverIcon />}
                          iconColor={{ color: 'white' }}
                          onClick={(e) => handleDelete(item.id)}
                        />
                      </Access>
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
