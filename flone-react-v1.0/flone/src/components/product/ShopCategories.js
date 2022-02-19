import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { setActiveSort } from "../../helpers/product";
import { updateQuery } from './../../redux/actions/queryActions'


const ShopCategories = ({ categories, getSortParams, handleQuery, setisPriceQuery, updateQuery, activeCat }) => {
  // const [activeCat, setactiveCat] = useState("")
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
                    // handleQuery("category", "")
                    updateQuery("category", "")
                    // setactiveCat("");
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
                        // handleQuery("category", category._id);
                        updateQuery("category", category._id)
                        // setactiveCat(category._id);
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

const mapDispatchTOProps = {
  updateQuery
}

const mapStateToProps = state => ({
  activeCat : state?.query?.category
})

export default connect(mapStateToProps, mapDispatchTOProps)(ShopCategories);
