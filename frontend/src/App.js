import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter , Route } from 'react-router-dom'
import HeaderComp from './components/HeaderComp'
import FooterComp from './components/FooterComp'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'

const App= () => {
  return (
    <BrowserRouter>
      <HeaderComp/>
      <main className="py-3">
          <Container>
            <Route exact path='/' component={HomeScreen} />
            <Route exact path='/search/:keyword' component={HomeScreen} />
            <Route exact path='/page/:pageNumber' component={HomeScreen} />
            <Route exact path='/search/:keyword/page/:pageNumber' component={HomeScreen} />
            <Route path='/product/:id' component={ProductScreen} />
            {/* id is optional in the route below  so put a ?*/}
            <Route path='/cart/:id?' component={CartScreen} />  
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/order/:id' component={OrderScreen} />
            <Route path='/admin/userlist' component={UserListScreen} />
            <Route path='/admin/user/:id/edit' component={UserEditScreen} />
            <Route exact path='/admin/productlist' component={ProductListScreen} />
            <Route exact path='/admin/productlist/:pageNumber' component={ProductListScreen} />
            <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
            <Route path='/admin/orderlist' component={OrderListScreen} />
          </Container>
      </main> 
      <FooterComp/>  
    </BrowserRouter>
  );
}

export default App;



