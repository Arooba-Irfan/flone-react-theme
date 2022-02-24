import PropTypes from "prop-types";
import React, { Fragment,useEffect,useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import axios from 'axios';

const Product = ({
  location,
  // product,
  match: {
    params: { id },
  }
}) => {
  console.log("product", id);
  const { pathname } = location;
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get("https://brand-bucket.herokuapp.com/api/product/" + id).then((response) => {
      console.log("response", response.data.data.product);
      setProduct(response.data.data.product);
    });
  }, []);
  return (
    <Fragment>
      <MetaTags>
        <title>BrandBucket | Product Page</title>
        <meta
          name="description"
          content="Product page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Shop Product
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        {/* product description with image */}
        <ProductImageDescription
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          product={product}
        />

        {/* product description tab */}
        <ProductDescriptionTab
          spaceBottomClass="pb-90"
          productFullDesc={
            "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur."
          }
        />

        {/* related product slider */}
        {/* <RelatedProductSlider
          spaceBottomClass="pb-95"
          category={product.category[0]}
        /> */}
      </LayoutOne>
    </Fragment>
  );
};

Product.propTypes = {
  location: PropTypes.object,
  // product: PropTypes.object
};

// const mapStateToProps = (state, ownProps) => {
//   const productId = ownProps.match.params.id;
//   return {
//     product: state.productData.products.filter(
//       single => single.id === productId
//     )[0]
//   };
// };

export default (Product);
