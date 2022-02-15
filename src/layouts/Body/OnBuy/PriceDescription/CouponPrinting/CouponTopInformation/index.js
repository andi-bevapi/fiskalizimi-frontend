import { Typography } from "@mui/material";
import styles from "./CouponTopInformation.module.css";

const CouponTopInformation = () => {
  const time = new Date()

  return (
    <div className={styles.mainHolder}>
      <div 
      // className={styles.bussinesInformation}
       style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            width: "100%",
            left: "0",
            right: "0",
            marginBottom: "3mm"
      }}>
        <Typography variant={"body2"} style={{ fontSize: "14px", padding: "0", fontWeight: "600", margin: "0" }}>
          Ovla Restaurant
        </Typography>
        <Typography variant={"body2"} style={{ fontSize: "13px", padding: "0", fontWeight: "500", margin: "0" }}>
          L91721017E
        </Typography>
        <Typography variant={"body2"} style={{ fontSize: "12px", padding: "0", margin: "0" }}>
          Building 32/1017, Rr. “Ismail Qemali” Tirana, Albania
        </Typography>
      </div>
      <div className={styles.billInformation}>
      <Typography variant={"body2"} style={{ fontSize: "12px", padding: "0", margin: "1mm 0 0 0" }}>
          NJESIA BIZNESIT: ao613wz114
        </Typography>
        <Typography variant={"body2"} style={{ fontSize: "12px", padding: "0", margin: "0" }}>
          DATA: {time.getDate()}-{time.getMonth()}-{time.getFullYear()} ORA: {time.getHours()}:{('0'+time.getMinutes()).slice(-2)}:{time.getSeconds()}
        </Typography>
        <Typography variant={"body2"} style={{ fontSize: "12px", padding: "0", margin: "0" }}>
          KODI OPERATORIT: zd238yt417
        </Typography>
      </div>
      <div
      //  className={styles.fiscalisationBill}
       style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            // margin: "0.1mm 0px",
            left: "0",
            right: "0",
            borderBottom:" 0.1mm dashed black",
            padding: "3mm 0"
      }}>
        <Typography variant={"body2"} style={{ fontSize: "14px", padding: "0", fontWeight: "600", margin: "1mm 0 0 0" }}>
          FATURE TATIMORE
        </Typography>
        <Typography variant={"body2"} style={{ fontSize: "12px", padding: "0", margin: "0" }}>
          FATURE PERMBLEDHESE
        </Typography>
        <Typography variant={"body2"} style={{ fontSize: "12px", padding: "0", margin: "0" }}>
          35055/2021/JX904QX210
        </Typography>
      </div>
    </div>
  );
};
export default CouponTopInformation;
