import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import ShopImg from "./../../assets/images/shop-banner.jpg"

const HeroSliderOneSingle = ({ data, sliderClassName }) => {
  return (
    <div
      className={`single-slider slider-height-1 bg-purple ${
        sliderClassName ? sliderClassName : ""
      }`}
    >
      <div className="container">
        <div className="row mb-40">
          <div className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-6">
            <div className="slider-content slider-animated-1">
              <h3 className="animated">{data.title}</h3>
              <h1 className="animated">{data.subtitle}</h1>
              <div className="slider-btn btn-hover">
                <Link
                  className="animated"
                  to={process.env.PUBLIC_URL + '/collection/collection'}
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-6">
            <div className="slider-single-img slider-animated-1">
              <img
                className="animated img-fluid"
                src={ShopImg}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HeroSliderOneSingle.propTypes = {
  data: PropTypes.object,
  sliderClassName: PropTypes.string
};

export default HeroSliderOneSingle;
