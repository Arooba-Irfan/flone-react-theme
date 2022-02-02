import PropTypes from "prop-types";
import React from "react";
import featureIconData from "../../data/feature-icons/feature-icon-three.json";
import FeatureIconThreeSingle from "../../components/feature-icon/FeatureIconThreeSingle.js";

const FeatureIconThree = ({ bgColorClass, spaceBottomClass }) => {
  return (
    <div
      className={`support-area ${bgColorClass ? bgColorClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="row">
          {featureIconData &&
            featureIconData.map((single, key) => {
              return (
                <FeatureIconThreeSingle
                  data={single}
                  spaceBottomClass="mb-30"
                  key={key}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

FeatureIconThree.propTypes = {
  bgColorClass: PropTypes.string,
  spaceBottomClass: PropTypes.string
};

export default FeatureIconThree;
