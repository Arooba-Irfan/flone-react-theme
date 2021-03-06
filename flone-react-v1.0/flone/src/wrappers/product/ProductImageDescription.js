import PropTypes from "prop-types";
import React,{useState,useEffect} from "react";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../helpers/product";
import ProductImageGallery from "../../components/product/ProductImageGallery";
import ProductDescriptionInfo from "../../components/product/ProductDescriptionInfo";
import ProductImageGallerySideThumb from "../../components/product/ProductImageGallerySideThumb";
import ProductImageFixed from "../../components/product/ProductImageFixed";

const ProductImageDescription = ({
  spaceTopClass,
  spaceBottomClass,
  galleryType,
  product,
  currency,
  cartItems,
  wishlistItems,
  compareItems
}) => {
  console.log("galleryType", galleryType);
  // const wishlistItem = wishlistItems.filter(
  //   wishlistItem => wishlistItem.id === product.id
  // )[0];
  // const compareItem = compareItems.filter(
  //   compareItem => compareItem.id === product.id
  // )[0]
  console.log("product ----",product)
  const { addToast } = useToasts();
  const [image, setImage] = useState('');

  // const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = +(product.price * currency.currencyRate).toFixed(2);
  console.log("finalProductPrice", finalProductPrice);
  // const finalDiscountedPrice = +(
  //   discountedPrice * currency.currencyRate
  // ).toFixed(2);

  useEffect(() => {
    setImage(product.image);
   console.log("product.image",image)
  }, [product])
  
  return (
    <div
      className={`shop-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="row">
          <div className ="col-lg-6 col-md-6">
            {/* product image gallery */}
            <img width="100%" height="100%" src={image} alt="product" />
            {/* {galleryType === "leftThumb" ? (
              <ProductImageGallerySideThumb
                product={product}
                thumbPosition="left"
              />
            ) : galleryType === "rightThumb" ? (
              <ProductImageGallerySideThumb product={product} />
            ) : galleryType === "fixedImage" ? (
              <ProductImageFixed product={product} />
            ) : (
              <ProductImageGallery product={product} />
            )} */}
          </div>
          <div className="col-lg-6 col-md-6">
            {/* product description info */}
            <ProductDescriptionInfo
              setImage={setImage}
              product={product}
              // discountedPrice={discountedPrice}
              currency={currency}
              // finalDiscountedPrice={finalDiscountedPrice}
              finalProductPrice={finalProductPrice}
              cartItems={cartItems}
              // wishlistItem={wishlistItem}
              // compareItem={compareItem}
              addToast={addToast}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductImageDescription.propTypes = {
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  galleryType: PropTypes.string,
  product: PropTypes.object,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  wishlistItems: PropTypes.array
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData,
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    compareItems: state.compareData
  };
};

export default connect(mapStateToProps)(ProductImageDescription);
