import PropTypes from "prop-types";
import React from "react";

const FeatureIconThreeSingle = ({ data, spaceBottomClass }) => {
  return (
    <div className="col-lg-4 col-md-4 col-sm-6">
      <div
        className={`support-wrap-2 support-padding-2 support-shape-2 text-center ${
          spaceBottomClass ? spaceBottomClass : ""
        }`}
      >
        <div className="support-content-2">
          <img
            className="animated"
            src={process.env.PUBLIC_URL + data.image}
            alt=""
          />
          <h5>{data.title}</h5>
          <p>{data.subtitle}</p>
        </div>
      </div>
    </div>
  );
};

FeatureIconThreeSingle.propTypes = {
  data: PropTypes.object,
  spaceBottomClass: PropTypes.string
};

export default FeatureIconThreeSingle;
