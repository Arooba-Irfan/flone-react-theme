import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { updateQuery } from './../../redux/actions/queryActions'
// import InputRange from 'react-input-range';

const ShopPrice = ({handleQuery, maxPrice, setisPriceQuery, updateQuery, activePrice }) => {

  const [price, setPrice] = useState(maxPrice)

  useEffect(() => {
    console.log("maxprice from input")
    setPrice(maxPrice)
  }, [maxPrice])

  useEffect(() => {
    // handleQuery('price', price);
    updateQuery('price', price);
  }, [price])
  
  
  return (
    <div className="sidebar-widget mt-50">
      <h4 className="pro-sidebar-title">Price</h4>
      <div className="sidebar-widget-list">

      <input 
        type="range"
        min="0" 
        max={`${maxPrice}`}
        value={price} 
        onChange={(e) =>{
          console.log("price changing") 
          setPrice(e.target.value);
          setisPriceQuery(true);
        }}
      />
      <label>{price}</label>

        {/* <InputRange
          maxValue={20}
          minValue={0}
          value={price}
          onChange={value => setPrice( {...value} )} 
        /> */}
        {/* <input type="range"/> */}
        {/* {brands ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  className={activeBrand === "" ? 'active' : ''}
                  onClick={e => {
                    getSortParams("brand", "");
                    handleQuery("brand", "");
                    setActiveBrand("")
                    // setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> All Brands
                </button>
              </div>
            </li>
            {brands.map((brand, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      className={activeBrand === brand._id ? 'active' : ''}
                      onClick={e => {
                        getSortParams("brand", brand);
                        handleQuery("brand", brand._id);
                        setActiveBrand(brand._id)
                        // setActiveSort(e);
                      }}
                    >
                      {" "}
                      <span className="checkmark" /> {brand.name}{" "}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "No Brands found"
        )} */}
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  updateQuery
}

const mapStateToProps = state => ({
  activePrice : state?.query?.price
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPrice)