import PropTypes from "prop-types";
import React from "react";

const SectionTitle = ({ titleText, positionClass, spaceClass }) => {
  return (
    <div
      className={`section-title ${positionClass ? positionClass : ""} ${
        spaceClass ? spaceClass : ""
      }`}
    >
      <h2>{titleText}</h2>
    </div>
  );
};

SectionTitle.propTypes = {
  positionClass: PropTypes.string,
  spaceClass: PropTypes.string,
  titleText: PropTypes.string
};

export default SectionTitle;
