import { Divider, Grid, IconButton } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import ItemCard from './Item/ItemCard';
import ItemLine from './Item/ItemLine';
import SearchFilter from '../../components/SearchFilter';
import NoData from '../../components/NoData';
import AppsIcon from '@mui/icons-material/Apps';
import DehazeIcon from '@mui/icons-material/Dehaze';
import BodyDashboard from './Body';
import { makeStyles } from '@mui/styles';
// import { useTranslation } from "react-i18next";
// import { useCategories } from "../../../Context/categoriesContext";
// import { useProducts } from "../../../Context/productsContext";
// import Loading from "../../../Shared/Loading/Loading";
// import ListCategories from './ListCategories';

const useStyles = makeStyles(() => ({
  container: { display: 'flex', flexDirection: 'column', width: '100%' },
  headContainer: {
    width: '96%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    marginTop: '2px',
  },
  iconsContainer: {
    marginLeft: 'auto',
    marginRight: '0%',
    display: 'flex',
    height: '40px',
    marginTop: '20px',
  },
}));

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
  const classes = useStyles();
  const [filteredData, setFilteredData] = useState([]);
  const [display, setDisplay] = useState('cards');

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
    <div className={classes.container}>
      <div className={classes.headContainer}>
        <div style={{ marginRight: '3px', marginTop: '-7px' }}>
          <SearchFilter onFilter={filterProducts} placeholder="searchProduct" />
        </div>
        <div className={classes.iconsContainer}>
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
      <BodyDashboard filteredData={filteredData} display={display} />
    </div>
  );
};

export default Dashboard;
