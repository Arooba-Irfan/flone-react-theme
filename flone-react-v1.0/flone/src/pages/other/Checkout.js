import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import Axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { removeAllFromCart } from "./../../redux/actions/cartActions";
import { useHistory } from "react-router-dom";
const SERVER_URL = "https://brand-bucket.herokuapp.com";

const Checkout = ({ location, cartItems, currency, removeAllFromCart, userState }) => {
  console.log("cartItems", cartItems);
  const { pathname } = location;
  let cartTotalPrice = 0;
  
  const [user, setUser] = useState({
    userName: "",
    phone: "",
    email: "",
    address: "",
    country: "",
    city: "",
    state: "",
    zipCode: "",
  });

  useEffect(() => {
    setUser({
      userName: userState.userName,
      phone:  userState.phone,
      email:  userState.email,
      address:  userState.email,
      country:  userState.country,
      city:  userState.city,
      state:  userState.state,
      zipCode:  userState.zipCode,
      // userId: userState ? userState.userId: undefined
    })
  }, [userState])
  

  const history = useHistory();
  const [isCard, setIsCard] = useState(false);
  const [paymentMethod, setpaymentMethod] = useState("cod");
  const [actionLoading, setactionLoading] = useState(false);

  const handleDataInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentInput = (e) => {
    // setIsCard(paymentMethod==="card")
    console.log("changeinf payment", e.target.value);
    setpaymentMethod(e.target.value);
    setIsCard(e.target.value === "card");
  };

  const handleSubmit = async () => {
    // console.log("submit ==> ", { ...user, OrderItems: [...cartItems] });
    setactionLoading(true);
    let response;
    try {
      response = await Axios.post(SERVER_URL + "/api/orders", {
        ...user,
        OrderItems: [...cartItems],
        deliveryCharges: 0,
        subTotal: cartTotalPrice.toFixed(2),
        orderDate: Date.now(),
        paymentMethod,
        userId: Object.keys(userState).length > 0 ? userState._id : undefined
      });
      console.log("ORDER RESPONSE", response);
      removeAllFromCart();
      setactionLoading(false);
      alert("Order has been placed successfully");
      history.push("/collection");
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const makePayment = (token) => {
    const body = {
      amount: cartTotalPrice * 100,
      token,
    };
    Axios.post(SERVER_URL + "/api/payments", {
      ...body,
    })
      .then((response) => {
        console.log("response", response);
        handleSubmit();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Fragment>
      <MetaTags>
        <title>BrandBucket | Checkout</title>
        <meta
          name="description"
          content="Checkout page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Checkout
      </BreadcrumbsItem>
      <LayoutOne 
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {actionLoading && <div className="overlay"></div>}
            {cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>Billing Details</h3>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>User Name</label>
                          <input
                            type="text"
                            name="userName"
                            onChange={handleDataInput}
                            placeholder="User Name"
                            value={user.userName}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Phone</label>
                          <input
                            type="text"
                            name="phone"
                            onChange={handleDataInput}
                            placeholder="Phone"
                            value={user.phone}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Email Address</label>
                          <input
                            type="text"
                            name="email"
                            onChange={handleDataInput}
                            placeholder="Email"
                            value={user.email}
                          />
                        </div>
                      </div>
                      {/* <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Last Name</label>
                          <input type="text" />
                        </div>
                      </div> */}
                      {/* <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Company Name</label>
                          <input type="text" />
                        </div>
                      </div> */}
                      <div className="col-lg-12">
                        <div className="billing-select mb-20">
                          <label>Country</label>
                          <select
                            name="country"
                            onChange={handleDataInput}
                            placeholder="Country"
                            value={user.country}
                          >
                            <option value={""}>Select a country</option>
                            <option value={"pak"}>Pakistan</option>
                            <option value={"canada"}>Canada</option>
                            <option value={"uk"}>UK</option>
                            <option value={"usa"}>USA</option>
                            <option value={"uae"}>UAE</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Street Address</label>
                          <input
                            className="billing-address"
                            placeholder="Address"
                            type="text"
                            name="address"
                            onChange={handleDataInput}
                            value={user.address}
                          />
                          {/* <input
                            placeholder="Apartment, suite, unit etc."
                            type="text"
                          /> */}
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Town / City</label>
                          <input
                            type="text"
                            name="city"
                            onChange={handleDataInput}
                            placeholder="City"
                            value={user.city}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>State / Province</label>
                          <input
                            type="text"
                            name="state"
                            onChange={handleDataInput}
                            placeholder="State/Province"
                            value={user.state}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Postcode / ZIP</label>
                          <input
                            type="text"
                            name="zipCode"
                            onChange={handleDataInput}
                            placeholder="ZipCode"
                            value={user.zipCode}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Payment Methods</label>
                          <div className="w-100 d-flex align-items-center">
                            <input
                              className="w-25"
                              type="radio"
                              value="cod"
                              checked={paymentMethod === "cod"}
                              onChange={handlePaymentInput}
                            />
                            <span>Charge ON Delivery</span>
                          </div>
                          <div class="w-100 d-flex align-items-center">
                            <input
                              className="w-25"
                              type="radio"
                              value="card"
                              checked={paymentMethod === "card"}
                              onChange={handlePaymentInput}
                            />
                            <span>CARD</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="your-order-area">
                    <h3>Your order</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Product</li>
                            <li>Total</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
                            {cartItems.map((cartItem, key) => {
                              const discountedPrice = getDiscountPrice(
                                cartItem.price,
                                cartItem.discount
                              );
                              const finalProductPrice = (
                                cartItem.price * currency.currencyRate
                              ).toFixed(2);
                              const finalDiscountedPrice = (
                                discountedPrice * currency.currencyRate
                              ).toFixed(2);

                              discountedPrice != null
                                ? (cartTotalPrice +=
                                    finalDiscountedPrice * cartItem.quantity)
                                : (cartTotalPrice +=
                                    finalProductPrice * cartItem.quantity);
                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {cartItem.productName} X {cartItem.quantity}
                                  </span>{" "}
                                  <span className="order-price">
                                    {discountedPrice !== null
                                      ? currency.currencySymbol +
                                        (
                                          finalDiscountedPrice *
                                          cartItem.quantity
                                        ).toFixed(2)
                                      : currency.currencySymbol +
                                        (
                                          finalProductPrice * cartItem.quantity
                                        ).toFixed(2)}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">Shipping</li>
                            <li>Free shipping</li>
                          </ul>
                        </div>
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Total</li>
                            <li>
                              {currency.currencySymbol +
                                cartTotalPrice.toFixed(2)}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                    <div className="place-order mt-25">
                      {isCard ? (
                        <StripeCheckout
                          stripeKey="pk_test_51KUJs3J2BxS3GLbaKEGxVhPx7NaK6kWs3vuBn75BCeq7Z9jSzAzwf0nf6yNQslbuYIjCVjEj2eGtLctiKNQMRJeO00MWNgQJXM"
                          token={makePayment}
                          amount={cartTotalPrice}
                          name="payment"
                        >
                          <div className="place-order mt-25">
                            <button className="btn-hover"> Place Order</button>
                          </div>
                        </StripeCheckout>
                      ) : (
                        <button className="btn-hover" onClick={handleSubmit}>
                          Place Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/collection"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Checkout.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
    userState: state.auth.user
  };
};

const mapDispatchToProps = {
  removeAllFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
