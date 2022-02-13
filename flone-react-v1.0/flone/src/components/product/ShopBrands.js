import PropTypes from "prop-types";
import React, { useState } from "react";
import { setActiveSort } from "../../helpers/product";

const ShopBrands = ({ brands, getSortParams, handleQuery, setisPriceQuery }) => {

  const [activeBrand, setActiveBrand] = useState("")
  return (
    <div className="sidebar-widget mt-50">
      <h4 className="pro-sidebar-title">Brands</h4>
      <div className="sidebar-widget-list mt-30">
        {brands ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  className={activeBrand === "" ? 'active' : ''}
                  onClick={e => {
                    // getSortParams("brand", "");
                    handleQuery("brand", "");
                    setActiveBrand("")
                    setisPriceQuery(false)
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
                        // getSortParams("brand", brand);
                        handleQuery("brand", brand._id);
                        setActiveBrand(brand._id)
                        setisPriceQuery(false)
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
        )}
      </div>
    </div>
  );
};

ShopBrands.propTypes = {
  brands: PropTypes.array,
  getSortParams: PropTypes.func
};

export default ShopBrands;
