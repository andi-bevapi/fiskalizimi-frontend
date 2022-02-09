import { Typography } from "@mui/material";
import styles from "./FiscalisationData.module.css";

const FiscalisationData = () => {
  const time = new Date();

  return (
    <div
      className={styles.mainHolder}
      style={{
        borderTop: "1px dashed black",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "48%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <img
            width={"100%"}
            alt={"qr-code"}
            src={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
            }
          />
        </div>
      </div>
      <div
        // className={styles.fiscalisationInformation}
        style={{
          width: "100%",
        }}
      >
        <div
          // className={styles.textInformation}
          style={{
            textAlign: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Typography
            variant={"body2"}
            style={{ fontSize: "10px", padding: "0", margin: "0" }}
          >
            NSLF: OIUHAOIH123OH5IH12OI5H21OI5JH
          </Typography>
          <Typography
            variant={"body2"}
            style={{ fontSize: "10px", padding: "0", margin: "0" }}
          >
            NSLF: OIUHAOIH123OH5IH12OI5H21OI5JH
          </Typography>
          <Typography
            variant={"body2"}
            style={{
              fontSize: "10px",
              fontStyle: "bold",
              padding: "0",
              margin: "0",
            }}
          >
            POROSITE REFERENCE
          </Typography>
        </div>
      </div>
      <div
        // className={styles.endingInformation}
        style={{
          width: "100%",
          borderTop: "1px dashed black",
          borderBottom: "1px dashed black",
        }}
      >
        <div
          // className={styles.textInformation}
          style={{
            textAlign: "left",
          }}
        >
          <Typography
            variant={"body2"}
            style={{ fontSize: "10px", padding: "0", margin: "0" }}
          >
            NSLF: OIUHAOIH123OH5IH12OI5H21OI5JH
          </Typography>
          <Typography
            variant={"body2"}
            style={{ fontSize: "10px", padding: "0", margin: "0" }}
          >
            DATA: {time.getHours()}:{("0" + time.getMinutes()).slice(-2)}:
            {time.getSeconds()}
          </Typography>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          marginTop: "1mm"
        }}
      >
        <div
          // className={styles.textInformation}
          style={{
            textAlign: "center",
          }}
        >
          <Typography
            variant={"body2"}
            style={{ fontSize: "12px", padding: "0", margin: "0", fontStyle: "oblique" }}
          >
            Gjeneruar nga POSLA.com
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default FiscalisationData;
