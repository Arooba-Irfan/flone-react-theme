import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Swiper from "react-id-swiper";
// import categoryData from "../../data/category/category-one.json";
import CategoryOneSingle from "../../components/category/CategoryOneSingle.js";
import SectionTitle from "../../components/section-title/SectionTitle";
import Axios from "axios";

const CategoryOneSlider = ({ 
  spaceTopClass,
  spaceBottomClass,
  bgColorClass,
  data,
  sectionName
}) => {
  // swiper slider settings
  const settings = {
    loop: true,
    spaceBetween: 30,
    breakpoints: {
      992: {
        slidesPerView: 3
      },
      576: {
        slidesPerView: 2
      },
      320: {
        slidesPerView: 1
      }
    }
  };

  
  return (
    <div
    className={`product-area ${spaceTopClass ? spaceTopClass : ""} ${
      spaceBottomClass ? spaceBottomClass : ""
    } ${bgColorClass ? bgColorClass : ""}`}
  >
    <div className="container">
      <SectionTitle 
        titleText={sectionName} 
        positionClass="text-center"
        spaceClass="mb-55"
      />
      <div className="row">
        <Swiper {...settings}>
          {data &&
            data.map((single, key) => {
              return (
                <CategoryOneSingle
                  data={single}
                  key={key}
                  sliderClass="swiper-slide"
                />
              );
            })}
        </Swiper>
      </div>
    </div>
  </div>
  );
};

CategoryOneSlider.propTypes = {
  spaceBottomClass: PropTypes.string
};

export default CategoryOneSlider;









