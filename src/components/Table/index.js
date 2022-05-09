import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import HistoryIcon from '@mui/icons-material/History';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles';
import { useState, useEffect } from 'react';
import SidebarAction from '../../components/SidebarAction';
import IconButtonComponent from '../Button/IconButton';
import { SwalModal } from '../Modal/SwalModal';
import SnackbarComponent from '../Snackbar';
import { Access, useAccess } from 'umi';
import { useTranslation } from 'react-i18next';
import Moment from 'moment';
import ModalComponent from '../Modal/Modal';
import i18n from 'i18next';

const useStyles = makeStyles(() => ({
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  tableCell: {
    padding: '5px 4px',
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  spinContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 40,
  },
}));

const TableComponent = (props) => {
  const classes = useStyles();
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState({ status: false, message: '' });
  const [editItem, setEditItem] = useState(null);
  const [openHistoryModal, setOpenHistoryModal] = useState(false);
  const [arkaHistoryData, setArkaHistoryData] = useState([]);
  const { t } = useTranslation();
  const access = useAccess();

  const [tableHeader, setTableHeader] = useState([]);

  useEffect(() => {
    const filteredTableHeader = props.tableHeaders.filter((el) => el !== 'id');
    setTableHeader(filteredTableHeader);
  }, []);

  const handleSnackBarClose = () => {
    setOpenSnackBar({ status: false, severity: 'success' });
  };

  const handleCreate = () => {
    setOpenSideBar(true);
  };

  const handleHistoryButton = async (id) => {
    const response = await props.history(id);
    if (response.statusCode === 200) {
      setArkaHistoryData(response.data);
      setOpenHistoryModal(true);
    } else
      setOpenSnackBar({
        status: true,
        message: 'A problem occurred while trying to get arka history',
        severity: 'error',
      });
  };

  const toggleModal = () => {
    setOpenHistoryModal(!openHistoryModal);
  };

  const columns = [
    tableHeader.map((el) => {
      return {
        field: el,
        headerName: i18n.t(el),
        width: 120,
      };
    }),
    {
      field: 'actions',
      headerName: i18n.t('actions'),
      width: 120,
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
          setViewInvoice(true);
          setSelectedRow(params.row);
        };

        const handleEditButton = () => {
          setOpenSideBar(true);
          const foundItem = props.fullList.find((item) => item.id === params.id);
          setEditItem(foundItem);
        };

        const confirmDelete = async () => {
          const response = await props.delete(params.id);
          setOpenSnackBar({ status: true, message: response.message, severity: 'success' });
        };
      
        const handleDelete = async () => {
          return SwalModal(
            'Deshironi ta fshini?',
            '',
            'warning',
            'JO',
            'PO',
            () => {},
            () => confirmDelete(params.id),
            params.id,
          );
        };

        return (
          <div className={classes.btnContainer}>
            {props.arka && (
              <IconButtonComponent
                style={{
                  backgroundColor: '#ffa500',
                  marginRight: '10px',
                }}
                icon={<HistoryIcon />}
                iconColor={{ color: 'white' }}
                onClick={ handleHistoryButton}
              />
            )}
            <Access accessible={access[props.acceses['update']]}>
              <IconButtonComponent
                style={{
                  backgroundColor: '#ffa500',
                  marginRight: '10px',
                }}
                icon={<EditIcon />}
                iconColor={{ color: 'white' }}
                onClick={handleEditButton}
                text={t('edit')}
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
                onClick={handleDelete}
                text={t('delete')}
              />
            </Access>
          </div>
        );
      },
    },
  ];

  console.log(columns);

  return (
    <>
      <SnackbarComponent
        message={openSnackBar.message}
        open={openSnackBar.status}
        handleSnackBarClose={handleSnackBarClose}
        severity={openSnackBar.severity}
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
        product={props.product}
        permissions={props.permissions}
        setPermissions={props.setPermissions}
        contexts={props.contexts}
        arka={props.arka}
      />

      <ModalComponent
        open={openHistoryModal}
        handleClose={toggleModal}
        title="Arka History For Today"
      >
        <TableContainer sx={{ fontSize: '14px' }}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  th: { padding: '16px 6px', fontFamily: 'Poppins' },
                }}
              >
                <TableCell className={classes.tableCell}>{t('Amount')}</TableCell>
                <TableCell className={classes.tableCell}>{t('action')}</TableCell>
                <TableCell className={classes.tableCell}>{t('actionTime')}</TableCell>
                <TableCell className={classes.tableCell}>{t('Username')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {arkaHistoryData.map((item, index) => (
                <TableRow
                  key={item.id}
                  sx={{
                    td: { padding: '16px 6px', fontFamily: 'Poppins' },
                  }}
                  id={item.id}
                >
                  {Object.keys(item).map((key, idx) => {
                    if (key.toLowerCase().includes('time'))
                      return (
                        <TableCell key={idx}>
                          {Moment(new Date(item[key])).format('DD/MM/YYYY')}
                        </TableCell>
                      );
                    if (key === 'user')
                      return <TableCell key={idx}>{item[key].username}</TableCell>;
                    if (key !== 'id') return <TableCell key={idx}>{item[key]}</TableCell>;
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ModalComponent>

      <div className={classes.headerContainer}>
        <h1>{props.title}</h1>
        <Access accessible={access[props.acceses['create']]}>
          <Button variant="contained" onClick={handleCreate}>
            {t('add')} <AddIcon />
          </Button>
        </Access>
      </div>

      {props.isLoading ? (
        <div className={classes.spinContainer}>
          <CircularProgress />
        </div>
      ) : (
        // <TableContainer sx={{ fontSize: '14px' }}>
        //   <Table stickyHeader aria-label="simple table">
        //     <TableHead>
        //       <TableRow
        //         sx={{
        //           th: { padding: '16px 6px', fontFamily: 'Poppins' },
        //         }}
        //       >
        //         <TableCell className={classes.tableCell}>{t("no")}</TableCell>
        //         {props.tableHeaders.map((header, index) => {
        //           if (header !== 'Id')
        //             return (
        //               <TableCell
        //                 key={index}
        //                 className={classes.tableCell}
        //                 style={
        //                   index === props.tableHeaders.length - 1
        //                     ? { textAlign: 'right', paddingRight: 20 }
        //                     : {}
        //                 }
        //               >
        //                 {t(header)}
        //               </TableCell>
        //             );
        //         })}
        //       </TableRow>
        //     </TableHead>
        //     <TableBody>
        //       {props.data.map((item, index) => (
        //         <TableRow
        //           key={item.id}
        //           sx={{
        //             td: { padding: '16px 6px', fontFamily: 'Poppins' },
        //           }}
        //           id={item.id}
        //         >
        //           <TableCell className={classes.tableCell}>{index + 1}</TableCell>
        //           {Object.keys(item).map((key, idx) => {
        //             if (key.toLowerCase().includes('valid'))
        //               return (
        //                 <TableCell key={idx}>
        //                   {Moment(new Date(item[key])).format('DD/MM/YYYY')}
        //                 </TableCell>
        //               );
        //             if (key !== 'id') return <TableCell key={idx}>{item[key]}</TableCell>;
        //           })}

        //           <TableCell className={classes.tableCell}>
        //             <div className={classes.btnContainer}>
        //               {props.arka && (
        //                 <IconButtonComponent
        //                   style={{
        //                     backgroundColor: '#ffa500',
        //                     marginRight: '10px',
        //                   }}
        //                   icon={<HistoryIcon />}
        //                   iconColor={{ color: 'white' }}
        //                   onClick={(e) => handleHistoryButton(item.id)}
        //                 />
        //               )}
        //               <Access accessible={access[props.acceses['update']]}>
        //                 <IconButtonComponent
        //                   style={{
        //                     backgroundColor: '#ffa500',
        //                     marginRight: '10px',
        //                   }}
        //                   icon={<EditIcon />}
        //                   iconColor={{ color: 'white' }}
        //                   onClick={(e) => handleEditButton(item.id)}
        //                   text={t("edit")}
        //                 />
        //               </Access>

        //               <Access accessible={access[props.acceses['delete']]}>
        //                 <IconButtonComponent
        //                   style={{
        //                     backgroundColor: '#f05050',
        //                     marginRight: '10px',
        //                   }}
        //                   icon={<DeleteForeverIcon />}
        //                   iconColor={{ color: 'white' }}
        //                   onClick={(e) => handleDelete(item.id)}
        //                   text={t("delete")}
        //                 />
        //               </Access>
        //             </div>
        //           </TableCell>
        //         </TableRow>
        //       ))}
        //     </TableBody>
        //   </Table>
        // </TableContainer>

        <div style={{ height: '60vh', width: '100%' }}>
          <DataGrid
            rows={props.data}
            columns={[...columns[0], columns[1]]}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </div>
      )}
    </>
  );
};

export default TableComponent;
