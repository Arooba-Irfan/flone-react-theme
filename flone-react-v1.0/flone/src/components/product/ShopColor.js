import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { updateQuery } from './../../redux/actions/queryActions'
import { setActiveSort } from "../../helpers/product";

const ShopColor = ({ colors, getSortParams, handleQuery, setisPriceQuery, updateQuery, activeColor }) => {

  // const [activeColor, setActiveColor] = useState("")
  return (
    <div className="sidebar-widget mt-50">
      <h4 className="pro-sidebar-title">Color </h4>
      <div className="sidebar-widget-list mt-20">
        {colors ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  className={activeColor === "" ? 'active' : ''}
                  onClick={e => {
                    // getSortParams("color", "");
                    // handleQuery("color", "");
                    updateQuery("color", "");
                    // setActiveColor("");
                    setisPriceQuery(false);
                    // setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> All Colors{" "}
                </button>
              </div>
            </li>
            {colors.map((color, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      className={activeColor === color ? 'active' : ''}
                      onClick={e => {
                        // getSortParams("color", color);
                        // handleQuery("color", color);
                        updateQuery("color", color);
                        // setActiveColor(color);
                        setisPriceQuery(false);
                        // setActiveSort(e);
                      }}
                    >
                      <span className="checkmark" /> {color}{" "}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "No colors found"
        )}
      </div>
    </div>
  );
};

ShopColor.propTypes = {
  colors: PropTypes.array,
  getSortParams: PropTypes.func
};

const mapDispatchToProps = {
  updateQuery
}

const mapStateToProps = state => ({
  activeColor : state?.query?.color
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopColor);
