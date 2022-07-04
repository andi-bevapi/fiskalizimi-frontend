import ReactExport from "react-export-excel";
import Button from '@mui/material/Button';
import i18n from "i18next";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const ExcelColumnGroup = ReactExport.ExcelFile.ExcelColumnGroup;

const Export = ({ data, additionalFilters }) => {
    const startDate = "Start Date: " + additionalFilters[0].getDate() + "/" + Number(additionalFilters[0].getMonth()+1) + "/" + additionalFilters[0].getFullYear();
    const endDate = "End Date: " + additionalFilters[1].getDate() + "/" + Number(additionalFilters[1].getMonth()+1) + "/" + additionalFilters[1].getFullYear();

    const currentDate = new Date().toLocaleString();

    return (
        <ExcelFile filename={i18n.t("analytic_register") + "_" + currentDate.slice(0,8)} element={<Button variant="contained">Export</Button>}>
            <ExcelSheet data={data} name="Analytical Register">
                <ExcelColumn label={i18n.t("invoice_code")} value="invoiceCode" />
                <ExcelColumn label= {i18n.t("total_amount")} value="totalAmount" />

                <ExcelColumn label={i18n.t("total_amount_no_vat")} value="totalAmountNoVAT" />
                <ExcelColumn label={i18n.t("total_vat")} value="totalVat" />
                <ExcelColumn label={i18n.t("totalValueVat_6")} value="totalVat6" />
                <ExcelColumn label={i18n.t("totalValueVat_20")} value="totalVat20" />
                <ExcelColumn label={i18n.t("register_description")} value="description" />
                <ExcelColumn label={i18n.t("paymentMethod")} value="paymentMethod" />
                <ExcelColumn label={i18n.t("date")} value="dateTime" />
                <ExcelColumn label="" value="" />
                <ExcelColumn label="" value="" />
                <ExcelColumn label="" value="" />
                <ExcelColumn label="" value="" />
                <ExcelColumn label={i18n.t("filters")} />
                <ExcelColumn label={startDate} />
                <ExcelColumn label={endDate} />

            </ExcelSheet>
        </ExcelFile>
    );
};

export default Export;