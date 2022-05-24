import { makeStyles } from '@mui/styles';
import ItemCard from './Item/ItemCard';
import ItemLine from './Item/ItemLine';
import NoData from '../../components/NoData';
import Grid from '@mui/material/Grid';
import ReactPaginate from 'react-paginate';
import React, { useState } from 'react';
import styles from './Body.module.css';
import { useTranslation } from 'react-i18next';

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
  const itemsPerPage = 8;
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(props.data?.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className={classes.body}>
      {props.data?.length > 0 ? (
        <div>
          {props.display === 'cards' ? (
            <div>
              <Grid container spacing={3}>
                {props.data?.slice(pagesVisited, pagesVisited + itemsPerPage).map((item, index) => {
                  if (props.data?.length === index + 1) {
                    return (
                      <Grid item xs={12} sm={4} md={3} lg={3} xl={2} key={index}>
                        <ItemCard
                          key={index}
                          item={item}
                          addToInvoiceList={props.addToInvoiceFunc}
                          invoiceList={props.invoiceList}
                        />
                      </Grid>
                    );
                  } else {
                    return (
                      <Grid item xs={12} sm={4} md={3} lg={3} xl={2} key={index}>
                        <ItemCard
                          key={index}
                          item={item}
                          addToInvoiceList={props.addToInvoiceFunc}
                          invoiceList={props.invoiceList}
                        />
                      </Grid>
                    );
                  }
                })}
              </Grid>
            </div>
          ) : (
            props.data?.slice(pagesVisited, pagesVisited + itemsPerPage).map((item, index) => {
              if (props.data.length === index + 1) {
                return (
                  <div key={index}>
                    <ItemLine
                      item={item}
                      addToInvoiceList={props.addToInvoiceFunc}
                      invoiceList={props.invoiceList}
                    />
                  </div>
                );
              } else {
                return (
                  <div key={index}>
                    <ItemLine
                      item={item}
                      addToInvoiceList={props.addToInvoiceFunc}
                      invoiceList={props.invoiceList}
                    />
                  </div>
                );
              }
            })
          )}
          <ReactPaginate
            previousLabel={t('previous')}
            nextLabel={t('next')}
            pageCount={pageCount}
            onPageChange={changePage}
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
