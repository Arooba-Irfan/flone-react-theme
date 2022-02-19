import PropTypes from "prop-types";
import React, { useEffect } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { multilanguage, loadLanguages } from "redux-multilanguage";
import { connect } from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";

// home pages
import HomeFashion from "./pages/home/HomeFashion";
import HomeElectronics from "./pages/home/HomeElectronics";
import HomeFurniture from "./pages/home/HomeFurniture";
import HomePlants from "./pages/home/HomePlants";
import HomeOrganicFood from "./pages/home/HomeOrganicFood";

// shop pages
import ShopGridStandard from "./pages/shop/ShopGridStandard";
import ShopGridFilter from "./pages/shop/ShopGridFilter";
import ShopGridTwoColumn from "./pages/shop/ShopGridTwoColumn";
import ShopGridNoSidebar from "./pages/shop/ShopGridNoSidebar";
import ShopGridFullWidth from "./pages/shop/ShopGridFullWidth";
import ShopGridRightSidebar from "./pages/shop/ShopGridRightSidebar";
import ShopListStandard from "./pages/shop/ShopListStandard";
import ShopListFullWidth from "./pages/shop/ShopListFullWidth";
import ShopListTwoColumn from "./pages/shop/ShopListTwoColumn";

// product pages
import Product from "./pages/shop-product/Product";
import ProductTabLeft from "./pages/shop-product/ProductTabLeft";
import ProductTabRight from "./pages/shop-product/ProductTabRight";
import ProductSticky from "./pages/shop-product/ProductSticky";
import ProductSlider from "./pages/shop-product/ProductSlider";
import ProductFixedImage from "./pages/shop-product/ProductFixedImage";

// blog pages
import BlogStandard from "./pages/blog/BlogStandard";
import BlogNoSidebar from "./pages/blog/BlogNoSidebar";
import BlogRightSidebar from "./pages/blog/BlogRightSidebar";
import BlogDetailsStandard from "./pages/blog/BlogDetailsStandard";

// other pages
import About from "./pages/other/About";
import Contact from "./pages/other/Contact";
import MyAccount from "./pages/other/MyAccount";
import LoginRegister from "./pages/other/LoginRegister";

import Cart from "./pages/other/Cart";
import Wishlist from "./pages/other/Wishlist";
import Compare from "./pages/other/Compare";
import Checkout from "./pages/other/Checkout";

import NotFound from "./pages/other/NotFound";

const App = props => {
  useEffect(() => {
    props.dispatch(
      loadLanguages({
        languages: {
          en: require("./translations/english.json"),
          fn: require("./translations/french.json"),
          de: require("./translations/germany.json")
        }
      })
    );
  });

  return (
    <ToastProvider placement="bottom-left">
      <BreadcrumbsProvider>
        <BrowserRouter>
          <ScrollToTop>
            <Switch>
              <Route
                exact
                path={process.env.PUBLIC_URL + "/"}
                component={HomeFashion}
              />

              {/* Homepages */}
              <Route
                path={process.env.PUBLIC_URL + "/home-fashion"}
                component={HomeFashion}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-electronics"}
                component={HomeElectronics}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-furniture"}
                component={HomeFurniture}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-plants"}
                component={HomePlants}
              />
              <Route
                path={process.env.PUBLIC_URL + "/home-organic-food"}
                component={HomeOrganicFood}
              />

              {/* Shop pages */}
              <Route
                path={process.env.PUBLIC_URL + "/collection"}
                component={ShopGridStandard}
              />
              <Route
                path={process.env.PUBLIC_URL + "/shop-grid-filter"}
                component={ShopGridFilter}
              />
              <Route
                path={process.env.PUBLIC_URL + "/shop-grid-two-column"}
                component={ShopGridTwoColumn}
              />
              <Route
                path={process.env.PUBLIC_URL + "/shop-grid-no-sidebar"}
                component={ShopGridNoSidebar}
              />
              <Route
                path={process.env.PUBLIC_URL + "/shop-grid-full-width"}
                component={ShopGridFullWidth}
              />
              <Route
                path={process.env.PUBLIC_URL + "/shop-grid-right-sidebar"}
                component={ShopGridRightSidebar}
              />
              <Route
                path={process.env.PUBLIC_URL + "/shop-list-standard"}
                component={ShopListStandard}
              />
              <Route
                path={process.env.PUBLIC_URL + "/shop-list-full-width"}
                component={ShopListFullWidth}
              />
              <Route
                path={process.env.PUBLIC_URL + "/shop-list-two-column"}
                component={ShopListTwoColumn}
              />

              {/* Shop product pages */}
              <Route
                path={process.env.PUBLIC_URL + "/product/:id"}
                render={routeProps => (
                  <Product {...routeProps} key={routeProps.match.params.id} />
                )}
              />
              <Route
                path={process.env.PUBLIC_URL + "/product-tab-left/:id"}
                component={ProductTabLeft}
              />
              <Route
                path={process.env.PUBLIC_URL + "/product-tab-right/:id"}
                component={ProductTabRight}
              />
              <Route
                path={process.env.PUBLIC_URL + "/product-sticky/:id"}
                component={ProductSticky}
              />
              <Route
                path={process.env.PUBLIC_URL + "/product-slider/:id"}
                component={ProductSlider}
              />
              <Route
                path={process.env.PUBLIC_URL + "/product-fixed-image/:id"}
                component={ProductFixedImage}
              />

              {/* Blog pages */}
              <Route
                path={process.env.PUBLIC_URL + "/blog-standard"}
                component={BlogStandard}
              />
              <Route
                path={process.env.PUBLIC_URL + "/blog-no-sidebar"}
                component={BlogNoSidebar}
              />
              <Route
                path={process.env.PUBLIC_URL + "/blog-right-sidebar"}
                component={BlogRightSidebar}
              />
              <Route
                path={process.env.PUBLIC_URL + "/blog-details-standard"}
                component={BlogDetailsStandard}
              />

              {/* Other pages */}
              <Route
                path={process.env.PUBLIC_URL + "/about"}
                component={About}
              />
              <Route
                path={process.env.PUBLIC_URL + "/contact"}
                component={Contact}
              />
              <Route
                path={process.env.PUBLIC_URL + "/my-account"}
                component={MyAccount}
              />
              <Route
                path={process.env.PUBLIC_URL + "/login-register"}
                component={LoginRegister}
              />

              <Route path={process.env.PUBLIC_URL + "/cart"} component={Cart} />
              <Route
                path={process.env.PUBLIC_URL + "/wishlist"}
                component={Wishlist}
              />
              <Route
                path={process.env.PUBLIC_URL + "/compare"}
                component={Compare}
              />
              <Route
                path={process.env.PUBLIC_URL + "/checkout"}
                component={Checkout}
              />

              <Route
                path={process.env.PUBLIC_URL + "/not-found"}
                component={NotFound}
              />

              <Route exact component={NotFound} />
            </Switch>
          </ScrollToTop>
        </BrowserRouter>
      </BreadcrumbsProvider>
    </ToastProvider>
  );
};

App.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(multilanguage(App));
