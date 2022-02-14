import { Divider, Grid, IconButton } from '@mui/material';
import * as React from 'react';
import { useState, useCallback, useRef, useEffect } from 'react';
import ItemCard from './Item/ItemCard';
import ItemLine from './Item/ItemLine';
import SearchFilter from '../../components/SearchFilter';
import NoData from '../../components/NoData';
import AppsIcon from '@mui/icons-material/Apps';
import DehazeIcon from '@mui/icons-material/Dehaze';
import styles from './index.css';
// import { useTranslation } from "react-i18next";
// import { useCategories } from "../../../Context/categoriesContext";
// import { useProducts } from "../../../Context/productsContext";
// import Loading from "../../../Shared/Loading/Loading";
import ListCategories from './ListCategories';

const Dashboard = () => {
  // const { t } = useTranslation();

  // const {
  //   products,
  //   loading,
  //   category,
  //   setCategory,
  //   setQuery,
  //   setPageNumber,
  //   hasMore,
  //   loadingMore,
  //   setDisplayIcon,
  // } = useProducts();
  // const { categories } = useCategories();
  const [filteredData, setFilteredData] = useState([]);
  const [display, setDisplay] = useState('cards');
  const observer = useRef();

  const lastElement = useCallback();
  // (node) => {
  //   if (loading) return;
  //   if (observer.current) observer.current.disconnect();

  //   observer.current = new IntersectionObserver((entries) => {
  //     if (entries[0].isIntersecting && hasMore) {
  //       setPageNumber((prevNumber) => prevNumber + 5);
  //     }
  //   });
  //   if (node) observer.current.observe(node);
  // },
  // [loading, hasMore, setPageNumber]
  const categories = [
    { name: 'pije', id: 2 },
    { name: 'fruta', id: 1 },
  ];
  let category = { name: 'pije', id: 2 };

  // useEffect(() => {
  //   if (products.length > 0) setDisplayIcon(false);
  // });

  // useEffect(() => {
  //   setFilteredData(products);
  // }, [products]);

  const filterProducts = (searchValue) => {
    // const filteredProducts = products.filter((el) =>
    //   el.name.toLowerCase().toString().includes(searchValue)
    // );
    // setFilteredData(filteredProducts);
    // setPageNumber(0);
    // setQuery(searchValue);
  };

  const handleCategory = (id) => {
    let filteredRowData = products;
    if (id !== 'All') {
      filteredRowData = products.filter((item) => item.categoryId === id);
    }
    setFilteredData(filteredRowData);
    setCategory(id);
    setPageNumber(0);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <div
        style={{
          width: '96%',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          marginTop: '2px',
        }}
      >
        <div style={{ marginRight: '3px', marginTop: '-7px' }}>
          <SearchFilter onFilter={filterProducts} placeholder="searchProduct" />
        </div>
        <div
          style={{
            marginLeft: 'auto',
            marginRight: '0%',
            display: 'flex',
            height: '40px',
            marginTop: '20px',
          }}
        >
          <IconButton onClick={() => setDisplay('cards')}>
            <AppsIcon />
          </IconButton>
          <IconButton onClick={() => setDisplay('lines')}>
            <DehazeIcon />
          </IconButton>
        </div>
      </div>
      {/* <ListCategories
          categories={categories}
          selected={category}
          handleChange={handleCategory}
        /> */}
      {/* {loading ? (
          <Loading />
        ) : ( */}
      <div
        style={{
          height: '70vh',
          overflowY: 'scroll',
          width: '98%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {filteredData.length > 0 ? (
          <div>
            {display === 'cards' ? (
              <div>
                <Divider
                  style={{
                    width: '98%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginBottom: '20px',
                  }}
                />
                <Grid
                  container
                  spacing={{ xs: 1, md: 1, lg: 1 }}
                  columns={{ xs: 3, sm: 5, md: 6, lg: 7 }}
                  style={{
                    width: '99%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                  className={styles.items}
                >
                  {filteredData.map((item, index) => {
                    if (filteredData.length === index + 1) {
                      return (
                        <div
                          key={index}
                          style={{ flexGrow: 1, cursor: 'pointer' }}
                          className={styles.item}
                          ref={lastElement}
                        >
                          <Grid item key={index}>
                            <ItemCard key={index} item={item} />
                          </Grid>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={index}
                          style={{ flexGrow: 1, cursor: 'pointer' }}
                          className={styles.item}
                        >
                          <Grid item key={index}>
                            <ItemCard key={index} item={item} />
                          </Grid>
                        </div>
                      );
                    }
                  })}
                </Grid>
              </div>
            ) : (
              filteredData.map((item, index) => {
                if (filteredData.length === index + 1) {
                  return (
                    <div key={index} ref={lastElement}>
                      <ItemLine item={item} />
                    </div>
                  );
                } else {
                  return (
                    <div key={index}>
                      <ItemLine item={item} />
                    </div>
                  );
                }
              })
            )}
          </div>
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <NoData title="noProductcreated" />
          </div>
        )}
      </div>
      {/* )} */}
      {/* {loadingMore && <p>Loading...</p>} */}
    </div>
  );
};

export default Dashboard;
