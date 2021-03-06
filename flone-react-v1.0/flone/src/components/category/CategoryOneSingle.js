import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateQuery } from './../../redux/actions/queryActions'

const CategoryOneSingle = ({ data, sliderClass, updateQuery, linkCat }) => {
  console.log("class", sliderClass)
  return (
    <div 
      className={`collection-product-2 home-slide-card ${sliderClass ? sliderClass : ""}`}
      onClick = {() => updateQuery(linkCat, data._id)}
    >
      <Link to={process.env.PUBLIC_URL + "/collection"}>
        <img src={data.image} alt=""/>
      </Link>
      {/* <div className="collection-content-2 text-center">
        <span>4 Products</span>
        <h4>
          <Link to={process.env.PUBLIC_URL + data.link}>{data.name}</Link>
        </h4>
      </div> */}
    </div>
  );
};

CategoryOneSingle.propTypes = {
  data: PropTypes.object,
  sliderClass: PropTypes.string
};

const mapDispatchTOProps = {
  updateQuery
}

export default connect(null, mapDispatchTOProps)(CategoryOneSingle);
