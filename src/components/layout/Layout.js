import React from 'react';
import Navbar from '../navbar/Navbar';
import { Route } from 'react-router-dom';
import Products from '../products/Products';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import Checkout from "../checkout/Checkout";


const Layout = () => {
    return (
        <div>
            <Navbar />
            <Route path='/layout/products' component={Products}>
            </Route>
            <Route path='/layout/shopping-cart' component={ShoppingCart}>
            </Route>
            <Route path='/layout/checkout' component={Checkout}>
            </Route>
        </div>
    )
}



export default Layout;
