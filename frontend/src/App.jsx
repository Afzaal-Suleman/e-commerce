import './App.css';
import * as React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkUser } from './features/auth/authApi';
import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

// Import components and pages
import Protected from './features/auth/component/Protected';
import ProtectedAdmin from './features/auth/component/ProtectedAdmin';
import Signout from './features/auth/component/Signout';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProductDetailPage from './pages/ProductDetailPage';
import PageNotFound from './pages/PageNotFound';
import { OrderPlaced } from './pages/OrderPlaced';
import UserOrderPage from './pages/UserOrderPage';
import UserProfilePage from './pages/UserProfilePage';
import AdminHome from './pages/AdminHome';
import AdminProductDetailsPage from './pages/AdminProductDetailsPage';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminEditProductPage from './pages/AdminEditProductPage';
import AdminOrderPage from './pages/AdminOrderPage';
import Loader from './features/common/Loader';
import ForgotpasswordPage from './pages/ForgotpasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
const options = {
  timeout: 3000,
  position: positions.TOP_LEFT,
  offset: '30px'
};

function Loading() {
  
}

function App() {
  const dispatch = useDispatch();
  const userChecked = useSelector((state) => state.user.userChecked);

  React.useEffect(() => {
      dispatch(checkUser());
  }, [dispatch]);

  if (!userChecked) {
    return <Loader />;
  }

  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <Router>
        <Routes>
          <Route path="/admin" element={<ProtectedAdmin><AdminHome /></ProtectedAdmin>} />
          <Route path="/admin/productdetails/:id" element={<ProtectedAdmin><AdminProductDetailsPage /></ProtectedAdmin>} />
          <Route path="/admin/productform" element={<ProtectedAdmin><AdminProductFormPage /></ProtectedAdmin>} />
          <Route path="/admin/editproduct/:id" element={<ProtectedAdmin><AdminEditProductPage /></ProtectedAdmin>} />
          <Route path="/admin/order" element={<ProtectedAdmin><AdminOrderPage /></ProtectedAdmin>} />
          <Route path="/home" element={<Protected><Home /></Protected>} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotpasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/cart" element={<Protected><CartPage /></Protected>} />
          <Route path="/checkout" element={<Protected><Checkout /></Protected>} />
          <Route path="/productdetails/:id" element={<Protected><ProductDetailPage /></Protected>} />
          <Route path="/order-success/:id" element={<Protected><OrderPlaced /></Protected>} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/getorders" element={<Protected><UserOrderPage /></Protected>} />
          <Route path="/userprofile" element={<Protected><UserProfilePage /></Protected>} />
          <Route path="/signout" element={<Protected><Signout /></Protected>} />
        </Routes>
      </Router>
    </AlertProvider>
  );
}

export default App;
