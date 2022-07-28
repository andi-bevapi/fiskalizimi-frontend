import { DataGrid } from '@mui/x-data-grid'
import { useModel } from 'umi'
import i18n from 'i18next'
import InvoicePreview from '../../../components/InvoicePreview'
import { useTranslation } from 'react-i18next'
import { useEffect, useState, useRef } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Swal from 'sweetalert2'
import CorrectiveInvoice from './components/correctInvoice'
import Grid from '@mui/material/Grid'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateRangePicker from '@mui/lab/DateRangePicker';
import TextField from '@mui/material/TextField';
import { getAnalyticsData } from '../../../services/reports'
import { formatDate } from '../../../helpers/formatDate'
import CorrectiveInvoicePreview from '../../../components/InvoicePreview/correctiveInvoice'
import { useReactToPrint } from "react-to-print";
import { getClientId } from '../../../helpers/getClientId';
import pageTitle from "../../../helpers/pageTitle";

const NotFiskalizedInvoices = () => {
  const { initialState } = useModel('@@initialState')
  const id = initialState?.currentUser?.branchId
  const [viewInvoice, setViewInvoice] = useState(null)
  const [correctInvoice, setCorrectInvoice] = useState(false)
  const [selectedRow, setSelectedRow] = useState()
  const { t } = useTranslation()
  const [dateRange, setDateRange] = useState([new Date().toString(), new Date().toString()]);
  const [invoices, setInvoices] = useState();
  const [readyToPrint, setReadyToPrint] = useState(false);
  const [pageData,setPageData] = useState([]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    onBeforePrint:() => {
      setPageData((prevState) =>{
        document.title = pageTitle(selectedRow);
      })
    },
    onAfterPrint:() =>{ document.title = "Fiskalizimi"},
    content: () => componentRef.current
  });

  useEffect(()=>{
    getInvoices();
},[dateRange, selectedRow, readyToPrint]);

const getInvoices =  async() =>{
  const startDate = formatDate(dateRange[0]);
  const endDate = formatDate(dateRange[1]);
  try{
      const id = (getClientId(initialState?.currentUser) | initialState?.currentUser?.branchId);
      const result = await getAnalyticsData(id,{startDate,endDate});
      const noFicData = result.data.filter((el) => {
          if(!el.FIC){
              return el;
          }
      });
      setInvoices(noFicData);
  }catch(error){
      console.log("error-----",error);
  }
}

  const columns = id
    ? [
        { field: 'invoiceCode', headerName: i18n.t('billCode'), width: 150 },
        { field: 'isReturn', headerName: i18n.t('correctiveInvoice'), width: 120, align: 'center', background: '#ffecdb !important', renderCell: (params) => {
            if(params.row.isReturn){ return 'Po'} else {return 'Jo'}
         }
        },
        { field: 'NSLF', headerName: i18n.t('nslf'), width: 120 },
        { field: 'dateTime', headerName: i18n.t('billDate'), width: 120 },
        { field: 'totalAmount', headerName: i18n.t('totalValue'), width: 150 },
        {
          field: 'totalAmountNoVAT',
          headerName: i18n.t('totalValueNoVat'),
          width: 150,
          renderCell: params => {
            return params.row.totalAmountNoVAT.toFixed(2)
          },
        },
        { field: 'totalVat', headerName: i18n.t('totalValueWithVat'), width: 120 },
        { field: 'totalVat6', headerName: i18n.t('totalValueVat_6'), width: 120 },
        { field: 'totalVat20', headerName: i18n.t('totalValueVat_20'), width: 120 },
        { field: 'description', headerName: i18n.t('descriptionLabel'), width: 120 },
        { field: 'paymentMethod', headerName: i18n.t('paymentMethod'), width: 120 },
      ]
    : [
        { field: 'invoiceCode', headerName: i18n.t('billCode'), width: 150 },
        { field: 'operatorCode', headerName: i18n.t('operatorCode'), width: 60 },
        { field: 'branchCode', headerName: i18n.t('branchCodeReport'), width: 60 },
        {
          field: 'branch',
          headerName: i18n.t('branch'),
          width: 60,
          renderCell: params => {
            return params.row.branch.name
          },
        },
        { field: 'isReturn', headerName: i18n.t('correctiveInvoice'), width: 120, align: 'center', style: {background: '#ffecdb !important'}, renderCell: (params) => {
          if(params.row.isReturn){ return 'Po'} else {return 'Jo'}
          }
        },
        { field: 'NSLF', headerName: i18n.t('nslf'), width: 60 },
        { field: 'dateTime', headerName: i18n.t('billDate'), width: 60 },
        { field: 'totalAmount', headerName: i18n.t('totalValue'), width: 60 },
        {
          field: 'totalAmountNoVAT',
          headerName: i18n.t('totalValueNoVat'),
          width: 180,
          renderCell: params => {
            return params.row.totalAmountNoVAT.toFixed(2)
          },
        },
        { field: 'totalVat', headerName: i18n.t('totalValueWithVat'), width: 60 },
        { field: 'totalVat6', headerName: i18n.t('totalValueVat_6'), width: 60 },
        { field: 'totalVat20', headerName: i18n.t('totalValueVat_20'), width: 60 },
        { field: 'description', headerName: i18n.t('descriptionLabel'), width: 60 },
        { field: 'paymentMethod', headerName: i18n.t('paymentMethod'), width: 60 },
      ]

  const openSwal = () => {
    Swal.fire({
      title:
        "<h5 style='font-family: Poppins; font-size: 20px; color: #082e2b; font-weight: 600'>" +
        `Zgjidhni veprimin që doni të kryeni` +
        '</h5>',
      text: '',
      icon: 'info',
      iconColor: '#98bbb8',
      showDenyButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#0d4d47',
      denyButtonColor: '#f87800',
      denyButtonText: `Shiko Kuponin`,
      confirmButtonText: `Korrigjo Faturën`,
    }).then(result => {
      if (result.isDenied) {
        setViewInvoice(true)
      } else if (result.isConfirmed) {
        setCorrectInvoice(true)
      }
    })
  }

  const previewSwal = () => {
    Swal.fire({
      title:
        "<h5 style='font-family: Poppins; font-size: 20px; color: #082e2b; font-weight: 600'>" +
        `Shiko kuponin` +
        '</h5>',
      text: '',
      icon: 'info',
      iconColor: '#98bbb8',
      showDenyButton: true,
      showConfirmButton: false,
      denyButtonColor: '#f87800',
      denyButtonText: `Shiko Kuponin`,
    }).then(result => {
      if (result.isDenied) {
        setViewInvoice(true)
      }
    })
  }

  const finishSwal = () => {
    Swal.fire({
      title:
        "<h5 style='font-family: Poppins; font-size: 20px; color: #082e2b; font-weight: 600'>" +
        `Fatura u korrigjua!` +
        '</h5>',
      text: '',
      icon: 'success',
      iconColor: '#98bbb8',
      showDenyButton: false,
      showConfirmButton: true,
      confirmButtonColor: '#f87800',
      confirmButtonText: `Printo Kuponin`,
    }).then(result => {
      if (result.isConfirmed) {
        setReadyToPrint(true);
        handlePrint();
      }
    })
  }

  const finishCorrection = (invoicePreviewData, invoiceItems) => {    
        invoicePreviewData.items = [...invoiceItems];
        setSelectedRow(invoicePreviewData)
        setCorrectInvoice(false)
        finishSwal()
  }

  const errorSwal = () => {
    Swal.fire({
      title:
        "<h5 style='font-family: Poppins; font-size: 20px; color: #082e2b; font-weight: 600'>" +
        `Pati një problem gjatë korrikigjimit të faturës! Ju lutemi të provoni përsëri` +
        '</h5>',
      text: '',
      icon: 'error',
      iconColor: '#c21000',
      showDenyButton: false,
      showConfirmButton: true,
      confirmButtonColor: '#f87800',
      confirmButtonText: `Mbyll`,
    })
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  }

  return (
    <>
      <Grid container spacing={2} style={{ marginTop: 10 }}>
        <Grid item xs={8}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              startText={t('beginingDate')}
              endText={t('endingngDate')}
              value={dateRange}
              onChange={setDateRange}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> {t('until')} </Box>
                  <TextField {...endProps} />
                </>
              )}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <br />
      <div style={{ height: '65vh', width: '100%', marginTop: 5 }}>
        <DataGrid
          rows={invoices}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          onCellClick={row => {
            setSelectedRow(row.row)
            !row.row.isReturn ? (openSwal(row.row)) : (previewSwal(row.row))
          }}
        />
      </div>

      <Modal
        open={viewInvoice}
        onClose={() => {
          setViewInvoice(false)
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          {selectedRow?.isReturn? <CorrectiveInvoicePreview data={selectedRow} ref={componentRef}/> : <InvoicePreview data={selectedRow} />}
        </Box>
      </Modal>

      <Modal
        open={correctInvoice}
        onClose={() => {
          setCorrectInvoice(false)
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <CorrectiveInvoice data={selectedRow} onFinish={finishCorrection} onError={errorSwal}/>
        </Box>
      </Modal>

      <div style={{display: 'none'}}>
          {readyToPrint && <CorrectiveInvoicePreview ref={componentRef} data={selectedRow}/>}
      </div> 
    </>
  )
}

export default NotFiskalizedInvoices
