import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  getUniqueColors,
  getProductsUniqueSizes,
  getmaxPrice
} from "../../helpers/product";
import ShopSearch from "../../components/product/ShopSearch";
import ShopCategories from "../../components/product/ShopCategories";
import ShopColor from "../../components/product/ShopColor";
import ShopSize from "../../components/product/ShopSize";
import Axios from "axios";
import ShopBrands from "../../components/product/ShopBrands";
import ShopPrice from "../../components/product/ShopPrice";

const ShopSidebar = ({ products, getSortParams, handleQuery, sideSpaceClass }) => {
  console.log("products", products)
  // const uniqueCategories = getUniqueCategories(products);
  const [isPriceQuery, setisPriceQuery] = useState(false);
  const [maxPrice, setmaxPrice] = useState(0)
  const [uniqueCategories, setuniqueCategories] = useState([]);
  const [uniqueBrands, setuniqueBrands] = useState([])
  const uniqueColors = getUniqueColors(products);
  const uniqueSizes = getProductsUniqueSizes(products);
  
  useEffect(() => {
    console.log("useEffect price", isPriceQuery)
    if(!isPriceQuery){ 
      console.log("I am false")
      setmaxPrice(getmaxPrice(products))
    }
  }, [products])
  
  
  useEffect(() => {
    console.log("useEffexct maxPrice", maxPrice)
  }, [maxPrice])
  

  
  useEffect(() => {
    Axios.get("http://localhost:8000/api/categories")
      .then(res => {
        setuniqueCategories([...res.data.data.categories])})
      .catch(err => console.log("Error", err))
    
      Axios.get("http://localhost:8000/api/brands")
    .then(res => {
      // console.log(res.data.data.categories)
      setuniqueBrands([...res.data.data.brands])})
    .catch(err => console.log("Error", err))
  }, [])
  

  return (
    <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ""}`}>
      {/* shop search */}
      <ShopSearch />

      {/* filter by categories */}
      <ShopCategories
        categories={uniqueCategories}
        getSortParams={getSortParams}
        handleQuery={handleQuery}
        setisPriceQuery={setisPriceQuery}
      />

      {/* filter by categories */}
      <ShopBrands
        brands={uniqueBrands}
        getSortParams={getSortParams}
        handleQuery={handleQuery}
        setisPriceQuery={setisPriceQuery}
      />

      {/* filter by color */}
      <ShopColor 
        colors={uniqueColors} 
        getSortParams={getSortParams} 
        handleQuery={handleQuery}
        setisPriceQuery={setisPriceQuery}
      />

      {/* filter by size */}
      <ShopSize 
        sizes={uniqueSizes} 
        getSortParams={getSortParams} 
        handleQuery={handleQuery}
        setisPriceQuery={setisPriceQuery}
      />

      {/* filter by tag */}
      {/* <ShopTag tags={uniqueTags} getSortParams={getSortParams} /> */}

      {/* filter by price */}
      <ShopPrice handleQuery={handleQuery} maxPrice={maxPrice} setisPriceQuery={setisPriceQuery}/>
    </div>
  );
};

ShopSidebar.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array,
  sideSpaceClass: PropTypes.string
};

export default ShopSidebar;
