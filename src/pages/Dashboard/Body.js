import { makeStyles } from '@mui/styles';
import ItemCard from './Item/ItemCard';
import ItemLine from './Item/ItemLine';
import NoData from '../../components/NoData';
import Grid from '@mui/material/Grid';
import ReactPaginate from 'react-paginate';
import React, { useEffect, useState } from 'react';
import styles from './Body.module.css';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const classes = useStyles();
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 18;
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(props.data?.length / itemsPerPage);
  const matches = useMediaQuery('(max-width:450px)')

  useEffect(() => {}, [pageNumber],pagesVisited)
  return (
    <div className={classes.body}>
      {props.data?.length > 0 ? (
        <div>
          {props.display === 'cards' ? (
            <div>
              <Grid container spacing={3}>
                {props.data?.slice(pagesVisited, pagesVisited + itemsPerPage).map((item, index) => {
                    return (
                      <Grid item xs={matches? 12 :6} sm={4} md={4} lg={3} xl={2} key={index}>
                        <ItemCard key={index} item={item} addToInvoiceList={props.addToInvoiceFunc} invoiceList={props.invoiceList} />
                      </Grid>
                    );
                })}
              </Grid>
            </div>
          ) : (
            props.data?.slice(pagesVisited, pagesVisited + itemsPerPage).map((item, index) => {
                return (
                  <div key={index}>
                    <ItemLine
                      item={item}
                      addToInvoiceList={props.addToInvoiceFunc}
                      invoiceList={props.invoiceList}
                    />
                  </div>
                );
            })
          )}
          <ReactPaginate
            previousLabel={t('previous')}
            nextLabel={t('next')}
            pageCount={pageCount}
            onPageChange={({selected})=> {setPageNumber(selected)}}
            containerClassName={styles.paginationButtons}
            previousLinkClassName={styles.previousButtons}
            nextLinkClassName={styles.nextButtons}
            disabledClassName={styles.paginationDisabled}
            activeClassName={styles.paginationActive}
          />
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
