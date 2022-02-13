import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderOne from "../../wrappers/hero-slider/HeroSliderOne";
import FeatureIcon from "../../wrappers/feature-icon/FeatureIcon";
import TabProduct from "../../wrappers/product/TabProduct";
import BlogFeatured from "../../wrappers/blog-featured/BlogFeatured";
import axios from "axios";
import CategoryOneSlider from "../../wrappers/category/CategoryOneSlider";

const HomeFashion = () => {

  const [categoryData, setCategoryData] = useState([]);
  const [brandData, setBrandData] = useState([]);

  const fetchData = () => {
    axios.get("http://localhost:8000/api/categories").then(res => {
      console.log(res)
      setCategoryData(res.data.data.categories)
    }).catch(err => console.log(err))

    //fetch Brands
    axios.get("http://localhost:8000/api/brands").then(res => {
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
        <title>Flone | Fashion Home</title>
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
        <CategoryOneSlider spaceBottomClass="pb-95" spaceTopClass="pt-70" data={categoryData} sectionName={"categories"}/>

        {/* blog featured */}
        {/* <BlogFeatured spaceBottomClass="pb-55" /> */}
        <CategoryOneSlider spaceBottomClass="pb-95" spaceTopClass="pt-70" data={brandData} sectionName={"brands"}/>
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFashion;
