import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { updateQuery } from './../../redux/actions/queryActions'
import { setActiveSort } from "../../helpers/product";

const ShopSize = ({ sizes, getSortParams, handleQuery, setisPriceQuery, updateQuery }) => {

  const [activeSize, setActiveSize] = useState("")
  return (
    <div className="sidebar-widget mt-40">
      <h4 className="pro-sidebar-title">Size </h4>
      <div className="sidebar-widget-list mt-20">
        {sizes ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  className={activeSize === "" ? 'active' : ''}
                  onClick={e => {
                    // getSortParams("size", "");
                    // handleQuery("size", "")
                    updateQuery("size", "")
                    setActiveSize("");
                    setisPriceQuery(false);
                    // setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> All Sizes{" "}
                </button>
              </div>
            </li>
            {sizes.map((size, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      className={`text-uppercase ${activeSize === size ? 'active' : ''}`}
                      onClick={e => {
                        // getSortParams("size", size);
                        // handleQuery("size", size);
                        updateQuery("size", size);
                        setActiveSize(size);
                        setisPriceQuery(false);
                        // setActiveSort(e);
                      }}
                    >
                      {" "}
                      <span className="checkmark" />
                      {size}{" "}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "No sizes found"
        )}
      </div>
    </div>
  );
};

ShopSize.propTypes = {
  getSortParams: PropTypes.func,
  sizes: PropTypes.array
};

const mapDispatchToProps = {
  updateQuery
} 

export default connect(null, mapDispatchToProps)(ShopSize);
