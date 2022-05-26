import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import PrivateRoute from "./PrivateRoute";

import CartPage from "./screens/CartPage";
import DeliveryAddress from "./screens/DeliveryAddress";
import HomePage from "./screens/HomePage";
import LoginPage from "./screens/LoginPage";
import OrderPage from "./screens/OrderPage";
import ProductPage from "./screens/ProductPage";
import ProfilePage from "./screens/ProfilePage";
import PaymentMethod from "./screens/PaymentMethod";
import OrderDetailsPage from "./screens/OrderDetailsPage";
import NotFound from "./components/NotFound";

import 'react-toastify/dist/ReactToastify.css';
import CategoryPage from "./screens/CategoryPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/search/:keyword" element={<HomePage />} exact />
        <Route path="/page/:pageNumber" element={<HomePage />} exact />
        <Route path="/search/:keyword/page/:pageNumber" element={<HomePage />} exact />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/category/:mainCategoryName/:subCategoryName" element={<CategoryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart/:id" element={<CartPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order" 
          element={
            <PrivateRoute>
              <OrderPage />
            </PrivateRoute>
          } />
        <Route path="/order-details/:id" 
          element={
            <PrivateRoute>
              <OrderDetailsPage />
            </PrivateRoute>
          } />
        <Route path="/delivery" 
          element={
            <PrivateRoute>
              <DeliveryAddress />
            </PrivateRoute>
          } />
        <Route path="/payment-method" 
          element={
            <PrivateRoute>
              <PaymentMethod />
            </PrivateRoute>
          } />
        <Route path="/profile" 
          element={
            <PrivateRoute >
              <ProfilePage />
            </PrivateRoute>
          } />
                                    
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
