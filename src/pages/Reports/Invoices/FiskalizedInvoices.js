import { DataGrid } from '@mui/x-data-grid';
<<<<<<< HEAD
import { useModel } from 'umi';

import i18n from "i18next";

const FiskalizedInvoices = (props) => {
    const { initialState, refresh } = useModel('@@initialState');
    const id = initialState?.currentUser?.branchId;

  const columns =  id ? [
    { field: 'invoiceCode', headerName: i18n.t('billCode'), width: 120 },
    { field: 'totalAmount', headerName: i18n.t('totalValue'), width: 120 },
    {
      field: 'totalAmountNoVAT',
      headerName: i18n.t('totalValueNoVat'),
      width: 180,
      renderCell: (params) => {
        return params.row.totalAmountNoVAT.toFixed(2);
      },
    },
    { field: 'totalVat', headerName: i18n.t('totalValueWithVat'), width: 150 },
    { field: 'totalVat6', headerName: i18n.t('totalValueVat_6'), width: 150 },
    { field: 'totalVat20', headerName: i18n.t('totalValueVat_20'), width: 120 },
    { field: 'description', headerName: i18n.t('descriptionLabel'), width: 120 },
    { field: 'paymentMethod', headerName: i18n.t('paymentMethod'), width: 120 },
    { field: 'dateTime', headerName: i18n.t('billDate'), width: 120 },
    { field: 'NSLF', headerName: i18n.t('nslf'), width: 120 },
    { field: 'FIC', headerName: i18n.t('fic'), width: 120 }
  ] : [
    { field: 'invoiceCode', headerName: i18n.t('billCode'), width: 120 },
    { field: 'totalAmount', headerName: i18n.t('totalValue'), width: 120 },
    {
      field: 'totalAmountNoVAT',
      headerName: i18n.t('totalValueNoVat'),
      width: 180,
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
    { field: 'FIC', headerName: i18n.t('fic'), width: 120 },
    {field: 'operatorCode', headerName: i18n.t('operatorCode'), width: 120 },
    {field: 'branchCode', headerName: i18n.t('branchCodeReport'), width: 120 },
    {
        field: 'branch', 
        headerName: i18n.t('branch'), 
        width: 120,
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

export default FiskalizedInvoices;
=======
import i18n from "i18next";
import { useModel } from 'umi';

const FiscalizedInvoice = (props) =>{
    const { initialState } = useModel('@@initialState');

    //rasti 1 useri ka branchid: fic,nslf,dateTime,description,invoiceCode,operatorCode,paymentMethod
    //totalAmount ,totalAmountNoVAT,totalVat,totalVat6 totalVat20

    //rasti 2 useri nuk ka branchid: branch.name , branchCode fic,nslf,dateTime,description,invoiceCode,operatorCode,paymentMethod
    //totalAmount ,totalAmountNoVAT,totalVat,totalVat6 totalVat20

    const columns = [
        { field: 'FIC', headerName: i18n.t('FIC'), width: 50 },
        { field: 'NSLF', headerName: i18n.t('NSLF'), width: 50 },
        { field: 'dateTime', headerName: i18n.t('dateTime'), width: 50 },
        { field: 'description', headerName: i18n.t('descriptionNsfl'), width: 100 },
        { field: 'invoiceCode', headerName: i18n.t('invoiceCode'), width: 100 },
        { field: 'operatorCode', headerName: i18n.t('operatorCode'), width: 50 },
        { field: 'paymentMethod', headerName: i18n.t("paymentMethod"), width: 50 },
        { field: 'totalAmount', headerName: i18n.t('totalAmount'), width: 80 },
        { field: 'totalAmountNoVAT', headerName: i18n.t('totalAmountNoVAT'), width: 120 },
        { field: 'totalVat', headerName: i18n.t('totalVat'), width: 50 },
        { field: 'totalVat6', headerName: i18n.t("totalVat6"), width: 50 },
        { field: 'totalVat20', headerName: i18n.t("totalVat20"), width: 50 }
    ];

    // initialState?.currentUser.branchId ? null  : 
    // (
    //     () => (
    //         { field: 'branchName', headerName: i18n.t('FIC'), width: 50 },
    //         { field: 'branchCode', headerName: i18n.t('FIC'), width: 50 }
    //     )
    // )

    console.log("initialState----",initialState?.currentUser);
    console.log("props.invoices----",props.invoices);

    return(
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
    )
}

export default FiscalizedInvoice;
>>>>>>> 475d55533b94c19899e397a61484adcc45655d4c
