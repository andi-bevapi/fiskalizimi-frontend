import { DataGrid } from '@mui/x-data-grid';
import { useModel } from 'umi';

import i18n from "i18next";

const NotFiskalizedInvoices = (props) => {
    const { initialState, refresh } = useModel('@@initialState');
    const id = initialState?.currentUser?.branchId;

  const columns =  id ? [
    { field: 'invoiceCode', headerName: i18n.t('billCode'), width: 150 },
    { field: 'totalAmount', headerName: i18n.t('totalValue'), width: 150 },
    {
      field: 'totalAmountNoVAT',
      headerName: i18n.t('totalValueNoVat'),
      width: 150,
      renderCell: (params) => {
        return params.row.totalAmountNoVAT.toFixed(2);
      },
    },
    { field: 'totalVat', headerName: i18n.t('totalValueWithVat'), width: 120 },
    { field: 'totalVat6', headerName: i18n.t('totalValueVat_6'), width: 120 },
    { field: 'totalVat20', headerName: i18n.t('totalValueVat_20'), width: 120 },
    { field: 'description', headerName: i18n.t('descriptionLabel'), width: 120 },
    { field: 'paymentMethod', headerName: i18n.t('paymentMethod'), width: 120 },
    { field: 'dateTime', headerName: i18n.t('billDate'), width: 120 },
    { field: 'NSLF', headerName: i18n.t('nslf'), width: 120 },
  ] : [
    { field: 'invoiceCode', headerName: i18n.t('billCode'), width: 150 },
    { field: 'totalAmount', headerName: i18n.t('totalValue'), width: 60 },
    {
      field: 'totalAmountNoVAT',
      headerName: i18n.t('totalValueNoVat'),
      width: 180,
      renderCell: (params) => {
        return params.row.totalAmountNoVAT.toFixed(2);
      },
    },
    { field: 'totalVat', headerName: i18n.t('totalValueWithVat'), width: 60 },
    { field: 'totalVat6', headerName: i18n.t('totalValueVat_6'), width: 60 },
    { field: 'totalVat20', headerName: i18n.t('totalValueVat_20'), width: 60 },
    { field: 'description', headerName: i18n.t('descriptionLabel'), width: 60 },
    { field: 'paymentMethod', headerName: i18n.t('paymentMethod'), width: 60 },
    { field: 'dateTime', headerName: i18n.t('billDate'), width: 60 },
    { field: 'NSLF', headerName: i18n.t('nslf'), width: 60 },
    {field: 'operatorCode', headerName: i18n.t('operatorCode'), width: 60 },
    {field: 'branchCode', headerName: i18n.t('branchCodeReport'), width: 60 },
    {
        field: 'branch', 
        headerName: i18n.t('branch'), 
        width: 60,
        renderCell: (params) => {
            return params.row.branch.name
          },  
    }
  ];

  return (
    <>
      <div style={{ height: '70vh', width: '100%' }}>
        <DataGrid
          rows={props.invoices}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
    </>
  );
};

export default NotFiskalizedInvoices;
