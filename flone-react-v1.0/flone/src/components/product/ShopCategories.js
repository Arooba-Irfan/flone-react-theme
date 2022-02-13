import PropTypes from "prop-types";
import React, { useState } from "react";
import { setActiveSort } from "../../helpers/product";

const ShopCategories = ({ categories, getSortParams, handleQuery, setisPriceQuery }) => {
  const [activeCat, setactiveCat] = useState("")
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Categories </h4>
      <div className="sidebar-widget-list mt-30">
        {categories ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  className={activeCat === "" ? 'active' : ''}
                  onClick={e => {
                    // getSortParams("category", "");
                    handleQuery("category", "")
                    setactiveCat("");
                    setisPriceQuery(false);
                    // setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> All Categories
                </button>
              </div>
            </li>
            {categories.map((category, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      className={activeCat === category._id ? 'active' : ''}
                      onClick={e => {
                        // getSortParams("category", category);
                        handleQuery("category", category._id);
                        setactiveCat(category._id);
                        setisPriceQuery(false);
                        // setActiveSort(e);
                      }}
                    >
                      {" "}
                      <span className="checkmark" /> {category.name}{" "}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "No categories found"
        )}
      </div>
    </div>
  );
};

ShopCategories.propTypes = {
  categories: PropTypes.array,
  getSortParams: PropTypes.func
};

export default ShopCategories;
