import PropTypes from "prop-types";
import React from "react";
import ProductgridList from "./ProductgridList";

const ShopProducts = ({ products, layout, actionloading }) => {
  return (
    <div className="shop-bottom-area mt-35">
      {actionloading && <div className="overlay"></div>}
      <div className={`row ${layout ? layout : ""}`}>
        <ProductgridList products={products} spaceBottomClass="mb-25" />
      </div>
    </div>
  );
};

ShopProducts.propTypes = {
  layout: PropTypes.string,
  products: PropTypes.array
};

export default ShopProducts;
