import { makeStyles } from '@mui/styles';
import ItemCard from './Item/ItemCard';
import ItemLine from './Item/ItemLine';
import NoData from '../../components/NoData';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery'

const useStyles = makeStyles(() => ({
  body: {
    height: '100%',
    width: '100%',
    overflowY: 'scroll',
    marginTop: 40,
  },
  divider: {
    width: '100%',
  },
  noDataCont: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const BodyDashboard = (props) => {
  const classes = useStyles();
  const matches = useMediaQuery('(max-width:450px)')
  return (
    <div className={classes.body}>
      {props.data?.length > 0 ? (
        <div>
          {props.display === 'cards' ? (
            <div>
              <Grid container spacing={3}>
                {props.data?.map((item, index) => {
                  if (props.data?.length === index + 1) {
                    return (
                      <Grid item xs={matches? 12 :6} sm={4} md={4} lg={3} xl={2} key={index}>
                        <ItemCard key={index} item={item} addToInvoiceList={props.addToInvoiceFunc} invoiceList={props.invoiceList} />
                      </Grid>
                    );
                  } else {
                    return (
                      <Grid item xs={matches? 12 :6} sm={4} md={4} lg={3} xl={2} key={index}>
                        <ItemCard key={index} item={item} addToInvoiceList={props.addToInvoiceFunc} invoiceList={props.invoiceList} />
                      </Grid>
                    );
                  }
                })}
              </Grid>
            </div>
          ) : (
            props.data?.map((item, index) => {
              if (props.data.length === index + 1) {
                return <div key={index}><ItemLine item={item} addToInvoiceList={props.addToInvoiceFunc} invoiceList={props.invoiceList} /></div>;
              } else {
                return <div key={index}><ItemLine item={item} addToInvoiceList={props.addToInvoiceFunc} invoiceList={props.invoiceList} /></div>;
              }
            })
          )}
        </div>
      ) : (
        <div className={classes.noDataCont}>
          <NoData title="Asnje produkt i krijuar" />
        </div>
      )}
    </div>
  );
};

export default BodyDashboard;
