import { makeStyles } from '@mui/styles';
import ItemCard from './Item/ItemCard';
import ItemLine from './Item/ItemLine';
import NoData from '../../components/NoData';

const useStyles = makeStyles(() => ({
  body: {
    height: '70vh',
    overflowY: 'scroll',
    width: '98%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  divider: {
    width: '98%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '20px',
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
  return (
    <div className={classes.body}>
      {props.filteredData.length > 0 ? (
        <div>
          {props.display === 'cards' ? (
            <div>
              <Divider className={classes.divider} />
              <Grid container spacing={2}>
                {props.filteredData.map((item, index) => {
                  if (props.filteredData.length === index + 1) {
                    return (
                      <Grid item xs={12} lg={2} md={3} sm={4} xs={6}>
                        <ItemCard key={index} item={item} />
                      </Grid>
                    );
                  } else {
                    return (
                      <Grid item xs={12} lg={2} md={3} sm={4} xs={6}>
                        <ItemCard key={index} item={item} />
                      </Grid>
                    );
                  }
                })}
              </Grid>
            </div>
          ) : (
            props.filteredData.map((item, index) => {
              if (filteredData.length === index + 1) {
                return <ItemLine item={item} />;
              } else {
                return <ItemLine item={item} />;
              }
            })
          )}
        </div>
      ) : (
        <div className={classes.noDataCont}>
          <NoData title="noProductcreated" />
        </div>
      )}
    </div>
  );
};

export default BodyDashboard;
