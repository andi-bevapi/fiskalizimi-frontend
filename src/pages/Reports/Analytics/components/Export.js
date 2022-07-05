import ReactExport from "react-export-excel";
import Button from '@mui/material/Button';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const ExcelColumnGroup = ReactExport.ExcelFile.ExcelColumnGroup;

const Export = ({ data, additionalFilters }) => {
    const startDate = "Start Date: " + additionalFilters[0]?.getDate() + "/" + Number(additionalFilters[0]?.getMonth()+1) + "/" + additionalFilters[0]?.getFullYear();
    const endDate = "End Date: " + additionalFilters[1]?.getDate() + "/" + Number(additionalFilters[1]?.getMonth()+1) + "/" + additionalFilters[1]?.getFullYear();

    return (
        <ExcelFile element={<Button variant="contained">Export</Button>}>
            <ExcelSheet data={data} name="Analytical Register">
                <ExcelColumn label="Invoice Code" value="invoiceCode" />
                <ExcelColumn label="Total Amount" value="totalAmount" />
                <ExcelColumn label="Total Amount No VAT" value="totalAmountNoVAT" />
                <ExcelColumn label="Total VAT" value="totalVat" />
                <ExcelColumn label="Total VAT 6%" value="totalVat6" />
                <ExcelColumn label="Total VAT 20%" value="totalVat20" />
                <ExcelColumn label="Description" value="description" />
                <ExcelColumn label="Payment Method" value="paymentMethod" />
                <ExcelColumn label="Date" value="dateTime" />
                <ExcelColumn label="" value="" />
                <ExcelColumn label="" value="" />
                <ExcelColumn label="" value="" />
                <ExcelColumn label="" value="" />
                <ExcelColumn label="Filters:" />
                <ExcelColumn label={startDate} />
                <ExcelColumn label={endDate} />
            </ExcelSheet>
        </ExcelFile>
    );
};

export default Export;