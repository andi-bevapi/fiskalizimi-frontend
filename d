[1mdiff --git a/src/layouts/locales/english.json b/src/layouts/locales/english.json[m
[1mindex 39567db..43ad751 100644[m
[1m--- a/src/layouts/locales/english.json[m
[1m+++ b/src/layouts/locales/english.json[m
[36m@@ -53,6 +53,7 @@[m
   "messageBill" :"Please insert the message",[m
   "descriptionLength":"The description must have more then 2 characters",[m
   "description":"Please insert the description",[m
[32m+[m[32m  "descriptionNsfl":"description",[m
   "zeroPrice":"Product with 0 price are not allowed",[m
   "activeInvoice": "Active Invoice",[m
   "pendingInvoice": "Pending Invoices",[m
[1mdiff --git a/src/layouts/locales/shqip.json b/src/layouts/locales/shqip.json[m
[1mindex 6bce568..812191a 100644[m
[1m--- a/src/layouts/locales/shqip.json[m
[1m+++ b/src/layouts/locales/shqip.json[m
[36m@@ -53,6 +53,7 @@[m
   "messageBill":"Ju lutem vendosni mesazhin",[m
   "descriptionLength":"Pershkrimin duhet te kete me shume se 2 karaktere",[m
   "description":"Ju lutem vendosni pershkrimin",[m
[32m+[m[32m  "descriptionNsfl":"pershkrimi",[m
   "zeroPrice":"Nuk lejohen produkte me cmim 0",[m
   "activeInvoice": "Fatura Aktive",[m
   "pendingInvoice": "Fatura te ruajtura",[m
[1mdiff --git a/src/pages/Dashboard/Item/ItemCard.js b/src/pages/Dashboard/Item/ItemCard.js[m
[1mindex 69c6976..6129c4e 100644[m
[1m--- a/src/pages/Dashboard/Item/ItemCard.js[m
[1m+++ b/src/pages/Dashboard/Item/ItemCard.js[m
[36m@@ -74,17 +74,17 @@[m [mconst ItemCard = (props) => {[m
 [m
 [m
   const handleCardClick = () => {[m
[31m-    if (!initialState?.currentUser?.arka) {[m
[31m-      return SwalModal([m
[31m-        t("noConnectedArka"),[m
[31m-        "",[m
[31m-        "warning",[m
[31m-        t("close"),[m
[31m-        "",[m
[31m-        () => { },[m
[31m-        () => { },[m
[31m-      );[m
[31m-    }[m
[32m+[m[32m    // if (!initialState?.currentUser?.arka) {[m
[32m+[m[32m    //   return SwalModal([m
[32m+[m[32m    //     t("noConnectedArka"),[m
[32m+[m[32m    //     "",[m
[32m+[m[32m    //     "warning",[m
[32m+[m[32m    //     t("close"),[m
[32m+[m[32m    //     "",[m
[32m+[m[32m    //     () => { },[m
[32m+[m[32m    //     () => { },[m
[32m+[m[32m    //   );[m
[32m+[m[32m    // }[m
     if (!stopAdding) {[m
       const productFromArray = (props.invoiceList?.filter(item => item.id === props.item.id));[m
       const isExisting = (productFromArray.length >= 1 ? true : false);[m
[1mdiff --git a/src/pages/Reports/Invoices/index.js b/src/pages/Reports/Invoices/index.js[m
[1mindex c136440..b66d578 100644[m
[1m--- a/src/pages/Reports/Invoices/index.js[m
[1m+++ b/src/pages/Reports/Invoices/index.js[m
[36m@@ -1,5 +1,9 @@[m
[31m-import { useState } from 'react';[m
[31m-import styles from './../reportsStyle.css'[m
[32m+[m[32mimport { getAnalyticsData, getSingleInvoiceAnalytics } from '../../../services/reports';[m
[32m+[m[32mimport { formatDate } from '../../../helpers/formatDate';[m
[32m+[m[32mimport { useState , useEffect } from 'react';[m
[32m+[m[32mimport { useModel } from 'umi';[m
[32m+[m[32mimport FiscalizedInvoice from "./FiskalizedInvoices";[m
[32m+[m[32mimport styles from './../reportsStyle.css';[m
 import Tabs from '@mui/material/Tabs';[m
 import Tab from '@mui/material/Tab';[m
 import Typography from '@mui/material/Typography';[m
[36m@@ -34,9 +38,50 @@[m [mfunction a11yProps(index) {[m
     };[m
 }[m
 [m
[31m-[m
 const Invoices = () => {[m
[32m+[m
     const [value, setValue] = useState(0);[m
[32m+[m[32m    const { initialState, refresh } = useModel('@@initialState');[m
[32m+[m[32m    const [data, setData] = useState([]);[m
[32m+[m[32m    const [fic,setFic] = useState([]);[m
[32m+[m[32m    const [noFic,setNoFic] = useState([]);[m
[32m+[m[32m    const [dateRange, setDateRange] = useState([new Date().toString(), new Date().toString()]);[m
[32m+[m
[32m+[m[32m    //nese ka branch id merr faturat ne base branch id[m
[32m+[m[32m    //nese nuk ka b