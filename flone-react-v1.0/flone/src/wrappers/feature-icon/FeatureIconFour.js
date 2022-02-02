import PropTypes from "prop-types";
import React from "react";
import featureIconData from "../../data/feature-icons/feature-icon-four.json";
import FeatureIconFourSingle from "../../components/feature-icon/FeatureIconFourSingle.js";

const FeatureIconFour = ({ sapceTopClass, spaceBottomClass }) => {
  return (
    <div
      className={`suppoer-area hm9-section-padding ${
        sapceTopClass ? sapceTopClass : ""
      } ${spaceBottomClass ? spaceBottomClass : ""}`}
    >
      <div className="container-fluid padding-10-row-col">
        <div className="row">
          {featureIconData &&
            featureIconData.map((single, key) => {
              return (
                <FeatureIconFourSingle
                  data={single}
                  spaceBottomClass="mb-10"
                  key={key}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

FeatureIconFour.propTypes = {
  sapceTopClass: PropTypes.string,
  spaceBottomClass: PropTypes.string
};

export default FeatureIconFour;
