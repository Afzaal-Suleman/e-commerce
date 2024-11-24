import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductList from '../features/productList/components/ProductList'
import { getCartItems } from '../features/cart/cartApi';
import { useSelector, useDispatch } from 'react-redux';
import { resetCurrentOrder} from '../features/order/orderApi';
import Footer from '../features/common/Footer';
const Home = () => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getCartItems(user.loggedInUser.user._id))
    dispatch(resetCurrentOrder())
  },[dispatch]);
  return (
    <div>
        <Navbar>
            <ProductList />
        </Navbar>
        <Footer/>
    </div>
  )
}

export default Home