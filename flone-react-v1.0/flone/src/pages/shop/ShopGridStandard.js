import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import Paginator from 'react-hooks-paginator';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { connect } from 'react-redux';
import { getSortedProducts } from '../../helpers/product';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import ShopSidebar from '../../wrappers/product/ShopSidebar';
import ShopTopbar from '../../wrappers/product/ShopTopbar';
import ShopProducts from '../../wrappers/product/ShopProducts';
import axios from 'axios';
import { updateQuery } from "../../redux/actions/queryActions";

const ShopGridStandard = ({location, queryState, updateQuery}) => {
    const [layout, setLayout] = useState('grid three-column');
    const [sortType, setSortType] = useState('');
    const [sortValue, setSortValue] = useState('');
    const [filterSortType, setFilterSortType] = useState('');
    const [filterSortValue, setFilterSortValue] = useState('');
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [fetchedProducts, setFetchedProducts] = useState([]);
    const [query, setquery] = useState({})

    const [actionloading, setactionloading] = useState(false)

    const pageLimit = 15;
    const {pathname} = location;

    const handleQuery = (field, value) => {
        console.log("from HandleQueryquery", field, value)
        let modQuery = {
            ...query,
            [`${field}`]: value
        };
        // [`${modQuery.field}`] = value;
        setquery({...modQuery})
    }

    const getLayout = (layout) => {
        setLayout(layout)
    }

    const getSortParams = (sortType, sortValue) => {
        setSortType(sortType);
        setSortValue(sortValue);
    }

    const getFilterSortParams = (sortType, sortValue) => {
        setFilterSortType(sortType);
        setFilterSortValue(sortValue);
    }
    
    const fetchProducts = () => {
        console.log("fetchProducts", queryState)
        axios
          .get(
            "http://localhost:8000/api/products",{
                params: {...queryState}
            }
          )
          .then((response) => {
              console.log("helloquery", queryState)
            console.log("response after query", response.data.data.products);
            setFetchedProducts(response.data.data.products)
            setactionloading(false) 
          });
      }

    useEffect(() => {
        console.log("fetchedProducts of sorted", fetchedProducts)
        let sortedProducts = getSortedProducts(fetchedProducts, sortType, sortValue);
        const filterSortedProducts = getSortedProducts(sortedProducts, filterSortType, filterSortValue);
        sortedProducts = filterSortedProducts;
        setSortedProducts(sortedProducts);
        setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
    }, [offset, fetchedProducts, sortType, sortValue, filterSortType, filterSortValue ]);

    
    useEffect(() => {
      setactionloading(true);
      console.log("query is updated", queryState)
    //   console.log("useEffect of uniqueCategories", uniqueCategories)
        // const clothingId = uniqueCategories.find(cat => cat?.name === "Clothing")
        // console.log("clothingID", clothingId)
        // if(query?.category === '') {
        //     console.log("hello its true",)
        //     updateQuery("category", "61fea65fefd5350eeff1e561")
        // }
        fetchProducts();
    }, [queryState])

    useEffect(() => {
    //   console.log("currentData",currentData)
    }, [currentData])
    

    useEffect(() => {
        let sortedProducts = getSortedProducts(fetchedProducts, sortType, sortValue);
        const filterSortedProducts = getSortedProducts(sortedProducts, filterSortType, filterSortValue);
        sortedProducts = filterSortedProducts;
        // console.log("sortedProducts",sortedProducts)
        setSortedProducts(sortedProducts);
        setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
    }, [offset, sortType, sortValue, filterSortType, filterSortValue, fetchedProducts ]);

    
    return (
        <Fragment>
            <MetaTags>
                <title>BrandBucket | Shop Page</title>
                <meta name="description" content="Shop page of flone react minimalist eCommerce template." />
            </MetaTags>

            <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>Shop</BreadcrumbsItem>

            <LayoutOne 
                headerContainerClass="container-fluid"
                headerPaddingClass="header-padding-1">
                {/* breadcrumb */}
                <Breadcrumb />

                <div className="shop-area pt-95 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 order-2 order-lg-1">
                                {/* shop sidebar */}
                                <ShopSidebar 
                                    products={fetchedProducts} 
                                    getSortParams={getSortParams} 
                                    handleQuery={handleQuery} 
                                    sideSpaceClass="mr-30"
                                />
                            </div>
                            <div className="col-lg-9 order-1 order-lg-2">
                                {/* shop topbar default */}
                                <ShopTopbar getLayout={getLayout} getFilterSortParams={getFilterSortParams} productCount={fetchedProducts.length} sortedProductCount={currentData.length} />

                                {/* shop page content default */}
                                <ShopProducts layout={layout} products={currentData} actionloading={actionloading}/>

                                {/* shop product pagination */}
                                <div className="pro-pagination-style text-center mt-30">
                                    <Paginator
                                        totalRecords={fetchedProducts.length}
                                        pageLimit={pageLimit}
                                        pageNeighbours={2}
                                        setOffset={setOffset}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        pageContainerClass="mb-0 mt-0"
                                        pagePrevText="«"
                                        pageNextText="»"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    )
}

ShopGridStandard.propTypes = {
  location: PropTypes.object,
  products: PropTypes.array
}

const mapStateToProps = state => {
    return{
        // products: state.productData.products,
        queryState: state.query
    }
}

const mapDispatchToProps = {
    updateQuery
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopGridStandard);