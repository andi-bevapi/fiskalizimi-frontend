import { DataGrid } from '@mui/x-data-grid';
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