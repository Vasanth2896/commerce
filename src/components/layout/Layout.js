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
            <Route path='/layout/products'>
                <Products />
            </Route>
            <Route path='/layout/shopping-cart'>
                <ShoppingCart />
            </Route>
            <Route path='/layout/checkout'>
                <Checkout />
            </Route>

        </div>
    )
}



export default Layout;
