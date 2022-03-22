import { makeStyles } from '@mui/styles';
import ItemCard from './Item/ItemCard';
import ItemLine from './Item/ItemLine';
import NoData from '../../components/NoData';
import Grid from '@mui/material/Grid';

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
  console.log("Lista", props);
  const classes = useStyles();
  return (
    <div className={classes.body}>
      {props.data.length > 0 ? (
        <div>
          {props.display === 'cards' ? (
            <div>
              <Grid spacing={2}>
                {props.data?.map((item, index) => {
                  if (props.data?.length === index + 1) {
                    return (
                      <Grid item xs={12} lg={3} md={3} sm={4} xl={3}>
                        <ItemCard key={index} item={item} />
                      </Grid>
                    );
                  } else {
                    return (
                      <Grid item xs={12} lg={3} md={3} sm={4} xl={3}>
                        <ItemCard key={index} item={item} />
                      </Grid>
                    );
                  }
                })}
              </Grid>
            </div>
          ) : (
            props.data.map((item, index) => {
              if (data.length === index + 1) {
                return <ItemLine item={item} />;
              } else {
                return <ItemLine item={item} />;
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
