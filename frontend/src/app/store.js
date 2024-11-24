import { configureStore } from "@reduxjs/toolkit";
import products from "../features/productList/productSlice";
import user from "../features/auth/authSlice";
import cart from "../features/cart/cartSlice";
import order from "../features/order/orderSlice"
import userInfo from "../features/user/userInfoSlice"
export const store = configureStore({
    reducer: {
        products: products,
        user: user,
        cart: cart,
        order: order,
        userInfo: userInfo
      },
});

export default store;