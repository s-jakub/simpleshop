import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slices/cartSlice'
import orderDetailsSlice from './slices/orderDetailsSlice'
import orderPaySlice from './slices/orderPaySlice'
import orderSlice from './slices/orderSlice'
import productCategorySlice from './slices/productCategorySlice'
import productDetailSlice from './slices/productDetailSlice'
import productReviewSlice from './slices/productReviewSlice'
import productSlice from './slices/productSlice'
import userOrdersSlice from './slices/userOrdersSlice'
import userSlice from './slices/userSlice'

const store = configureStore({
    reducer: {
        productList: productSlice,
        productListByCategory: productCategorySlice,
        productDetails: productDetailSlice,
        addProductReview: productReviewSlice,
        cart: cartSlice,
        user: userSlice,
        order: orderSlice,
        orderDetails: orderDetailsSlice,
        orderPay: orderPaySlice,
        userOrders: userOrdersSlice
    }

})

export default store