import React  from 'react';
import { useModel } from 'umi';
import { Button, Divider, Grid } from '@mui/material';
import styles from "./styles.module.css";
import { useBranchListContext } from "../../Context/BranchListContext";
import { useState, useEffect } from 'react';


const PrintShiftDetails = React.forwardRef((props, ref) =>{
    const { initialState} = useModel('@@initialState');
    let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date());
    const {branchList} = useBranchListContext();
    const [branchCode , setBranchCode] = useState([]);

    useEffect(()=>{
        const currentBranch = branchList.filter((el) => el.id === initialState?.currentUser?.branchId );
        setBranchCode(currentBranch);
    },[]);
    return(
        <div ref={ref}>
            <div className={styles.container}>
              <h4>Permbledhje Turni</h4>
              <p className={styles.customFont}>Operatorit: {initialState?.currentUser?.username} {initialState?.currentUser?.lastName}</p>
             <div>
                 <p>Data dhe ora: {date}</p>
                <p>Kodi i Operatorit: {initialState?.currentUser?.operatorCode}</p>
                <p>Kodi i Biznesit: {branchCode[0]?.businessUnitCode}</p>
             </div>
             <Divider style={{ marginTop: 10, marginBottom: 20 }} />

             <div>
                 <p>Totali <span>{props.summaryData?.totalAmount ? props.summaryData?.totalAmount.toFixed(2) : 0}</span></p>
                 <p>Totali pa TVSH<span>{props.summaryData?.totalAmountNoVAT ? props.summaryData?.totalAmountNoVAT.toFixed(2) : 0}</span></p>
                 <p>Totali TVSH 6%<span>{props.summaryData?.totalVat6 ? props.summaryData?.totalVat6.toFixed(2) : 0}</span></p>
                 <p>Totali TVSH 20 %<span>{props.summaryData?.totalVat20 ? props.summaryData?.totalVat20.toFixed(2) : 0}</span></p>
             </div>
            </div>
        </div>
    )
});

export default PrintShiftDetails;