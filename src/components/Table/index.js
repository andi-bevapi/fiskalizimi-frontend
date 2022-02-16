import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  tableCell: {
    padding: '5px 4px',
  },
  chooseBtn: {
    backgroundColor: ' #5d9cec',
    color: 'white',
    borderRadius: '3px',
    boxShadow: 'none',
    textTransform: 'none',
    padding: '1.4px',
    display: 'none',
  },
  filtersContainer: {
    display: 'flex',
  },
}));

const TableComponent = (props) => {
  const classes = useStyles();
  return (
    <TableContainer sx={{ fontSize: '14px' }}>
      <Table stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            {props.tableHeaders.map((header, index) => (
              <TableCell key={index} className={classes.tableCell}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{props.children}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
