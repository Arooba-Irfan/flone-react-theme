import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderOne from "../../wrappers/hero-slider/HeroSliderOne";
import axios from "axios";
import CategoryOneSlider from "../../wrappers/category/CategoryOneSlider";

const HomeFashion = () => {

  const [categoryData, setCategoryData] = useState([]);
  const [brandData, setBrandData] = useState([]);

  const fetchData = () => {
    axios.get("https://brand-bucket.herokuapp.com/api/categories").then(res => {
      console.log(res)
      setCategoryData(res.data.data.categories)
    }).catch(err => console.log(err))

    //fetch Brands
    axios.get("https://brand-bucket.herokuapp.com/api/brands").then(res => {
      console.log(res)
      setBrandData([...res.data.data.brands])
    }).catch(err => console.log(err))
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <Fragment>
      <MetaTags>
        <title>Brand Bucket</title>
        <meta
          name="description"
          content="Fashion home of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >
        {/* hero slider */}
        <HeroSliderOne />

        {/* featured icon */}
        {/* <FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-60" /> */}

        {/* tab product */}
        {/* <TabProduct spaceBottomClass="pb-60" spaceTopClass="pt-70" category="fashion" /> */}
        <CategoryOneSlider spaceBottomClass="pb-95" spaceTopClass="pt-70" data={categoryData} sectionName={"categories"} linkCat={"category"}/>

        {/* blog featured */}
        {/* <BlogFeatured spaceBottomClass="pb-55" /> */}
        <CategoryOneSlider spaceBottomClass="pb-95" spaceTopClass="pt-70" data={brandData} sectionName={"brands"} linkCat="brand"/>
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFashion;
